document.addEventListener('DOMContentLoaded', () => {

    // Task 1: Listen and fill in the blanks (Reception Dialogue).
    document.getElementById('check-u12p1').addEventListener('click', () => {
        const answers = {
            'u12p1-q1': 'can I help you', 
            'u12p1-q2': '9.30', 
            'u12p1-q3': 'your names', 
            'u12p1-q4': 'business card',
            'u12p1-q5': 'call', 
            'u12p1-q6': 'complete', 
            'u12p1-q7': 'form',
            'u12p1-q8': 'Excuse me',
            'u12p1-q9': 'reception',
            'u12p1-q10': 'badges',
            'u12p1-q11': 'come down',
            'u12p1-q12': 'have a seat'
        };
        let correctCount = 0;
        const feedbackDiv = document.getElementById('feedback-u12p1');
        const totalQuestions = Object.keys(answers).length;
        
        for (const id in answers) {
            const input = document.getElementById(id);
            const userAnswer = input.value.trim().toLowerCase().replace(/[.,!]/g, '');
            const correctValue = answers[id].toLowerCase().replace(/[.,!]/g, '');

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
});