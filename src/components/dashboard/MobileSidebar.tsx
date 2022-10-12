import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { List } from 'phosphor-react';
import SidebarContent from './SidebarContent';

const MobileSidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        display={{ base: 'flex', md: 'none' }}
        bg="white"
        w="full"
        p={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontWeight="extrabold" fontSize="lg">
          Hexagon
        </Text>
        <IconButton
          colorScheme="gray"
          aria-label="Open sidebar"
          onClick={onOpen}
          icon={<List size={18} weight="bold" />}
        />
      </Box>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent w="full" bg="white" h="full" maxW="xs" p={8} justifyContent="space-between" flexShrink={0}>
          <DrawerCloseButton />
          <SidebarContent />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileSidebar;
