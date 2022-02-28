import decodeHtml from './decodeHTML';

const createChoices = (incorrectAnswers, correctAnswer) => {
    try {
        const shuffled = [];
        const correctAnswerIndex = Math.floor(Math.random() * (incorrectAnswers.length + 1));
        let incorrectAnswerIndex = 0;
        for (let i = 0; i < incorrectAnswers.length + 1; i++) {
            if (i === correctAnswerIndex) {
                shuffled.push(decodeHtml(correctAnswer));
                continue;
            }

            shuffled.push(decodeHtml(incorrectAnswers[incorrectAnswerIndex]));
            incorrectAnswerIndex++;
        }

        return shuffled;
    } catch (err) {
        console.log(err);
    }
};

export default createChoices;
