import { useParams, Link as ReactRouterLink } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/react';

const QuestionNumberNavigation = ({ total, answers }) => {
    const { questionNumber } = useParams();

    return (
        <Box
            display="grid"
            gridTemplateColumns="repeat(5, 1fr)"
            rounded="md"
            p={3}
            gap={3}
            bg="gray.50"
            shadow="base"
            w="310px"
        >
            {Array.from(Array(total).keys()).map((i) => {
                const number = i + 1;
                const isAnswered = answers[number];
                const isSelected = Number(questionNumber) === number;
                let buttonStyles = { bg: 'gray.50' };
                if (isSelected) {
                    buttonStyles = {
                        fontSize: 'lg',
                        bg: 'gray.900',
                        color: 'gray.50',
                        fontWeight: 'semibold',
                        _hover: {
                            bg: 'gray.900',
                            color: 'gray.50',
                        },
                    };
                } else if (isAnswered) {
                    buttonStyles = {
                        bg: 'blue.200',
                        _hover: {
                            bg: 'blue.300',
                        },
                    };
                }

                return (
                    <Button
                        key={i}
                        as={ReactRouterLink}
                        to={`/quiz/ongoing/${number}`}
                        key={i}
                        w={12}
                        h={12}
                        {...buttonStyles}
                    >
                        {number}
                    </Button>
                );
            })}
        </Box>
    );
};

export default QuestionNumberNavigation;
