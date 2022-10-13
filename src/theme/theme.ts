import { extendTheme } from '@chakra-ui/react';

const shadows = {
  outline: '0 0 0 3px var(--chakra-colors-yellow-500)'
};

const Input = {
  defaultProps: {
    focusBorderColor: 'yellow.500'
  }
};

const PinInput = {
  defaultProps: {
    focusBorderColor: 'yellow.500'
  }
};

const Select = {
  defaultProps: {
    focusBorderColor: 'yellow.500'
  }
};

export const theme = extendTheme({
  shadows,
  components: {
    Input,
    PinInput,
    Select
  }
});
