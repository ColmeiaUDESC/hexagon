import {
  Button,
  FormControl,
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
  Stack
} from '@chakra-ui/react';

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

const EditUser = ({ onClose, isOpen }: Props) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Editar usuário: `username`</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel htmlFor="fullName">Nome completo</FormLabel>
            <Input id="fullName" type="text" />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="email">Endereço de email</FormLabel>
            <Input id="email" type="text" />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="fullName">Role</FormLabel>
            <Select placeholder="Selecione uma opção">
              <option value="USER">Voluntário</option>
              <option value="ADMIN">Bolsista</option>
            </Select>
          </FormControl>
        </Stack>
      </ModalBody>

      <ModalFooter>
        <Button mr={3} onClick={onClose}>
          Cancelar
        </Button>
        <Button colorScheme="yellow">Salvar</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default EditUser;
