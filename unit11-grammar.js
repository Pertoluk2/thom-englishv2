document.addEventListener('DOMContentLoaded', () => {

    // Task 1: Rearrange the words
    const checkBtnG1 = document.getElementById('check-u11g1');
    const feedbackG1 = document.getElementById('feedback-u11g1');

    checkBtnG1.addEventListener('click', () => {
        let allCorrect = true;
        const rearrangeItems = document.querySelectorAll('#u11t1-container .rearrange-item');
        
        rearrangeItems.forEach(item => {
            const dropZone = item.querySelector('.sentence-drop-zone');
            const userAnswer = dropZone.textContent.trim().replace(/[.,?]/g, '');
            const correctAnswer = dropZone.dataset.correct.trim().replace(/[.,?]/g, '');

            if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
                dropZone.classList.add('correct');
                dropZone.classList.remove('incorrect');
            } else {
                dropZone.classList.add('incorrect');
                dropZone.classList.remove('correct');
                allCorrect = false;
            }
        });

        if (allCorrect) {
            feedbackG1.textContent = 'Tuyệt vời! Tất cả các câu đều đúng.';
            feedbackG1.style.color = 'green';
        } else {
            feedbackG1.textContent = 'Có lỗi trong sắp xếp. Vui lòng thử lại.';
            feedbackG1.style.color = 'red';
        }
    });

    // Task 2: Tick the correct context (Dynamic Radio Buttons)
    const contextMap = {
        1: 'Check-in Counter',
        2: 'Security Check Counter',
        3: 'Security Check Counter',
        4: 'Check-in Counter',
        5: 'On the plane'
    };
    
    const tableBody = document.querySelector('#u11g2-table tbody');
    let qIndex = 0;

    tableBody.querySelectorAll('tr').forEach(row => {
        qIndex++;
        const qNum = row.dataset.question || qIndex;
        row.querySelectorAll('td').forEach(cell => {
            const context = cell.dataset.context;
            if (context) {
                cell.innerHTML = `<input type="radio" name="u11g2-q${qNum}" value="${context}">`;
            }
        });
    });

    document.getElementById('check-u11g2').addEventListener('click', () => {
        let correctCount = 0;
        const totalQuestions = Object.keys(contextMap).length;

        for (let i = 1; i <= totalQuestions; i++) {
            const correctContext = contextMap[i];
            const selected = document.querySelector(`input[name="u11g2-q${i}"]:checked`);
            
            const row = document.querySelector(`#u11g2-table tr[data-question="${i}"]`);
            if (row) {
                row.querySelectorAll('td').forEach(cell => cell.style.backgroundColor = '');
            }

            if (selected) {
                const selectedCell = selected.closest('td');
                if (selected.value === correctContext) {
                    selectedCell.style.backgroundColor = 'lightgreen';
                    correctCount++;
                } else {
                    selectedCell.style.backgroundColor = 'lightcoral';
                    // Highlight the correct answer
                    const correctCell = document.querySelector(`#u11g2-table tr[data-question="${i}"] td[data-context="${correctContext}"]`);
                    if (correctCell) correctCell.style.backgroundColor = 'lightgoldenrodyellow';
                }
            } else {
                allCorrect = false;
            }
        }
        
        const feedbackDiv = document.getElementById('feedback-u11g2');
        if (correctCount === totalQuestions) {
            feedbackDiv.textContent = 'Tuyệt vời! Tất cả các câu đều đúng.';
            feedbackDiv.style.color = 'green';
        } else {
            feedbackDiv.textContent = `Bạn đã trả lời đúng ${correctCount} trên ${totalQuestions} câu. Vui lòng thử lại.`;
            feedbackDiv.style.color = 'red';
        }
    });
});