'use client';

import { User } from "@/types/user";
import { CheckCircleIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { Button, Text, TextInput } from "@tremor/react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

// set schema
const LoginEmail = z.string().email("Please enter a valid email address.");

/**
 * Sign in page using the next auth framework
 * https://authjs.dev/guides/basics/pages?frameworks=core#email-sign-in
 * Can also make use of a redirect: https://next-auth.js.org/getting-started/client#using-the-redirect-false-option
 *
 * @export
 * @return {*} 
 */
export default function SignIn() {
  // define states
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // function that will create the callback url to the profile screen with the query parameters
  const createProfileCallbackUrl = (callbackUrl?: string | null) => {
    const params = new URLSearchParams();
    if (callbackUrl) {
      params.set('callbackUrl', callbackUrl);
    } else {
      params.delete('callbackUrl');
    };

    return `${window.location.origin}/profile?${params.toString()}`
  };

  // set callback URL
  // https://next-auth.js.org/getting-started/client#specifying-a-callbackurl
  const callbackUrl = useSearchParams().get("callbackUrl") || undefined;

  // handle sign in function
  const handleSignIn = async () => {
    setLoading(true);
    // parse the data
    try {
      console.log("doing the parse for the email");
      const parsedResponse = LoginEmail.safeParse(email);
      console.log("completed parse");

      // throw form validation error with unsuccessful parse
      if (!parsedResponse.success) setError("Please enter a valid email address.");
      else { 
        const parsedEmail = parsedResponse.data;
        // check if user is in database
        const emailParams = new URLSearchParams();
        emailParams.set('email', parsedResponse.data);
        console.log("fetching the user from the api");
        const userResponse = await fetch(`/api/get-user?${emailParams.toString()}`);
        console.log("fetched user");
        const userData: Partial<User | null> = await userResponse.json();

        // if it is a new user, set the referring url in the parameters for the profile screen
        if (!userData) {
          const newCallbackUrl = createProfileCallbackUrl(callbackUrl);
          await signIn('email', { email: parsedEmail, callbackUrl: newCallbackUrl, redirect: false });
          setSuccess(true);
        } else {
          // return the normal callback url if user already has an account
          console.log("signing in user");
          const test = await signIn('email', { email: parsedEmail, callbackUrl, redirect: false });
          console.log("completed signing in user", test);
          setSuccess(true);
        }
      }
    } catch (e: any) {
      console.error(e);
      if (typeof e === "string") setError(e);
      setLoading(false);
    };
    setLoading(false);
  };

  return (
    <div className="flex-grow mx-auto w-full max-w-lg p-6">
      <div className="mx-auto w-full max-w-lg p-6">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Enter your email to sign in
        </h2>
        <TextInput type="email" disabled={success || loading} onSelect={() => setError("")} onValueChange={(val) => setEmail(val)} className="mt-4" placeholder="Enter your email" />
        <Button icon={!success ? SparklesIcon : CheckCircleIcon} disabled={success || loading} aria-disabled={loading || success} loading={loading} onClick={handleSignIn} className="mt-4 w-full">
          {!success ? "Send magic sign-in link" : "Magic sign-in link sent!"}
        </Button>
        <Text className="mt-2 text-center" color="red">{error}</Text>
        {success ? <Text className="mt-4 w-full text-center">Open your email and click on the magic link to sign in.</Text> : null}
      </div>
    </div>
  );
}
