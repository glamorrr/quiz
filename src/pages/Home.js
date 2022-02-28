import { Link as ReactRouterLink } from 'react-router-dom';
import { Heading, Box, Button, Text } from '@chakra-ui/react';

const Home = () => {
    return (
        <Box mt={12} mx="auto" maxW="360px">
            <Heading textAlign="center" fontSize="3xl" as="h1">
                Quiz App
            </Heading>
            <Text mt={6} color="gray.500">
                Aplikasi kuis yang mengambil soal dari Open Trivia DB dan menyimpan data di
                localStorage browser.
            </Text>
            <Button as={ReactRouterLink} to="/login" mt={10} colorScheme="blue" w="full" size="lg">
                Login
            </Button>
        </Box>
    );
};

export default Home;
