// For more information on the schema defined here, view the following link
// https://authjs.dev/getting-started/adapters#models

import { Timestamp } from "firebase-admin/firestore";
import { User as AuthUser } from "next-auth";

// base user object
export interface User extends AuthUser {
    emailVerified: Timestamp;
    firstName: string;
    lastName: string;
};

// users that are invited to the platform
export interface InvitedUser {
    email: string;
    status: "pending" | "accepted" | "expired";
}