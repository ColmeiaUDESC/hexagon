import { NextPage } from 'next';
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  PinInput,
  PinInputField,
  Stack,
  useToast
} from '@chakra-ui/react';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SEO from '../components/SEO';
import { trpc } from '../utils/trpc';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const ConfirmEmailPage: NextPage = () => {
  const router = useRouter();
  const toast = useToast();

  const [email, setEmail] = useState<string>('');
  const [token, setToken] = useState<string>('');

  const verifyEmail = trpc.user.verifyEmail.useMutation();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await verifyEmail.mutateAsync({
      email,
      token: Number(token)
    });

    if (res.status === 200) {
      toast({
        title: 'Endereço de email confirmado com sucesso!',
        description: 'Agora você pode realizar o seu login.',
        status: 'success',
        duration: 3500,
        position: 'top-right'
      });

      router.push('/');
    } else {
      toast({
        title: 'Erro ao confirmar endereço de email!',
        description: 'Verifique os dados e tente novamente.',
        status: 'error',
        duration: 3500,
        position: 'top-right'
      });
    }
  };

  useEffect(() => {
    if (router.query.email) {
      console.log('email');
      setEmail(router.query.email as string);
    }
    if (router.query.token) setToken(router.query.token as string);
  }, [router.query]);

  return (
    <>
      <SEO title="Confirmar email" />
      <Center w="full" h="100vh" bg="gray.50">
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: 'transparent', md: 'white' }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            <form onSubmit={onSubmit}>
              <Stack spacing="6">
                <Stack spacing="5">
                  <FormControl isInvalid={Boolean(email && !emailRegex.test(email))}>
                    <FormLabel htmlFor="email">Endereço de email</FormLabel>
                    <Input
                      id="email"
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      disabled={Boolean(router.query.email)}
                    />
                    <FormErrorMessage>Endereço de email inválido.</FormErrorMessage>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="email">Token de registro</FormLabel>
                    <HStack>
                      <PinInput
                        type="number"
                        onChange={(value) => {
                          setToken(value);
                        }}
                        value={token}
                        isDisabled={Boolean(router.query.token)}
                      >
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                      </PinInput>
                    </HStack>
                  </FormControl>
                </Stack>
                <Stack spacing="6">
                  <Button
                    disabled={!email || !token || token.length < 6}
                    type="submit"
                    colorScheme="yellow"
                    isLoading={verifyEmail.isLoading}
                  >
                    Confirmar
                  </Button>
                  <Box textAlign="center">
                    <Link href="/">
                      <Button disabled={verifyEmail.isLoading} variant="link" colorScheme="yellow">
                        Voltar à página de login
                      </Button>
                    </Link>
                  </Box>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Container>
      </Center>
    </>
  );
};

export default ConfirmEmailPage;
