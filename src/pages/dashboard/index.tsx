import { Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { ReactElement } from 'react';
import SEO from '../../components/SEO';
import DashboardLayout from '../../layouts/DashboardLayout';
import { NextPageWithLayout } from '../_app';

const DashboardPage: NextPageWithLayout = () => {
  const user = useSession();

  return (
    <>
      <SEO title="Dashboard" />
      <Text>{user.data?.user?.fullName}</Text>
    </>
  );
};

DashboardPage.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default DashboardPage;
