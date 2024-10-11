/**
 * Extra options returned for the invite options
 * Will be inputted into the next auth sign in function, and to personalize email invites
 *
 * @export
 * @interface InviteOptions
 */
export interface ExtraEmailOptions {
    email?: string;
    callbackUrl?: string;
    emailType?: 'invite';
    emailMessage?: string;
    buttonText?: string;
    senderName?: string;
    senderEmail?: string;
    emailSubject?: string;
};