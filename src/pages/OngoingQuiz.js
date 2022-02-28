import { Navigate, useParams } from 'react-router-dom';
import { Box, Button, Flex, Heading, ListItem, OrderedList, Text, VStack } from '@chakra-ui/react';
import Choices from '../components/Choices';
import CompleteQuizButton from '../components/CompleteQuizButton';
import QuestionNumberNavigation from '../components/QuestionNumberNavigation';
import Timer from '../components/Timer';
import useLocalStorage from '../utils/useLocalStorage';

const OngoingQuiz = () => {
    const { questionNumber } = useParams();
    const [ongoingQuiz, setOngoingQuiz] = useLocalStorage('ongoingQuiz', null);
    const [answers, setAnswers] = useLocalStorage('ongoingAnswer', {});

    if (!ongoingQuiz) return <Navigate to="/dashboard" replace />;

    const question = ongoingQuiz.questions[questionNumber - 1];

    const set10SecondsRemainingTime = () => {
        setOngoingQuiz((prev) => ({
            ...prev,
            due_date: new Date(new Date().getTime() + 10 * 1000),
        }));
    };

    return (
        <Box mt={8} mx="auto" maxW="800px" fontSize="lg">
            <Heading textAlign="center" color="gray.500" as="h1" fontWeight="normal" fontSize="xl">
                Kuis
                <br />
                <Text display="block" mt={1} fontSize="2xl" as="span" color="gray.900">
                    {ongoingQuiz.category}
                </Text>
            </Heading>
            <Flex
                mt={12}
                flexDirection={{ base: 'column-reverse', md: 'row' }}
                justifyContent="space-between"
                alignItems="flex-start"
            >
                <Box mt={{ base: 8, md: 0 }} w="full" maxW="450px">
                    <OrderedList start={questionNumber}>
                        <ListItem>{question.question}</ListItem>
                    </OrderedList>
                    <Choices
                        questionNumber={questionNumber}
                        totalQuestions={ongoingQuiz.questions.length}
                        options={question.choices}
                        answers={answers}
                        setAnswers={setAnswers}
                        mt={6}
                        ml={6}
                    />
                    <CompleteQuizButton mt={12} answers={answers} setAnswers={setAnswers} />
                </Box>
                <VStack spacing={6} ml={{ md: 16 }} alignItems="flex-start" maxW="320px">
                    <Timer answers={answers} setAnswers={setAnswers} due={ongoingQuiz.due_date} />
                    <QuestionNumberNavigation
                        total={ongoingQuiz.questions.length}
                        answers={answers}
                    />
                    <Button
                        variant="link"
                        whiteSpace="normal"
                        textAlign="left"
                        colorScheme="red"
                        onClick={set10SecondsRemainingTime}
                    >
                        Ubah sisa waktu pengerjaan menjadi 10 detik
                    </Button>
                </VStack>
            </Flex>
        </Box>
    );
};

export default OngoingQuiz;
