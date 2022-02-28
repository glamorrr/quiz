import { useNavigate } from 'react-router-dom';
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import createCompletedQuiz from '../utils/createCompletedQuiz';
import useLocalStorage from '../utils/useLocalStorage';

const CompleteQuizButton = ({ answers, setAnswers, ...rest }) => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [ongoingQuiz, setOngoingQuiz] = useLocalStorage('ongoingQuiz');
    const [, setCompletedQuiz] = useLocalStorage('completedQuiz', []);

    const completeQuiz = () => {
        onClose();
        const newCompletedQuiz = createCompletedQuiz(ongoingQuiz, answers);
        setCompletedQuiz((prev) => [newCompletedQuiz, ...prev]);
        navigate(`/quiz/${newCompletedQuiz.id}`);
        toast({
            title: 'Kuis Selesai',
            description: 'Kuis telah dikumpulkan',
            position: 'top',
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
        setOngoingQuiz(null);
        setAnswers(null);
    };

    return (
        <>
            <Button w="full" {...rest} onClick={onOpen}>
                Selesai
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="sm">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Sudahkan Kuis</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Apakah anda yakin untuk menyelesaikan kuis? Jawaban yang dikumpulkan tidak
                        dapat diubah lagi.
                    </ModalBody>

                    <ModalFooter mt={4}>
                        <Button w="full" onClick={onClose}>
                            Batal
                        </Button>
                        <Button colorScheme="blue" ml={4} w="full" onClick={completeQuiz}>
                            Selesai
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CompleteQuizButton;
