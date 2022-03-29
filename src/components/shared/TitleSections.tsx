import * as React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

type TitleSectionProps = {
  children: React.ReactNode;
};

export default function TitleSection({ children }: TitleSectionProps) {
  return (
    <Flex>
      <Heading as="h2" mt="1rem" mb="2rem" w="full">
        {children}
      </Heading>
    </Flex>
  );
}
