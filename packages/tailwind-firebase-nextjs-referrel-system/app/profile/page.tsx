import SignOutButton from "@/app/components/signout-button";
import SubmitButton from "@/app/components/submit-form-button";
import { auth } from "@/app/auth/config";
import { getInvitedUsers, getUserWithEmail, updateInvitedUser, updateUser } from "@/app/lib/users";
import { Text, TextInput } from "@tremor/react";
import { redirect } from "next/navigation";
import { z } from "zod";
import InviteUsers from "@/app/profile/invite";
import { InvitedUser } from "@/types/user";

/**
 * Define the form schema for zod form validation
 */
const FormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

/**
 * Main profile page
 *
 * @export
 * @return {*} 
 */
export default async function Profile({ searchParams }: { searchParams: { callbackUrl?: string, senderEmail?: string }}) {
    // fetch the session and user
    const session = await auth();
    const user = await getUserWithEmail(session?.user?.email, true);

    // set the invited user object if the user was invited
    if (searchParams.senderEmail && user?.email) await updateInvitedUser(searchParams.senderEmail, user.email, "accepted");

    // fetch the invited users
    const invitedUsers: Partial<InvitedUser>[] = session?.user?.email ? await getInvitedUsers(session?.user?.email) : [];
    
  	/**
     * Define the submitting form action
     *
     * @param {FormData} data
     */
    const submitFormAction = async (formData: FormData) => {
      "use server";
      const parsedData = FormSchema.parse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
      });
      
      try {
        // update the data with the server action
        if (user?.email) {
          await updateUser({ email: user?.email, ...parsedData });
        }
      } catch (e: any) {
        console.warn("error with form action", e);
        throw Error(e);
      }
      // redirect to home page
      redirect(searchParams.callbackUrl || "/");
    };

    return (
      <div className="flex-grow mx-auto w-full max-w-lg p-6">
          <div className="mx-auto w-full max-w-lg p-6">
          <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Enter your first and last name
          </h2>
         <form action={submitFormAction}>
            <Text className="mt-4 ml-1">First Name</Text>
             <TextInput
                name="firstName"
                id="firstName"
                required
                placeholder={user?.firstName || "First Name"}
                defaultValue={user?.firstName}
            />
            <Text className="mt-2 ml-1">Last Name</Text>
            <TextInput
                name="lastName"
                id="lastName"
                required
                placeholder={user?.lastName || "Last Name"}
                defaultValue={user?.lastName}
            />
            <SubmitButton className="w-full mt-6" loadingText={searchParams.callbackUrl ? "Continuing..." : "Updating..."}>
              {searchParams.callbackUrl ? "Continue" : "Update User"}
            </SubmitButton>
            {!searchParams.callbackUrl ? <SignOutButton className="w-full mt-4" type="button" variant="secondary" email={user?.email} /> : null}
            
      </form>
      {!searchParams.callbackUrl ? <InviteUsers user={user} invitedUsers={invitedUsers} /> : null}
      </div>
    </div>
    )
  }