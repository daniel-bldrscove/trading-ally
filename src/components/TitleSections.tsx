// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

interface Props {
  title: string;
}

export const TitleSections = ({ title }: Props): JSX.Element => {
  return (
    <Flex>
      <Heading
        as="h2"
        mt="1rem"
        mb="2rem"
        w="full"
        borderBottom="1px dashed"
        borderBottomColor="brand.gray.200"
      >
        {title}
      </Heading>
    </Flex>
  );
};
