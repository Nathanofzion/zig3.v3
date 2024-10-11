import { auth } from '@/app/auth/config';
import { getUserWithEmail } from '@/app/lib/users';
import Navbar from '@/app/components/navbar';

export default async function Nav() {
  const session = await auth();
  // fetch the user with the email
  const user = await getUserWithEmail(session?.user?.email, true);
  return <Navbar user={user} />;
}
