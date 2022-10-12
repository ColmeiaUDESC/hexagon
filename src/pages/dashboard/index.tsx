import { Text } from '@chakra-ui/react';
import { ReactElement } from 'react';
import SEO from '../../components/SEO';
import DashboardLayout from '../../layouts/DashboardLayout';
import { NextPageWithLayout } from '../_app';

const DashboardPage: NextPageWithLayout = () => (
  <>
    <SEO title="Dashboard" />
    <Text>index</Text>
  </>
);

DashboardPage.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default DashboardPage;
