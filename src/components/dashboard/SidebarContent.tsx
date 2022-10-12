import { Button, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { House, Users } from 'phosphor-react';
import NextLink from 'next/link';

interface LinkProps {
  title: string;
  icon: JSX.Element;
  path: string;
}

const Link = ({ title, icon, path }: LinkProps) => (
  <NextLink href={path}>
    <Button
      colorScheme="white"
      justifyContent="left"
      bg="white"
      _hover={{
        bg: 'gray.50'
      }}
      _active={{
        bg: 'gray.200'
      }}
    >
      <Text color="gray.800">{icon}</Text>
      <Text ml="1rem" color="gray.800">
        {title}
      </Text>
    </Button>
  </NextLink>
);

const ActiveLink = ({ title, path, icon }: LinkProps) => (
  <NextLink href={path}>
    <Button
      colorScheme="white"
      justifyContent="left"
      bg="yellow.50"
      _hover={{
        bg: 'yellow.100'
      }}
      _active={{
        bg: 'yellow.200'
      }}
    >
      <Text color="yellow.800">{icon}</Text>
      <Text ml="1rem" color="yellow.800">
        {title}
      </Text>
    </Button>
  </NextLink>
);

const SidebarContent = () => {
  const router = useRouter();

  const SIDEBAR_DATA = [
    {
      id: 0,
      icon: <House size={24} weight={router.pathname === '/dashboard' ? 'fill' : 'bold'} />,
      title: 'Dashboard',
      path: '/dashboard',
      active: router.pathname === '/dashboard'
    },
    {
      id: 1,
      icon: <Users size={24} weight={router.pathname === '/dashboard/users' ? 'fill' : 'bold'} />,
      title: 'Usuários',
      path: '/dashboard/users',
      active: router.pathname === '/dashboard/users'
    }
  ];

  return (
    <>
      <Stack spacing={2}>
        {SIDEBAR_DATA.map((item) =>
          item.active ? <ActiveLink key={item.id} {...item} /> : <Link key={item.id} {...item} />
        )}
      </Stack>

      <Menu>
        <MenuButton as={Button} colorScheme="gray">
          Ações
        </MenuButton>
        <MenuList>
          <MenuItem>Configurações</MenuItem>
          <MenuItem>Desconectar</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default SidebarContent;
