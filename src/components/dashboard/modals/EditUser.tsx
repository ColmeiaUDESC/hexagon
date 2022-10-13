import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useToast
} from '@chakra-ui/react';
import { User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { trpc } from '../../../utils/trpc';

interface Props {
  handleCloseEditModal: (saved: boolean) => void;
  isOpen: boolean;
  user: User;
}

interface FormValues {
  fullName?: string;
  email?: string;
  role: 'ADMIN' | 'USER';
}

const EditUser = ({ handleCloseEditModal, isOpen, user }: Props) => {
  const toast = useToast();

  const editUser = trpc.user.edit.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      email: user.email,
      fullName: user.fullName,
      role: user.role
    }
  });

  const onSubmit = async (data: FormValues) => {
    const res = await editUser.mutateAsync({ id: user.id, ...data });

    if (res.status === 200) {
      toast({
        title: 'Usuário atualizado com sucesso!',
        status: 'success',
        duration: 3500,
        position: 'top-right'
      });

      handleCloseEditModal(true);
    } else {
      toast({
        title: 'Erro ao tentar atualizar o usuário!',
        description: 'Verifique e tente novamente.',
        status: 'error',
        duration: 3500,
        position: 'top-right'
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (!editUser.isLoading) handleCloseEditModal(false);
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar usuário: {user?.fullName}</ModalHeader>
        <ModalCloseButton disabled={editUser.isLoading} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Stack spacing={2}>
              <FormControl isInvalid={Boolean(errors.fullName)}>
                <FormLabel htmlFor="fullName">Nome completo</FormLabel>
                <Input
                  id="fullName"
                  type="text"
                  {...register('fullName', {
                    required: 'Campo não preenchido.'
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

              <FormControl isInvalid={Boolean(errors.role)}>
                <FormLabel htmlFor="role">Role</FormLabel>
                <Select
                  placeholder="Selecione uma opção"
                  {...register('role', {
                    required: 'Campo não preenchido.'
                  })}
                >
                  <option value="USER">Voluntário</option>
                  <option value="ADMIN">Bolsista</option>
                </Select>
                {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>}
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={() => handleCloseEditModal(false)} disabled={editUser.isLoading}>
              Cancelar
            </Button>
            <Button type="submit" colorScheme="yellow" isLoading={editUser.isLoading}>
              Salvar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditUser;
