document.addEventListener('DOMContentLoaded', () => {

    // DAY 12 LOGIC

    // Exercise 2: Fill in the blanks
    document.getElementById('check-d12-ex2').addEventListener('click', () => {
        const answers = {
            'd12-q1': 'couple', 'd12-q2': 'broke', 'd12-q3': 'shoulder', 'd12-q4': 'little', 
            'd12-q5': 'lion', 'd12-q6': 'cry', 'd12-q7': 'graduation', 'd12-q8': 'proud', 
            'd12-q9': 'hold', 'd12-q10': 'fearless'
        };
        let correctCount = 0;
        const feedbackDiv = document.getElementById('feedback-d12-ex2');
        
        for (const id in answers) {
            const input = document.getElementById(id);
            if (input.value.trim().toLowerCase() === answers[id].toLowerCase()) {
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

    // Exercise 3: Nice to meet you variations
    document.getElementById('check-d12-ex3').addEventListener('click', () => {
        const answers = {
            'd12-ex3-q1': 'meet', 'd12-ex3-q2': 'It\'s a pleasure', 'd12-ex3-q3': 'Pleased', 
            'd12-ex3-q4': 'to', 'd12-ex3-q5': 'pleasure', 'd12-ex3-q6': 'to meet you'
        };
        let correctCount = 0;
        const feedbackDiv = document.getElementById('feedback-d12-ex3');

        for (const id in answers) {
            const input = document.getElementById(id);
            // Case-insensitive check
            const correctValue = answers[id].toLowerCase().replace(/['s]/g, ''); 
            const userValue = input.value.trim().toLowerCase().replace(/['s]/g, '');

            // Using includes for flexibility in multi-word phrases and common variations
            const isCorrect = userValue === correctValue || 
                              (id === 'd12-ex3-q2' && userValue.includes('a pleasure')) || 
                              (id === 'd12-ex3-q6' && userValue.includes('to meet you'));

            if (isCorrect) {
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