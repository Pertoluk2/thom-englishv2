document.addEventListener('DOMContentLoaded', () => {
    
    // Helper function for Drag and Drop (General)
    const setupDragAndDrop = (wordBankId, dropZonesSelector, checkBtnId, feedbackId, answerMap) => {
        const wordBank = document.getElementById(wordBankId);
        const dropZones = document.querySelectorAll(dropZonesSelector);
        const checkBtn = document.getElementById(checkBtnId);
        const feedbackDiv = document.getElementById(feedbackId);

        const allDraggableWords = wordBank.querySelectorAll('.draggable-word');

        allDraggableWords.forEach(word => {
            word.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.word);
                e.target.classList.add('dragging');
            });
            word.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
            });
        });

        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('drag-over'); });
            zone.addEventListener('dragleave', () => { zone.classList.remove('drag-over'); });
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                const draggedWord = e.dataTransfer.getData('text/plain');
                const draggedElement = document.querySelector(`.draggable-word[data-word="${draggedWord}"].dragging`);

                if (zone.children.length === 0) {
                    const newElement = draggedElement.cloneNode(true);
                    newElement.classList.remove('dragging');
                    newElement.draggable = false;
                    zone.appendChild(newElement);
                    draggedElement.style.display = 'none'; // Hide original
                }
            });
        });

        checkBtn.addEventListener('click', () => {
            let correctCount = 0;
            let totalQuestions = dropZones.length;
            let allCorrect = true;

            dropZones.forEach(zone => {
                const droppedWordElement = zone.querySelector('.draggable-word');
                const correctAnswer = zone.dataset.wordAnswer;
                
                zone.classList.remove('correct', 'incorrect');

                if (droppedWordElement) {
                    if (droppedWordElement.dataset.word === correctAnswer) {
                        zone.classList.add('correct');
                        correctCount++;
                    } else {
                        zone.classList.add('incorrect');
                        allCorrect = false;
                    }
                } else {
                    zone.classList.add('incorrect');
                    allCorrect = false;
                }
            });

            if (allCorrect) {
                feedbackDiv.textContent = 'Tuyệt vời! Tất cả các câu trả lời đều đúng.';
                feedbackDiv.style.color = 'green';
            } else {
                feedbackDiv.textContent = `Bạn đã trả lời đúng ${correctCount} trên ${totalQuestions} câu. Vui lòng xem lại.`;
                feedbackDiv.style.color = 'red';
            }
        });
    };
    
    // Task 1 Logic (Matching Game - Drag and Drop)
    setupDragAndDrop('u10g1-word-bank', '#u10g1-conversations .drop-zone', 'check-u10g1', 'feedback-u10g1', {});

    // Task 2: Obligations (Fill in the blanks)
    document.getElementById('check-u10g2').addEventListener('click', () => {
        const answers = {
            'u10g2-q1': ['must', 'have to'],
            'u10g2-q2': ['must not'],
            'u10g2-q3': ['don\'t have to'],
            'u10g2-q4': ['must', 'have to'],
            'u10g2-q5': ['must', 'have to']
        };
        let correctCount = 0;
        const feedbackDiv = document.getElementById('feedback-u10g2');
        const totalQuestions = Object.keys(answers).length;

        for (const id in answers) {
            const input = document.getElementById(id);
            const userAnswer = input.value.trim().toLowerCase().replace(/'/g, '');
            const correctValues = answers[id].map(a => a.replace(/'/g, ''));

            if (correctValues.includes(userAnswer)) {
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