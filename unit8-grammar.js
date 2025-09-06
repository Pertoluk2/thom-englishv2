document.addEventListener('DOMContentLoaded', () => {
    // Taak 1: Put the words in the correct order
    const rearrangeContainer = document.getElementById('rearrange-container-g1');
    const checkBtnG1 = document.getElementById('check-g1');
    const feedbackG1 = document.getElementById('feedback-g1');

    rearrangeContainer.querySelectorAll('.rearrange-item').forEach(item => {
        const pool = item.querySelector('.word-pool');
        const dropZone = item.querySelector('.sentence-drop-zone');

        pool.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.textContent.trim());
            setTimeout(() => {
                e.target.classList.add('dragging');
            }, 0);
        });

        pool.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        pool.addEventListener('dragleave', (e) => {
            e.preventDefault();
        });

        pool.addEventListener('drop', (e) => {
            e.preventDefault();
            const wordElement = document.querySelector(`.draggable-word-tile.dragging`);
            pool.appendChild(wordElement);
            wordElement.classList.remove('dragging');
        });

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });

        dropZone.addEventListener('dragleave', (e) => {
            dropZone.classList.remove('drag-over');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            const draggedWord = e.dataTransfer.getData('text/plain');
            const wordElement = document.querySelector(`.draggable-word-tile.dragging`);
            
            const currentContent = dropZone.innerHTML.trim();
            if (currentContent) {
                // Voeg een spatie toe voordat het nieuwe woord wordt toegevoegd
                dropZone.innerHTML += ' ' + draggedWord;
            } else {
                dropZone.innerHTML = draggedWord;
            }
            
            wordElement.remove();
        });
    });

    checkBtnG1.addEventListener('click', () => {
        let allCorrect = true;
        rearrangeContainer.querySelectorAll('.rearrange-item').forEach(item => {
            const dropZone = item.querySelector('.sentence-drop-zone');
            const userAnswer = dropZone.textContent.trim();
            const correctAnswer = dropZone.dataset.correct;

            if (userAnswer === correctAnswer) {
                dropZone.classList.add('correct');
                dropZone.classList.remove('incorrect');
            } else {
                dropZone.classList.add('incorrect');
                dropZone.classList.remove('correct');
                allCorrect = false;
            }
        });

        if (allCorrect) {
            feedbackG1.textContent = 'Correct! All sentences are in the right order.';
            feedbackG1.style.color = 'green';
        } else {
            feedbackG1.textContent = 'Incorrect. Please review your answers.';
            feedbackG1.style.color = 'red';
        }
    });

    // Taak 2: Fill in the gap using "Do" or "Does"
    document.getElementById('check-g2').addEventListener('click', () => {
        const correctAnswers = {
            'g2-q1': 'do',
            'g2-q2': 'does',
            'g2-q3': 'does',
            'g2-q4': 'do',
            'g2-q5': 'do',
            'g2-q6': 'does',
            'g2-q7': 'do'
        };
        let correctCount = 0;
        const feedback = document.getElementById('feedback-g2');
        let allCorrect = true;
        for (const q in correctAnswers) {
            const radios = document.getElementsByName(q);
            let isCorrect = false;
            radios.forEach(radio => {
                const parentSpan = radio.closest('.options-group-inline');
                if (radio.checked) {
                    if (radio.value === correctAnswers[q]) {
                        isCorrect = true;
                        parentSpan.style.border = '2px solid green';
                    } else {
                        parentSpan.style.border = '2px solid red';
                    }
                } else {
                    parentSpan.style.border = 'none';
                }
            });
            if (isCorrect) {
                correctCount++;
            } else {
                allCorrect = false;
            }
        }
        if (allCorrect) {
            feedback.textContent = `Correct! All answers are correct.`;
            feedback.style.color = 'green';
        } else {
            feedback.textContent = `You got ${correctCount} out of ${Object.keys(correctAnswers).length} correct.`;
            feedback.style.color = 'red';
        }
    });

    // Taak 3: Cross out the incorrect word in each question (aangepaste versie)
    const checkBtnG3 = document.getElementById('check-g3');
    const feedbackG3 = document.getElementById('feedback-g3');
    
    checkBtnG3.addEventListener('click', () => {
        const correctAnswers = {
            'g3-q1': 'What',
            'g3-q2': 'Where',
            'g3-q3': 'What',
            'g3-q4': 'How',
            'g3-q5': 'Why',
            'g3-q6': 'When',
            'g3-q7': 'Who',
            'g3-q8': 'What'
        };

        let correctCount = 0;
        let allAnswered = true;

        for (const q in correctAnswers) {
            const radios = document.getElementsByName(q);
            let isCorrect = false;
            let answered = false;

            radios.forEach(radio => {
                if (radio.checked) {
                    answered = true;
                    if (radio.value === correctAnswers[q]) {
                        isCorrect = true;
                    }
                }
            });

            if (!answered) {
                allAnswered = false;
            } else {
                radios.forEach(radio => {
                    const parentSpan = radio.closest('.options-group-inline');
                    if (isCorrect) {
                        parentSpan.style.border = '2px solid green';
                    } else {
                        parentSpan.style.border = '2px solid red';
                    }
                });
                if (isCorrect) {
                    correctCount++;
                }
            }
        }

        if (!allAnswered) {
            feedbackG3.textContent = 'Please answer all questions before checking.';
            feedbackG3.style.color = 'red';
        } else if (correctCount === Object.keys(correctAnswers).length) {
            feedbackG3.textContent = 'Perfect! All answers are correct.';
            feedbackG3.style.color = 'green';
        } else {
            feedbackG3.textContent = `You got ${correctCount} out of ${Object.keys(correctAnswers).length} correct.`;
            feedbackG3.style.color = 'red';
        }
    });
});