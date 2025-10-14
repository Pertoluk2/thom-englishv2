document.addEventListener('DOMContentLoaded', () => {

    // Task 1: True or False (Job Interview based on Unit 9 WB content)
    const checkBtnP1 = document.getElementById('check-u9p1');
    const feedbackP1 = document.getElementById('feedback-u9p1');
    
    // Inject radio buttons for T/F
    const injectRadioButtons = (containerId, numQuestions) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        for (let i = 1; i <= numQuestions; i++) {
            const row = container.querySelector(`tr[data-statement="${i}"]`);
            if (!row) continue;

            const trueCell = row.querySelector('td[data-answer="True"]');
            const falseCell = row.querySelector('td[data-answer="False"]');

            if (trueCell) trueCell.innerHTML = `<input type="radio" name="u9p1-q${i}" value="True">`;
            if (falseCell) falseCell.innerHTML = `<input type="radio" name="u9p1-q${i}" value="False">`;
        }
    };
    injectRadioButtons('u9p1-container', 5);

    checkBtnP1.addEventListener('click', () => {
        const correctAnswers = {
            1: 'False', // "Don't worry, that's normal." suggests nervousness is common, not that she's never interviewed.
            2: 'True', // "I just graduated from university with a degree in marketing."
            3: 'False', // "I also like that you work with big brands."
            4: 'True', // "I'm good at social media and writing."
            5: 'False' // "I love creating new ideas and working with a team."
        };
        let correctCount = 0;
        const totalQuestions = Object.keys(correctAnswers).length;

        for (const qNum in correctAnswers) {
            const selected = document.querySelector(`input[name="u9p1-q${qNum}"]:checked`);
            const row = document.querySelector(`#u9p1-container tr[data-statement="${qNum}"]`);
            
            row.querySelectorAll('td').forEach(cell => cell.style.backgroundColor = '');

            if (selected) {
                const selectedCell = selected.closest('td');
                if (selected.value === correctAnswers[qNum]) {
                    selectedCell.style.backgroundColor = 'lightgreen';
                    correctCount++;
                } else {
                    selectedCell.style.backgroundColor = 'lightcoral';
                    const correctCell = row.querySelector(`td[data-answer="${correctAnswers[qNum]}"]`);
                    if (correctCell) correctCell.style.backgroundColor = 'lightgoldenrodyellow';
                }
            }
        }
        
        if (correctCount === totalQuestions) {
            feedbackP1.textContent = 'Tuyệt vời! Tất cả các câu đều đúng.';
            feedbackP1.style.color = 'green';
        } else {
            feedbackP1.textContent = `Bạn đã trả lời đúng ${correctCount} trên ${totalQuestions} câu. Vui lòng thử lại.`;
            feedbackP1.style.color = 'red';
        }
    });
});