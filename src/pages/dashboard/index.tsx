import { Text } from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';
import { ReactElement } from 'react';
import SEO from '../../components/SEO';
import DashboardLayout from '../../layouts/DashboardLayout';
import { getServerAuthSession } from '../../server/common/get-server-auth-session';
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

export default DashboardPage;
