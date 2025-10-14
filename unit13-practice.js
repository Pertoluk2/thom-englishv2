document.addEventListener('DOMContentLoaded', () => {

    // Task 1: Listen and fill in the blanks (Job Responsibilities Dialogue).
    document.getElementById('check-u13p1').addEventListener('click', () => {
        const answers = {
            'u13p1-q1': 'what do you do', 
            'u13p1-q2': 'personal assistant', 
            'u13p1-q3': 'appointments', 
            'u13p1-q4': 'travels',
            'u13p1-q5': 'travel', 
            'u13p1-q6': 'responsible for', 
            'u13p1-q7': 'minutes',
            'u13p1-q8': 'visitors'
        };
        let correctCount = 0;
        const feedbackDiv = document.getElementById('feedback-u13p1');
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

    // Task 2: True or False
    document.getElementById('check-u13p2').addEventListener('click', () => {
        const correctAnswers = {
            1: 'True', // Jasmine is a personal assistant and handles many tasks
            2: 'False', // She takes the minutes, she does not run the meetings
            3: 'False', // "No, not usually. I stay here..."
            4: 'True' // "look after visitors to the company" (implied by "deal with any problems")
        };
        let correctCount = 0;
        const totalQuestions = Object.keys(correctAnswers).length;

        for (const qNum in correctAnswers) {
            const selected = document.querySelector(`input[name="u13p2-q${qNum}"]:checked`);
            
            const row = document.querySelector(`#u13p2-container tr[data-statement="${qNum}"]`);
            if (row) {
                row.querySelectorAll('td').forEach(cell => cell.style.backgroundColor = '');
            }

            if (selected) {
                const selectedCell = selected.closest('td');
                if (selected.value === correctAnswers[qNum]) {
                    selectedCell.style.backgroundColor = 'lightgreen';
                    correctCount++;
                } else {
                    selectedCell.style.backgroundColor = 'lightcoral';
                    // Markeer het correcte antwoord (de andere cel)
                    const otherCell = row.querySelector(`td[data-answer="${correctAnswers[qNum]}"]`);
                    if (otherCell) otherCell.style.backgroundColor = 'lightgoldenrodyellow';
                }
            }
        }
        
        const feedbackDiv = document.getElementById('feedback-u13p2');
        if (correctCount === totalQuestions) {
            feedbackDiv.textContent = 'Tuyệt vời! Tất cả các câu đều đúng.';
            feedbackDiv.style.color = 'green';
        } else {
            feedbackDiv.textContent = `Bạn đã trả lời đúng ${correctCount} op ${totalQuestions} câu. Vui lòng thử lại.`;
            feedbackDiv.style.color = 'red';
        }
    });

    // Initial setup to inject radio buttons for T/F
    const injectRadioButtons = (containerId, numQuestions) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        for (let i = 1; i <= numQuestions; i++) {
            const row = container.querySelector(`tr[data-statement="${i}"]`);
            if (!row) continue;

            const trueCell = row.querySelector('td[data-answer="True"]');
            const falseCell = row.querySelector('td[data-answer="False"]');

            if (trueCell) trueCell.innerHTML = `<input type="radio" name="u13p2-q${i}" value="True">`;
            if (falseCell) falseCell.innerHTML = `<input type="radio" name="u13p2-q${i}" value="False">`;
        }
    };

    injectRadioButtons('u13p2-container', 4);
});