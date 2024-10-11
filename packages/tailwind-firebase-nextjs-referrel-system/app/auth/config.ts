import NextAuth, { NextAuthConfig } from 'next-auth';
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { firestore } from '@/app/lib/firebase';
import { sendVerificationRequest } from '@/app/auth/email-config';

// how long the email link will be valid for, in seconds
// will set for two days, default is one day
export const EmailExpirationAge = 2 * 24 * 60 * 60;

// http guide: https://authjs.dev/guides/providers/email-http
// smtp guide: https://next-auth.js.org/providers/email
// How to access: https://authjs.dev/guides/upgrade-to-v5?authentication-method=server-component#authentication-methods
export const AuthOptions = {
  adapter: FirestoreAdapter(firestore),
  secret: process.env.AUTH_SECRET,
  // https://authjs.dev/getting-started/providers/email-tutorial
  providers: [
    {
      id: 'email',
      name: 'Email',
      type: 'email',
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM || "",
      maxAge: EmailExpirationAge,
      sendVerificationRequest: sendVerificationRequest,
      options: {},
    },
  ],
  pages: {
    signIn: '/auth/sign-in',
  },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth(AuthOptions);
