import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Center, useToast } from '@chakra-ui/react';
import createCompletedQuiz from '../utils/createCompletedQuiz';
import formatRemainingTime from '../utils/formatRemainingTime';
import useLocalStorage from '../utils/useLocalStorage';

const Timer = ({ answers, setAnswers, due }) => {
    const dueMilliseconds = new Date(due).getTime();
    const [remainingTime, setRemainingTime] = useState(dueMilliseconds - new Date().getTime());
    const navigate = useNavigate();
    const toast = useToast();
    const [ongoingQuiz, setOngoingQuiz] = useLocalStorage('ongoingQuiz', null);
    const [, setCompletedQuiz] = useLocalStorage('completedQuiz', []);

    useEffect(() => {
        const currentTime = new Date().getTime();
        const timer =
            remainingTime > 0 &&
            setInterval(() => setRemainingTime(dueMilliseconds - currentTime), 1000);

        if (remainingTime < 0) {
            const newCompletedQuiz = createCompletedQuiz(ongoingQuiz, answers);
            setCompletedQuiz((prev) => [newCompletedQuiz, ...prev]);
            navigate(`/quiz/${newCompletedQuiz.id}`);
            toast({
                title: 'Kuis Selesai',
                description: 'Waktu pengerjaan kuis telah habis',
                status: 'success',
                position: 'top',
                duration: 5000,
                isClosable: true,
            });
            setOngoingQuiz(null);
            setAnswers(null);
        }

        return () => clearInterval(timer);
    }, [remainingTime]);

    return (
        <Center
            h="60px"
            p={4}
            w="140px"
            fontSize="3xl"
            fontWeight="semibold"
            rounded="md"
            bg="gray.50"
            shadow="base"
        >
            {formatRemainingTime(remainingTime)}
        </Center>
    );
};

export default Timer;
