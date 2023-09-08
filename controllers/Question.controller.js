module.exports = {
    // LIMPA AS INFORMACOES DE AQUECEDOR
    parseQuestionForm(formAquecedor) {
        const questions = formAquecedor.questions;
        let parsedQuestion = {};
        questions.forEach(question => {
            parsedQuestion[question.title] = question.answer;
        });
        const parse = {
            name: formAquecedor.name,
            questions: parsedQuestion
        }
        return parse;

    },
    removeKey(obj, keyToRemove) {
        const newObj = { ...obj };
        if (newObj.hasOwnProperty(keyToRemove)) {
            delete newObj[keyToRemove];
        }
        return newObj;
    }
}