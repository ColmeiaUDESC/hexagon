import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Stack,
  InputGroup,
  InputRightElement,
  IconButton,
  useToast
} from '@chakra-ui/react';
import { ClipboardText } from 'phosphor-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { trpc } from '../../../utils/trpc';

interface FormValues {
  email: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateToken = ({ isOpen, onClose }: Props) => {
  const [token, setToken] = useState<number | undefined>(undefined);

  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>();

  const createToken = trpc.registerToken.create.useMutation();

  const copyToClipboard = (value: string) => {
    toast({
      title: 'Token copiado para a área de transferência!',
      status: 'success',
      duration: 3500,
      position: 'top-right'
    });

    navigator.clipboard.writeText(value);
  };

  const onSubmit = async (data: FormValues) => {
    const res = await createToken.mutateAsync({ ...data });

    if (res.status === 200) {
      toast({
        title: 'Token criado com sucesso!',
        status: 'success',
        duration: 3500,
        position: 'top-right'
      });

      setToken(res.token.token);
    } else {
      toast({
        title: 'Erro ao tentar criar token!',
        description: 'Verifique as informações e tente novamente.',
        status: 'error',
        duration: 3500,
        position: 'top-right'
      });
    }
  };

  const handleClose = () => {
    if (!createToken.isLoading) onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Criar token de registro</ModalHeader>
          <ModalCloseButton disabled={createToken.isLoading} />
          <ModalBody>
            <Stack spacing={2}>
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

              {token && (
                <FormControl>
                  <FormLabel htmlFor="password">Token</FormLabel>
                  <InputGroup>
                    <InputRightElement>
                      <IconButton
                        aria-label="Copy to clipboard"
                        variant="link"
                        icon={<ClipboardText size={18} weight="fill" />}
                        onClick={() => copyToClipboard(String(token))}
                      />
                    </InputRightElement>
                    <Input id="token" value={token} />
                  </InputGroup>
                </FormControl>
              )}
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button disabled={createToken.isLoading} mr={3} onClick={handleClose}>
              Cancelar
            </Button>
            <Button isLoading={createToken.isLoading} type="submit" colorScheme="yellow">
              Confirmar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateToken;
