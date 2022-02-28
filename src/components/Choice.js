import { Box, Center, Flex, Text, useRadio } from '@chakra-ui/react';

const Choice = (props) => {
    const { getInputProps, getCheckboxProps } = useRadio(props);
    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
        <Box as="label">
            <input {...input} />
            <Flex
                {...checkbox}
                alignItems="center"
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
                borderColor="gray.100"
                _checked={{
                    bg: 'gray.50',
                    color: 'blue.500',
                }}
                _focus={{
                    boxShadow: 'outline',
                }}
                px={5}
                py={3}
            >
                <Center
                    flexShrink={0}
                    mr={4}
                    borderWidth="2px"
                    borderColor={props.isChecked ? 'blue.500' : 'gray.300'}
                    boxSize={4}
                    rounded="full"
                >
                    {props.isChecked && <Box bg="blue.500" boxSize={2} rounded="full" />}
                </Center>
                <Text>{props.children}</Text>
            </Flex>
        </Box>
    );
};

export default Choice;
