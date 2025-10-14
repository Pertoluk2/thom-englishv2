document.addEventListener('DOMContentLoaded', () => {

    // Task 1: Put the words in the correct order (Rearrange Logic)
    const checkBtnG1 = document.getElementById('check-u9g1');
    const feedbackG1 = document.getElementById('feedback-u9g1');

    checkBtnG1.addEventListener('click', () => {
        let allCorrect = true;
        const rearrangeItems = document.querySelectorAll('#u9g1-container .rearrange-item');
        
        rearrangeItems.forEach(item => {
            const dropZone = item.querySelector('.sentence-drop-zone');
            // Simplified check: compares user input text to the data-correct attribute, ignoring punctuation and case
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

    // Task 2: Choose the correct information based on an online profile
    document.getElementById('check-u9g2').addEventListener('click', () => {
        const correctAnswers = {
            'u9g2-q1': 'Travel', // Although started in hotels, the professional is in the travel industry
            'u9g2-q2': 'A hotel', // Started work in the hotel industry
            'u9g2-q3': 'Excellent', // "I have excellent people skills"
            'u9g2-q4': 'In teams' // "I enjoy working in teams"
        };
        let correctCount = 0;
        const totalQuestions = Object.keys(correctAnswers).length;

        for (const qName in correctAnswers) {
            const selected = document.querySelector(`input[name="${qName}"]:checked`);
            const qElement = document.querySelector(`#${qName}`).closest('li'); // General parent element for styling

            // Reset styling
            document.querySelectorAll(`input[name="${qName}"]`).forEach(radio => {
                radio.closest('.options-group-inline').style.border = '2px solid transparent';
            });

            if (selected) {
                const parentSpan = selected.closest('.options-group-inline');
                if (selected.value === correctAnswers[qName]) {
                    correctCount++;
                    parentSpan.style.border = '2px solid green';
                } else {
                    parentSpan.style.border = '2px solid red';
                }
            }
        }

        const feedbackDiv = document.getElementById('feedback-u9g2');
        if (correctCount === totalQuestions) {
            feedbackDiv.textContent = 'Tuyệt vời! Tất cả các câu trả lời đều đúng.';
            feedbackDiv.style.color = 'green';
        } else {
            feedbackDiv.textContent = `Bạn đã trả lời đúng ${correctCount} trên ${totalQuestions} câu. Vui lòng xem lại.`;
            feedbackDiv.style.color = 'red';
        }
    });

    // Add drag and drop logic to the rearrange items (Task 1)
    document.querySelectorAll('#u9g1-container .rearrange-item').forEach(item => {
        const pool = item.querySelector('.word-pool');
        const dropZone = item.querySelector('.sentence-drop-zone');

        const setupTileEvents = (tile) => {
            tile.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.textContent.trim());
                e.target.classList.add('dragging');
            });
            tile.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
            });
        };

        item.querySelectorAll('.draggable-word-tile').forEach(setupTileEvents);

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
            
            // Haal de oude content op
            const currentContent = dropZone.textContent.trim();
            
            // Voeg het nieuwe woord toe aan de dropZone
            if (currentContent) {
                dropZone.textContent += ' ' + draggedWord;
            } else {
                dropZone.textContent = draggedWord;
            }
            
            // Verwijder het verplaatste element uit de pool
            wordElement.remove();
        });
        
        // Terugplaatsen in de pool (voor zover mogelijk in deze opzet)
        dropZone.addEventListener('dragstart', (e) => {
             // Zorg ervoor dat het verplaatste woord weer terug kan
            e.dataTransfer.setData('text/plain', e.target.textContent.trim());
            e.target.classList.add('dragging');
        });
        
        // Deze logica is complex om in een simpele JS-sjabloon te regelen zonder de HTML/CSS zwaar aan te passen.
        // We laten de gebruiker de hele tekst in de dropzone zetten.
    });
});