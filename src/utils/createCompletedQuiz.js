const createCompletedQuiz = (quiz, userAnswers) => {
    let countCorrect = 0;
    let countFalse = 0;
    let countAnswered = 0;
    quiz.questions.forEach(({ correct_answer }, i) => {
        const questionNumber = i + 1;
        if (!userAnswers[questionNumber]) {
            countFalse++;
        } else if (userAnswers[questionNumber] !== correct_answer) {
            countFalse++;
            countAnswered++;
        } else {
            countCorrect++;
            countAnswered++;
        }
    });

    return {
        id: quiz.id,
        start_date: quiz.start_date,
        due_date: quiz.due_date,
        category: quiz.category,
        answers: {
            all: quiz.questions.length,
            answered: countAnswered,
            correct: countCorrect,
            false: countFalse,
        },
    };
};

export default createCompletedQuiz;
