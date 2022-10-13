import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react';
import { useRef } from 'react';

interface Props {
  title: string;
  message: string;
  isOpen: boolean;
  onClose: (confirmed: boolean) => void;
  isLoading: boolean;
}

const ConfirmAction = ({ title, message, isOpen, onClose, isLoading }: Props) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={() => {
        onClose(false);
      }}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button
              onClick={() => {
                onClose(false);
              }}
              ref={cancelRef}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                onClose(true);
              }}
              ml={3}
              isLoading={isLoading}
            >
              Confirmar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmAction;
