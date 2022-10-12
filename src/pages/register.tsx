import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  PinInput,
  PinInputField,
  Stack
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Link from 'next/link';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import SEO from '../components/SEO';

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  registerCode?: number;
}

const RegisterPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <>
      <SEO title="Registro" />
      <Center w="full" h="100vh" bg="gray.50">
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: 'transparent', md: 'white' }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing="6">
                <Stack spacing="5">
                  <FormControl isInvalid={Boolean(errors.fullName)}>
                    <FormLabel htmlFor="fullName">Nome completo</FormLabel>
                    <Input
                      id="fullName"
                      type="text"
                      {...register('fullName', {
                        required: 'Campo não preenchido'
                      })}
                    />
                    {errors.fullName && <FormErrorMessage>{errors.fullName.message}</FormErrorMessage>}
                  </FormControl>

                  <FormControl isInvalid={Boolean(errors.email)}>
                    <FormLabel htmlFor="email">Endereço de email</FormLabel>
                    <Input
                      id="email"
                      type="text"
                      {...register('email', {
                        required: 'Campo não preenchido.',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Endereço de email inválido.'
                        }
                      })}
                    />
                    {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
                  </FormControl>

                  <FormControl isInvalid={Boolean(errors.password)}>
                    <FormLabel htmlFor="password">Senha</FormLabel>
                    <Input
                      id="password"
                      type="password"
                      {...register('password', {
                        required: 'Campo não preenchido'
                      })}
                    />
                    {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
                  </FormControl>

                  <FormControl isInvalid={Boolean(errors.passwordConfirm)}>
                    <FormLabel htmlFor="passwordConfirm">Confirmação de senha</FormLabel>
                    <Input
                      id="passwordConfirm"
                      type="passwordConfirm"
                      {...register('passwordConfirm', {
                        required: 'Campo não preenchido'
                      })}
                    />
                    {errors.passwordConfirm && <FormErrorMessage>{errors.passwordConfirm.message}</FormErrorMessage>}
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="passwordConfirm">Você tem algum código de registro?</FormLabel>
                    <HStack>
                      <PinInput type="number">
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                      </PinInput>
                    </HStack>
                    <FormHelperText>Este campo é opcional.</FormHelperText>
                  </FormControl>
                </Stack>

                <Stack spacing="6">
                  <Button type="submit" colorScheme="yellow">
                    Registrar
                  </Button>
                  <Link href="/">
                    <Button variant="link" colorScheme="yellow">
                      Voltar à página de login
                    </Button>
                  </Link>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Container>
      </Center>
    </>
  );
};

export default RegisterPage;
