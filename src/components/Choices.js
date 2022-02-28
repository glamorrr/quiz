import { useNavigate } from 'react-router-dom';
import { VStack, useRadioGroup } from '@chakra-ui/react';
import Choice from './Choice';

const Choices = ({ options, questionNumber, totalQuestions, answers, setAnswers, ...rest }) => {
    const navigate = useNavigate();
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'answers',
        defaultValue: '',
        onChange: (value) => {
            setAnswers({ ...answers, [questionNumber]: value });
            if (questionNumber < totalQuestions) {
                navigate(`/quiz/ongoing/${Number(questionNumber) + 1}`);
            }
        },
    });
    const group = getRootProps();

    return (
        <VStack alignItems="flex-start" spacing={6} {...group} {...rest}>
            {options.map((value) => {
                const radio = getRadioProps({ value });
                return (
                    <Choice key={value} {...radio} isChecked={value === answers[questionNumber]}>
                        {value}
                    </Choice>
                );
            })}
        </VStack>
    );
};

export default Choices;
