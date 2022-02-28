import { Link as ReactRouterLink } from 'react-router-dom';
import { AddIcon } from '@chakra-ui/icons';
import { Heading, Box, Button, Text, VStack, Flex, Center, useToast } from '@chakra-ui/react';
import CompletedQuizNotFound from '../components/CompletedQuizNotFound';
import useLocalStorage from '../utils/useLocalStorage';
import { useAuth } from '../utils/auth';
import formatDate from '../utils/formatDate';

const Dashboard = () => {
    const { user, signout } = useAuth();
    const toast = useToast();
    const [quizzes] = useLocalStorage('completedQuiz', []);

    const onSignout = () => {
        signout();
        toast({
            title: 'Logout Berhasil',
            description: ``,
            position: 'top',
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
    };

    return (
        <Box mt={12} mx="auto" maxW="400px">
            <Heading textAlign="center" fontSize="3xl" as="h1">
                Hai, {user.email}
            </Heading>
            {quizzes.length === 0 ? (
                <CompletedQuizNotFound mt={12} />
            ) : (
                <VStack spacing={6} mt={12} w="full">
                    <Button
                        as={ReactRouterLink}
                        to="/quiz/new"
                        leftIcon={<AddIcon boxSize={4} />}
                        colorScheme="blue"
                        size="lg"
                    >
                        Kerjakan Kuis
                    </Button>
                    {quizzes.map((quiz) => {
                        const score = (quiz.answers.correct / quiz.answers.all) * 100;
                        return (
                            <Flex
                                key={quiz.id}
                                as={ReactRouterLink}
                                to={`/quiz/${quiz.id}`}
                                w="full"
                                alignItems="center"
                                justifyContent="space-between"
                                px={6}
                                py={4}
                                rounded="lg"
                                borderColor="gray.200"
                                borderWidth="1px"
                                cursor="pointer"
                                _hover={{ shadow: 'md' }}
                            >
                                <Box>
                                    <Text fontSize="lg">Kuis</Text>
                                    <Text fontSize="xl" fontWeight="semibold">
                                        {quiz.category}
                                    </Text>
                                    <Text mt={2} color="gray.500">
                                        {formatDate(quiz.due_date)}
                                    </Text>
                                </Box>
                                <Center rounded="md" ml={8} boxSize={20} bg="gray.50">
                                    <Text fontSize="3xl" fontWeight="semibold">
                                        {score}
                                    </Text>
                                </Center>
                            </Flex>
                        );
                    })}
                </VStack>
            )}
            <Button
                variant="outline"
                onClick={onSignout}
                mx="auto"
                w="full"
                mt={32}
                size="lg"
                colorScheme="blue"
            >
                Logout
            </Button>
        </Box>
    );
};

export default Dashboard;
