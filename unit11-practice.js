document.addEventListener('DOMContentLoaded', () => {

    // Task 1: Listen and fill in the blanks (Check-in Dialogue).
    document.getElementById('check-u11p1').addEventListener('click', () => {
        const answers = {
            'u11p1-q1': 'see your passport and ticket', 
            'u11p1-q2': 'flying', 
            'u11p1-q3': 'going to London', 
            'u11p1-q4': 'checking any bags',
            'u11p1-q5': 'place your bag on the scale', 
            'u11p1-q6': 'weight requirement', 
            'u11p1-q7': 'carry-on bag',
            'u11p1-q8': 'a window seat',
            'u11p1-q9': 'the window',
            'u11p1-q10': 'boarding pass',
            'u11p1-q11': 'Gate 54',
            'u11p1-q12': 'in advance',
            'u11p1-q13': 'You\'re welcome'
        };
        let correctCount = 0;
        const feedbackDiv = document.getElementById('feedback-u11p1');
        const totalQuestions = Object.keys(answers).length;
        
        for (const id in answers) {
            const input = document.getElementById(id);
            const userAnswer = input.value.trim().toLowerCase().replace(/[,.!]/g, '');
            const correctValue = answers[id].toLowerCase().replace(/[,.!]/g, '');

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