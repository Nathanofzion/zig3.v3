import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';
import { User } from '@/types/user';

export default function UsersTable({ users }: { users: Partial<User>[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell key="name">Name</TableHeaderCell>
          <TableHeaderCell key="email">Email</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
            <TableCell>
              <Text>{user.email}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
