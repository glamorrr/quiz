import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from './useLocalStorage';

const useResumeQuiz = () => {
    const [ongoingQuiz] = useLocalStorage('ongoingQuiz');
    const [answers] = useLocalStorage('ongoingAnswer');
    const navigate = useNavigate();

    useEffect(() => {
        if (ongoingQuiz) {
            for (let number = 1; number <= ongoingQuiz.questions.length; number++) {
                if (!answers[number]) {
                    navigate(`/quiz/ongoing/${number}`, { replace: true });
                    return;
                }
            }

            const lastQuestion = ongoingQuiz.questions.length;
            navigate(`/quiz/ongoing/${lastQuestion}`, { replace: true });
        }
    }, []);
};

export default useResumeQuiz;
