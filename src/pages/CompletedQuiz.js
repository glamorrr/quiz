import { Link as ReactRouterLink, Navigate, useParams } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Flex, Heading, Text } from '@chakra-ui/react';
import formatDate from '../utils/formatDate';
import useLocalStorage from '../utils/useLocalStorage';

const CompletedQuiz = () => {
    const { id } = useParams();
    const [quizzes] = useLocalStorage('completedQuiz', []);
    const quiz = quizzes.find((quiz) => quiz.id === id);

    if (!quiz) return <Navigate to="/dashboard" replace />;

    const score = (quiz.answers.correct / quiz.answers.all) * 100;

    return (
        <Box mt={8} mx="auto" maxW="300px">
            <Heading textAlign="center" as="h1" fontWeight="normal" fontSize="xl">
                Kuis
                <br />
                <Text display="block" mt={1} fontSize="2xl" as="span" fontWeight="semibold">
                    {quiz.category}
                </Text>
            </Heading>
            <Text color="gray.500" mt={2} textAlign="center">
                {formatDate(quiz.due_date)}
            </Text>
            <Center
                flexDirection="column"
                mx="auto"
                bg="gray.50"
                shadow="base"
                rounded="lg"
                w={48}
                h={28}
                mt={12}
            >
                <Text fontSize="4xl" fontWeight="semibold">
                    {score}
                </Text>
                <Text color="gray.500" mt={-2}>
                    Skor
                </Text>
            </Center>
            <Flex mt={16} justifyContent="space-between">
                <Box>
                    <Text color="gray.500">Jumlah Jawab</Text>
                    <Text fontSize="xl">{quiz.answers.answered} Soal</Text>
                    <Text mt={4} color="gray.500">
                        Jumlah Benar
                    </Text>
                    <Text fontSize="xl">{quiz.answers.correct} Soal</Text>
                    <Text mt={4} color="gray.500">
                        Jumlah Salah
                    </Text>
                    <Text fontSize="xl">{quiz.answers.false} Soal</Text>
                </Box>
                <Box>
                    <Text color="gray.500">Waktu</Text>
                    <Text fontSize="xl">3 Menit</Text>
                    <Text mt={4} color="gray.500">
                        Jumlah Soal
                    </Text>
                    <Text fontSize="xl">{quiz.answers.all} Soal</Text>
                </Box>
            </Flex>
            <Button
                leftIcon={<ArrowBackIcon />}
                as={ReactRouterLink}
                to="/dashboard"
                mt={12}
                w="full"
                variant="outline"
                colorScheme="blue"
            >
                Kembali
            </Button>
        </Box>
    );
};

export default CompletedQuiz;
