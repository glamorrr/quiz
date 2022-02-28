import { Box, Heading, Text } from '@chakra-ui/react';
import NewQuizForm from '../components/NewQuizForm';

const NewQuiz = () => {
    return (
        <Box mt={12} mx="auto" maxW="360px">
            <Heading textAlign="center" fontSize="3xl" as="h1">
                Kuis
            </Heading>
            <Text mt={6} color="gray.500">
                Waktu
            </Text>
            <Text fontSize="xl">3 Menit</Text>
            <Text mt={4} color="gray.500">
                Jumlah Soal
            </Text>
            <Text fontSize="xl">10 Soal</Text>
            <NewQuizForm mt={4} />
        </Box>
    );
};

export default NewQuiz;
