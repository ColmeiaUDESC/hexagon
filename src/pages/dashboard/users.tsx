import { Text } from '@chakra-ui/react';
import { ReactElement } from 'react';
import SEO from '../../components/SEO';
import DashboardLayout from '../../layouts/DashboardLayout';
import { NextPageWithLayout } from '../_app';

const UsersPage: NextPageWithLayout = () => (
  <>
    <SEO title="Usuários" />
    <Text>usuários</Text>
  </>
);

UsersPage.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default UsersPage;
