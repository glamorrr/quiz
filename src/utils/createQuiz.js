import { nanoid } from 'nanoid';
import createChoices from './createChoices';
import decodeHtml from './decodeHTML';

const createQuiz = (questions) => {
    const currentTime = new Date().getTime();
    const category = questions[0].category;
    return {
        id: nanoid(),
        start_date: new Date(currentTime),
        due_date: new Date(currentTime + 3 * 60 * 1000),
        category,
        questions: questions.map((question) => {
            const parsedQuestion = decodeHtml(question.question);
            const choices = createChoices(question.incorrect_answers, question.correct_answer);
            return { ...question, question: parsedQuestion, choices };
        }),
    };
};

export default createQuiz;
