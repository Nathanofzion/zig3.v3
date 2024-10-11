import { Card, Title, Text } from '@tremor/react';
import Search from '@/app/search';
import UsersTable from '@/app/table';
import { searchUsers } from '@/app/lib/users';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  const users = await searchUsers(search);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>A list of users retrieved from Firestore.</Text>
      <Search />
      <Card className="mt-6">
        <UsersTable users={users} />
      </Card>
    </main>
  );
}
