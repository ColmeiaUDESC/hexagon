import { Stack } from '@chakra-ui/react';
import SidebarContent from './SidebarContent';

const Sidebar = () => (
  <Stack
    display={{ base: 'none', md: 'flex' }}
    w="full"
    bg="white"
    h="full"
    maxW="xs"
    p={8}
    justifyContent="space-between"
    flexShrink={0}
  >
    <SidebarContent />
  </Stack>
);

export default Sidebar;
