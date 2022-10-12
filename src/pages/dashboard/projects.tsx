import { GetServerSidePropsContext } from 'next';
import { ReactElement } from 'react';
import SEO from '../../components/SEO';
import DashboardLayout from '../../layouts/DashboardLayout';
import { getServerAuthSession } from '../../server/common/get-server-auth-session';
import { NextPageWithLayout } from '../_app';

const ProjectsPage: NextPageWithLayout = () => (
  <>
    <SEO title="Projetos" />
    <h1>oi</h1>
  </>
);

ProjectsPage.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

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

export default ProjectsPage;
