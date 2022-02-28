import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react';
import axios from 'axios';
import createQuiz from '../utils/createQuiz';
import useLocalStorage from '../utils/useLocalStorage';

const NewQuizForm = ({ ...rest }) => {
    const initialSelected = {
        data: '',
        error: false,
    };
    const [selected, setSelected] = useState(initialSelected);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [, setOngoingQuiz] = useLocalStorage('ongoingQuiz', null);
    const [, setAnswers] = useLocalStorage('ongoingAnswer', null);

    const onChange = (e) => {
        setSelected((prev) => ({
            ...prev,
            data: e.target.value,
            error: false,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (!selected.data) throw new Error('category empty');
            const res = await axios.get(
                `https://opentdb.com/api.php?amount=10&category=${selected.data}&difficulty=easy&type=multiple`,
                { timeout: 10 * 1000 }
            );
            const newQuiz = createQuiz(res.data.results);
            setOngoingQuiz(newQuiz);
            setAnswers({});
            setIsLoading(false);
            navigate('/quiz/ongoing/1');
        } catch (err) {
            setIsLoading(false);
            if (err.message === 'category empty') {
                setSelected((prev) => ({
                    ...prev,
                    error: true,
                }));
                return;
            }

            console.error(err);
            setSelected(initialSelected);
            alert('Oops! Something went wrong. Check console for more detail.');
        }
    };

    return (
        <Box as="form" {...rest} onSubmit={onSubmit}>
            <FormControl isInvalid={selected.error}>
                <FormLabel color="gray.500">Pilih Kategori</FormLabel>
                <Select
                    onChange={onChange}
                    name="category"
                    variant="filled"
                    placeholder="Pilih Kategori"
                    size="lg"
                    value={selected.data}
                >
                    <option value="9">General Knowledge</option>
                    <option value="21">Sports</option>
                    <option value="27">Animals</option>
                </Select>
                <FormErrorMessage>Kategori harus diisi</FormErrorMessage>
            </FormControl>
            <Button
                type="submit"
                mt={10}
                colorScheme="blue"
                w="full"
                size="lg"
                isLoading={isLoading}
            >
                Mulai
            </Button>
        </Box>
    );
};

export default NewQuizForm;
