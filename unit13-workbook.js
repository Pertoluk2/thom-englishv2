document.addEventListener('DOMContentLoaded', () => {

    // DAY 13 LOGIC

    // Exercise 1: Answer the questions (Melbourne Seasons)
    document.getElementById('check-d13-ex1').addEventListener('click', () => {
        const answers = {
            'd13-q1': 'No', 'd13-q2': 'winter', 'd13-q3': 'July', 
            'd13-q4': 'late September', 'd13-q5': 'early September', 'd13-q6': '4', 
            'd13-q7': 'hiking, fishing, camping, water skiing', 'd13-q8': 'autumn', 
            'd13-q9': 'Spring', 'd13-q10': 'December, January, and February'
        };
        let correctCount = 0;
        const feedbackDiv = document.getElementById('feedback-d13-ex1');

        for (const id in answers) {
            const input = document.getElementById(id);
            // Normalize and use flexible matching for multi-word answers
            const userValue = input.value.trim().toLowerCase().replace(/[,.]/g, '');
            const correctValue = answers[id].toLowerCase().replace(/[,.]/g, '');

            // Checks if the user answer contains the key words of the correct answer
            const isCorrect = correctValue.split(', ').some(key => userValue.includes(key.trim())) || userValue === correctValue;

            if (isCorrect && userValue.length > 0) {
                input.style.borderColor = 'green';
                correctCount++;
            } else {
                input.style.borderColor = 'red';
            }
        }
        
        if (correctCount === Object.keys(answers).length) {
            feedbackDiv.textContent = 'Tuyệt vời! Tất cả các câu trả lời đều đúng.';
            feedbackDiv.style.color = 'green';
        } else {
            feedbackDiv.textContent = `Bạn đã trả lời đúng ${correctCount} trên ${Object.keys(answers).length} câu. Vui lòng xem lại.`;
            feedbackDiv.style.color = 'red';
        }
    });

    // Exercise 2: Fill in the blanks (Melbourne monologue)
    document.getElementById('check-d13-ex2').addEventListener('click', () => {
        const answers = {
            'd13e2-q1': 'opposite', 'd13e2-q2': 'Right now', 'd13e2-q3': 'the coldest month', 
            'd13e2-q4': 'go skiing', 'd13e2-q5': 'winter', 'd13e2-q6': 'beautiful', 
            'd13e2-q7': 'people', 'd13e2-q8': 'go on picnics', 'd13e2-q9': 'go boating', 
            'd13e2-q10': 'Favorite activities', 'd13e2-q11': 'cleans up'
        };
        let correctCount = 0;
        const feedbackDiv = document.getElementById('feedback-d13-ex2');

        for (const id in answers) {
            const input = document.getElementById(id);
            const userValue = input.value.trim().toLowerCase().replace(/[,.]/g, '');
            const correctValue = answers[id].toLowerCase().replace(/[,.]/g, '');
            
            if (userValue === correctValue) {
                input.style.borderColor = 'green';
                correctCount++;
            } else {
                input.style.borderColor = 'red';
            }
        }
        
        if (correctCount === Object.keys(answers).length) {
            feedbackDiv.textContent = 'Tuyệt vời! Tất cả các câu trả lời đều đúng.';
            feedbackDiv.style.color = 'green';
        } else {
            feedbackDiv.textContent = `Bạn đã trả lời đúng ${correctCount} trên ${Object.keys(answers).length} câu. Vui lòng xem lại.`;
            feedbackDiv.style.color = 'red';
        }
    });
});