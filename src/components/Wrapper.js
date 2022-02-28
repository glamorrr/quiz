import { Box } from '@chakra-ui/react';

const Wrapper = ({ children }) => {
    return (
        <Box maxW="1024px" mx="auto" pb={24} px="16px">
            {children}
        </Box>
    );
};

export default Wrapper;
