import {
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from '@chakra-ui/react';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import { SmLabel } from './SmLabel';

interface InputProps {
  htmlFor: string;
  toolTipDescription: string;
  children: React.ReactNode;
}

export const SmLabelWithTooltip = ({
  htmlFor,
  toolTipDescription,
  children,
}: InputProps): JSX.Element => {
  return (
    <Flex mb={2} w="full">
      <SmLabel htmlFor={htmlFor} color="brand.gray.200">
        {children}
      </SmLabel>
      <Popover isLazy={true} matchWidth={true}>
        <PopoverTrigger>
          <QuestionOutlineIcon
            boxSize=".75rem"
            w="10px"
            color="brand.gray.200"
          />
        </PopoverTrigger>
        <PopoverContent bg="brand.gray.900" w="full">
          <PopoverArrow bg="brand.gray.900" />
          <PopoverBody p={1} pl="10px" fontSize="xs" color="white">
            {toolTipDescription}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};
