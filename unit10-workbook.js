document.addEventListener('DOMContentLoaded', () => {

    // DAY 2: Exercise 2: Fill in the blanks using should or shouldn't.
    document.getElementById('check-u10d2e2').addEventListener('click', () => {
        const answers = {
            'u10d2e2-q1': 'should', 'u10d2e2-q2': 'shouldn\'t', 'u10d2e2-q3': 'shouldn\'t', 
            'u10d2e2-q4': 'should', 'u10d2e2-q5': 'shouldn\'t', 'u10d2e2-q6': 'should', 
            'u10d2e2-q7': 'should', 'u10d2e2-q8': 'should', 'u10d2e2-q9': 'shouldn\'t', 
            'u10d2e2-q10': 'shouldn\'t', 'u10d2e2-q11': 'should', 'u10d2e2-q12': 'shouldn\'t', 
            'u10d2e2-q13': 'should', 'u10d2e2-q14': 'should', 'u10d2e2-q15': 'should'
        };
        let correctCount = 0;
        const feedbackDiv = document.getElementById('feedback-u10d2e2');
        const totalQuestions = Object.keys(answers).length;
        
        for (const id in answers) {
            const input = document.getElementById(id);
            // Allow should or shouldn't with and without apostrophe
            const userAnswer = input.value.trim().toLowerCase().replace(/'/g, '');
            const correctValue = answers[id].toLowerCase().replace(/'/g, '');

            if (userAnswer === correctValue) {
                input.style.borderColor = 'green';
                correctCount++;
            } else {
                input.style.borderColor = 'red';
            }
        }
        
        if (correctCount === totalQuestions) {
            feedbackDiv.textContent = 'Tuyệt vời! Tất cả các câu trả lời đều đúng.';
            feedbackDiv.style.color = 'green';
        } else {
            feedbackDiv.textContent = `Bạn đã trả lời đúng ${correctCount} trên ${totalQuestions} câu. Vui lòng xem lại.`;
            feedbackDiv.style.color = 'red';
        }
    });

    // DAY 3: Exercise 1: Nadia's Note
    document.getElementById('check-u10d3e1').addEventListener('click', () => {
        const answers = {
            'u10d3e1-q1': 'No, she doesn\'t.', 
            'u10d3e1-q2': 'She must eat before taking the pills.', 
            'u10d3e1-q3': 'No, she mustn\'t.', 
            'u10d3e1-q4': 'No, she doesn\'t.', 
            'u10d3e1-q5': 'She has to call Dr. Turner immediately.'
        };
        let correctCount = 0;
        const feedbackDiv = document.getElementById('feedback-u10d3e1');
        const totalQuestions = Object.keys(answers).length;
        
        for (const id in answers) {
            const input = document.getElementById(id);
            // Allow key phrase matching and exact match for yes/no
            const userAnswer = input.value.trim().toLowerCase().replace(/[.,!]/g, '');
            const correctValue = answers[id].toLowerCase().replace(/[.,!]/g, '');

            let isCorrect = false;
            if (id === 'u10d3e1-q1' || id === 'u10d3e1-q3' || id === 'u10d3e1-q4') {
                isCorrect = userAnswer.startsWith('no');
            } else if (userAnswer.includes(correctValue.split(' ').slice(1).join(' ').trim())) {
                isCorrect = true;
            }

            if (isCorrect) {
                input.style.borderColor = 'green';
                correctCount++;
            } else {
                input.style.borderColor = 'red';
            }
        }
        
        if (correctCount === totalQuestions) {
            feedbackDiv.textContent = 'Tuyệt vời! Alle antwoorden zijn correct.';
            feedbackDiv.style.color = 'green';
        } else {
            feedbackDiv.textContent = `Bạn đã trả lời đúng ${correctCount} trên ${totalQuestions} câu. Vui lòng xem lại.`;
            feedbackDiv.style.color = 'red';
        }
    });
});