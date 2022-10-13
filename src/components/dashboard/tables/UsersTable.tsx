import {
  Avatar,
  Badge,
  Flex,
  HStack,
  IconButton,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { Pencil, Trash } from 'phosphor-react';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  data:
    | Array<{
        fullName: string;
        email: string;
        id: string;
        role: 'ADMIN' | 'USER';
        image: string | null;
        emailVerified: Date | null;
      }>
    | undefined;
  setSelectedUserId: Dispatch<SetStateAction<string>>;
  onOpenDelete: () => void;
  onOpenEdit: () => void;
}

const UsersTable = ({ data, setSelectedUserId, onOpenDelete, onOpenEdit }: Props) => {
  const session = useSession();

  return (
    <TableContainer>
      <Table variant="unstyled" size="sm">
        <TableCaption>Usuários registrados no sistema</TableCaption>
        <Thead>
          <Tr>
            <Th>Identificação</Th>
            <Th>Tipo</Th>
            <Th>Registrado em</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((user) => (
              <Tr key={user.id}>
                <Td>
                  <Flex alignItems="center" gap={4}>
                    <Avatar bg="yellow.500" name={user.fullName} src={user.image as string} size="md" />
                    <Stack spacing={0}>
                      <Text fontWeight="bold">{user.fullName}</Text>
                      <Text fontSize="sm">{user.email}</Text>
                    </Stack>
                  </Flex>
                </Td>
                <Td>
                  <Badge colorScheme={user.role === 'ADMIN' ? 'yellow' : 'blue'}>
                    {user.role === 'ADMIN' ? 'Bolsista' : 'Voluntário'}
                  </Badge>
                </Td>
                <Td>24/04/2002 - 15:23</Td>
                <Td>
                  <HStack>
                    <IconButton
                      size="sm"
                      aria-label="Edit user"
                      colorScheme="gray"
                      disabled={session.data?.user?.role !== 'ADMIN' || session.data?.user?.id === user.id}
                      icon={<Pencil size={18} weight="bold" />}
                      onClick={() => {
                        setSelectedUserId(user.id);
                        onOpenEdit();
                      }}
                    />
                    <IconButton
                      size="sm"
                      aria-label="Delete user"
                      colorScheme="red"
                      icon={<Trash size={18} weight="bold" />}
                      onClick={() => {
                        setSelectedUserId(user.id);
                        onOpenDelete();
                      }}
                      disabled={session.data?.user?.role !== 'ADMIN' || session.data?.user?.id === user.id}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
