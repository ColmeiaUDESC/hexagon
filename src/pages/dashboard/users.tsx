import {
  Avatar,
  Badge,
  Box,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
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
import { MagnifyingGlass, Pencil, Trash } from 'phosphor-react';
import { ReactElement } from 'react';
import SEO from '../../components/SEO';
import DashboardLayout from '../../layouts/DashboardLayout';
import { NextPageWithLayout } from '../_app';

const UsersPage: NextPageWithLayout = () => (
  <>
    <SEO title="Usuários" />
    <Box bg="white" borderRadius={5} p={4} display="flex" flexDirection="column" gap={8}>
      <InputGroup w={96}>
        <InputLeftElement pointerEvents="none">
          <Text color="gray.300">
            <MagnifyingGlass size={20} weight="bold" />
          </Text>
        </InputLeftElement>
        <Input type="text" placeholder="Pesquisar..." />
      </InputGroup>

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
            <Tr>
              <Td>
                <Flex alignItems="center" gap={4}>
                  <Avatar name="Dan Abrahmov" src="https://github.com/joaodematte.png" size="md" />
                  <Stack spacing={0}>
                    <Text fontWeight="bold">João Dematte</Text>
                    <Text fontSize="sm">demattejoao@gmail.com</Text>
                  </Stack>
                </Flex>
              </Td>
              <Td>
                <Badge colorScheme="blue">Voluntário</Badge>
              </Td>
              <Td>24/04/2002 - 15:23</Td>
              <Td>
                <HStack>
                  <IconButton
                    size="sm"
                    aria-label="Edit user"
                    colorScheme="gray"
                    icon={<Pencil size={18} weight="bold" />}
                  />
                  <IconButton
                    size="sm"
                    aria-label="Delete user"
                    colorScheme="red"
                    icon={<Trash size={18} weight="bold" />}
                  />
                </HStack>
              </Td>
            </Tr>

            <Tr>
              <Td>
                <Flex alignItems="center" gap={4}>
                  <Avatar name="Dan Abrahmov" src="https://github.com/gabrielfjunkes.png" size="md" />
                  <Stack spacing={0}>
                    <Text fontWeight="bold">Gabriel Junkes</Text>
                    <Text fontSize="sm">gabrielfjunkes@gmail.com</Text>
                  </Stack>
                </Flex>
              </Td>
              <Td>
                <Badge>Bolsista</Badge>
              </Td>
              <Td>24/04/2002 - 15:23</Td>
              <Td>
                <HStack>
                  <IconButton
                    size="sm"
                    aria-label="Edit user"
                    colorScheme="gray"
                    icon={<Pencil size={18} weight="bold" />}
                  />
                  <IconButton
                    size="sm"
                    aria-label="Delete user"
                    colorScheme="red"
                    icon={<Trash size={18} weight="bold" />}
                  />
                </HStack>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  </>
);

UsersPage.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default UsersPage;
