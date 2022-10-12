import { Box, Flex } from '@chakra-ui/react';
import { NextPage } from 'next';
import MobileSidebar from '../components/dashboard/MobileSidebar';
import Sidebar from '../components/dashboard/Sidebar';

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: NextPage<Props> = ({ children }) => (
  <Flex flexDir={{ base: 'column', md: 'row' }} w="full" h="100vh" bg="gray.100">
    <Sidebar />
    <MobileSidebar />
    <Box p={{ base: 4, md: 8 }} w="full">
      {children}
    </Box>
  </Flex>
);

export default DashboardLayout;
