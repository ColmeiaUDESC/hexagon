import { ReactElement } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { NextPageWithLayout } from '../_app';

const ProjectsPage: NextPageWithLayout = () => <h1>oi</h1>;

ProjectsPage.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default ProjectsPage;
