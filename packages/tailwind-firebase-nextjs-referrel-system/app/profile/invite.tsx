'use client';

import { inviteUser } from "@/app/auth/invite";
import { InvitedUser, User } from "@/types/user";
import { CheckCircleIcon, ClockIcon, PaperAirplaneIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Badge, Button, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, TextInput, Title } from "@tremor/react";
import { useSearchParams } from "next/navigation";
import { DetailedHTMLProps, HTMLAttributes, ReactElement, useState } from "react";
import { z } from "zod";

// set schema
const InvitedEmail = z.string().email("Please enter a valid email address.");

// set defined states and the components
const StatusBadges: Record<InvitedUser["status"], ReactElement> = {
  "accepted": <Badge color="emerald" icon={CheckCircleIcon}>Accepted</Badge>,
  "expired": <Badge color="red" icon={XCircleIcon}>Expired</Badge>,
  "pending": <Badge color="amber" icon={ClockIcon}>Pending</Badge>,
}

/**
 * Basic invite page screen for new invites
 * https://authjs.dev/guides/basics/pages?frameworks=core#email-sign-in
 * Can also make use of a redirect: https://next-auth.js.org/getting-started/client#using-the-redirect-false-option
 *
 * @export
 * @return {*} 
 */
export default function InviteUsers({ user, invitedUsers, ...divParams }: { user?: Partial<User>, invitedUsers?: Partial<InvitedUser>[] } & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  // define states
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // define the invited users
  const [allInvitedUsers, setInvitedUsers] = useState(invitedUsers || []);

  // set callback URL
  // https://next-auth.js.org/getting-started/client#specifying-a-callbackurl
  const callbackUrl = useSearchParams().get("callbackUrl") || "/";

  // handle sign in function
  const handleInvite = async () => {
    setLoading(true);
    // parse the data
    try {
      const parsedResponse = InvitedEmail.safeParse(email);

      // check the parsed data
      if (!parsedResponse.success) setError("Please enter a valid email address.");
      else {
        const parsedEmail = parsedResponse.data;

        // invite the user
        const emailSent = await inviteUser(parsedEmail, window.location.origin, { 
          callbackUrl, 
          emailSubject: `${user?.firstName} ${user?.lastName} has invited you to join Neo`,
          emailMessage: `To accept ${user?.firstName}'s invite, click on the link below.`,
          buttonText: `Accept ${user?.firstName}'s invite`,
          senderName: `${user?.firstName} at Neo Tech`,
          senderEmail: user?.email || undefined,
        }, false);
  
        // check if email sent or not
        if (emailSent) {
          // add the user to the front of the array
          const newInvitedUsers: Partial<InvitedUser>[] = [{ email: parsedEmail, status: "pending" }, ...allInvitedUsers];
          setInvitedUsers(newInvitedUsers);
          setSuccess(true);
        } else {
          setError("User already exists.");
        }
      }
    } catch (e: any) {
      console.warn(e);
      setError(e);
      setLoading(false);
    };
    setLoading(false);
  };

  return (
    <div className="mt-10" {...divParams}>
        <Title className="mb-1 ml-1">Invite New Users</Title>
        <TextInput type="email" onSelect={() => setError("")} onValueChange={(val) => setEmail(val)} placeholder="Enter Email" />
        <Button onClick={handleInvite} icon={PaperAirplaneIcon} aria-disabled={loading} loading={loading} className="mt-4 w-full">
          Invite User
        </Button>
        <Text className="mt-2 text-center" color="red">{error}</Text>
        <Table className="mt-4">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Invited Email</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allInvitedUsers.map((invitedUser) => (
              <TableRow key={null}>
                <TableCell>{invitedUser.email}</TableCell>
                <TableCell>
                  {invitedUser.status ? StatusBadges[invitedUser.status] : "Unknown"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  );
}
