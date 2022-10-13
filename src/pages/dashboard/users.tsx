import { Box, Input, InputGroup, InputLeftElement, Skeleton, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';
import { MagnifyingGlass } from 'phosphor-react';
import { ReactElement, useMemo, useState } from 'react';
import { getServerAuthSession } from '../../server/common/get-server-auth-session';
import { trpc } from '../../utils/trpc';
import { NextPageWithLayout } from '../_app';
import ConfirmAction from '../../components/dashboard/ConfirmAction';
import UsersTable from '../../components/dashboard/tables/UsersTable';
import SEO from '../../components/SEO';
import DashboardLayout from '../../layouts/DashboardLayout';

const UsersPage: NextPageWithLayout = () => {
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');

  const session = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const getAllUsers = trpc.user.getAll.useQuery();
  const deleteUser = trpc.user.delete.useMutation();

  const filteredUsers = useMemo(
    () =>
      getAllUsers.data?.users.filter(
        (user) =>
          user.fullName.toLowerCase().includes(searchInput.toLowerCase()) ||
          user.email.toLowerCase().includes(searchInput.toLowerCase())
      ),
    [searchInput]
  );

  const onCloseModal = async (confirmed: boolean) => {
    if (confirmed) {
      const res = await deleteUser.mutateAsync({ id: selectedUserId });

      if (res.status === 200) {
        toast({
          title: 'Usuário excluído com sucesso!',
          status: 'success',
          duration: 3500,
          position: 'top-right'
        });

        getAllUsers.refetch();
      } else {
        toast({
          title: 'Erro ao tentar excluir o usuário!',
          description: 'Verifique e tente novamente.',
          status: 'error',
          duration: 3500,
          position: 'top-right'
        });
      }
    }

    onClose();
  };

  return (
    <>
      <SEO title="Usuários" />
      <Box bg="white" borderRadius={5} p={4} display="flex" flexDirection="column" gap={8}>
        <InputGroup w="full" maxW={96}>
          <InputLeftElement pointerEvents="none">
            <Text color="gray.300">
              <MagnifyingGlass size={20} weight="bold" />
            </Text>
          </InputLeftElement>
          <Input type="text" placeholder="Pesquisar..." onChange={(event) => setSearchInput(event.target.value)} />
        </InputGroup>

        <Skeleton isLoaded={!getAllUsers.isLoading || session.status === 'loading'}>
          <UsersTable
            data={searchInput === '' ? getAllUsers.data?.users : filteredUsers}
            onOpen={onOpen}
            setSelectedUserId={setSelectedUserId}
          />
        </Skeleton>
      </Box>

      <ConfirmAction
        title="Excluir usuário"
        message="Você tem certeza? Essa ação não poderá ser desfeita."
        isOpen={isOpen}
        onClose={onCloseModal}
        isLoading={deleteUser.isLoading}
      />
    </>
  );
};

UsersPage.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};

export default UsersPage;
