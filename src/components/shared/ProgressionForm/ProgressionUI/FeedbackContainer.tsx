import * as React from 'react';
import { motion } from 'framer-motion';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import { useFormikContext } from 'formik';

export const FeedbackContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const summaryBg = useColorModeValue('white', 'brand.gray.800');
  const [borderColor, setBorderColor] = React.useState('');
  const {
    status: { formStatus, error, success },
  } = useFormikContext();

  React.useEffect(() => {
    if (formStatus === 'submitted' && !success && typeof error == 'object') {
      setBorderColor('brand.red.500');
    } else if (
      formStatus === 'readyToSubmit' ||
      (formStatus === 'submitted' && success)
    ) {
      setBorderColor('brand.green.400');
    }
  }, [error, formStatus, success]);

  return (
    <motion.div
      key="feedback-summary-container"
      initial={{ opacity: 0, y: -20 }} // how the animation starts
      animate={{ opacity: 1, y: 0 }} // how the animation ends
      exit={{
        opacity: 0,
        transition: { duration: 0.25 },
      }} // on component unmount
      transition={{
        y: {
          type: 'spring',
          bounce: 0.65,
        },
      }}
    >
      <Flex
        mt={2}
        pl={[4, 0]}
        pr={[4, 0]}
        align="center"
        justify="center"
        className="feedback-container"
      >
        <Flex
          p={6}
          bg={summaryBg}
          border="2px"
          justify="start"
          align="center"
          borderRadius="md"
          width="full"
          className="feedback-wrapper"
          borderColor={borderColor}
        >
          {children}
        </Flex>
      </Flex>
    </motion.div>
  );
};
