document.addEventListener('DOMContentLoaded', () => {

    // Task 1: Match the beginnings of the introductions to the correct endings.
    const u12g1Questions = document.querySelectorAll('#u12g1-beginnings .match-item');
    const u12g1Answers = document.querySelectorAll('#u12g1-endings .match-item');
    let u12g1Selected = [];
    const u12g1Feedback = document.getElementById('feedback-u12g1');

    function handleU12g1MatchClick(e) {
        const item = e.target.closest('.match-item');
        if (!item || item.classList.contains('paired')) return;

        item.classList.toggle('selected');
        if (item.classList.contains('selected')) {
            u12g1Selected.push(item);
        } else {
            u12g1Selected = u12g1Selected.filter(el => el !== item);
        }

        if (u12g1Selected.length === 2) {
            checkU12g1Pair();
        }
    }

    function checkU12g1Pair() {
        const [item1, item2] = u12g1Selected;
        if (item1.dataset.pair === item2.dataset.pair) {
            const pairIndex = item1.dataset.pair.charCodeAt(0) - 'A'.charCodeAt(0);
            const pairClass = `pair-${pairIndex}`;
            
            item1.classList.add('paired', pairClass);
            item2.classList.add('paired', pairClass);
            item1.classList.remove('selected');
            item2.classList.remove('selected');
        } else {
            item1.classList.add('incorrect');
            item2.classList.add('incorrect');
            setTimeout(() => {
                item1.classList.remove('selected', 'incorrect');
                item2.classList.remove('selected', 'incorrect');
            }, 500);
        }
        u12g1Selected = [];
    }

    u12g1Questions.forEach(item => item.addEventListener('click', handleU12g1MatchClick));
    u12g1Answers.forEach(item => item.addEventListener('click', handleU12g1MatchClick));

    document.getElementById('check-u12g1').addEventListener('click', () => {
        const totalItems = u12g1Questions.length + u12g1Answers.length;
        const allPaired = document.querySelectorAll('#matching-game-u12g1 .match-item.paired').length;
        if (allPaired === totalItems) {
            u12g1Feedback.textContent = 'Tuyệt vời! Tất cả các cặp đều đúng.';
            u12g1Feedback.style.color = 'green';
        } else {
            u12g1Feedback.textContent = 'Có lỗi. Vui lòng thử lại.';
            u12g1Feedback.style.color = 'red';
        }
    });
    
    // Task 2: Fill in the blanks with suitable words (Drag and Drop)
    const u12g2CheckBtn = document.getElementById('check-u12g2');
    const u12g2Feedback = document.getElementById('feedback-u12g2');
    const u12g2WordBank = document.getElementById('u12g2-word-bank');
    const u12g2DropZones = document.querySelectorAll('#u12g2-word-bank + ol .drop-zone');

    u12g2WordBank.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('draggable-word')) {
            e.dataTransfer.setData('text/plain', e.target.dataset.word);
            e.target.classList.add('dragging');
        }
    });

    u12g2DropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('drag-over'); });
        zone.addEventListener('dragleave', () => { zone.classList.remove('drag-over'); });
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            const draggedWord = e.dataTransfer.getData('text/plain');
            const draggedElement = document.querySelector(`.draggable-word[data-word="${draggedWord}"].dragging`);

            // Only allow one word per drop zone
            if (zone.children.length === 0) {
                const newElement = draggedElement.cloneNode(true);
                newElement.classList.remove('dragging');
                newElement.draggable = false;
                zone.appendChild(newElement);
                draggedElement.style.display = 'none'; // Hide original
            } else {
                // If zone is full, return the dragged word to the bank
                draggedElement.classList.remove('dragging');
            }
        });
    });

    u12g2CheckBtn.addEventListener('click', () => {
        let correctCount = 0;
        let totalQuestions = u12g2DropZones.length;
        let allFilled = true;

        u12g2DropZones.forEach(zone => {
            const droppedWordElement = zone.querySelector('.draggable-word');
            const correctAnswer = zone.dataset.wordAnswer;

            if (droppedWordElement) {
                if (droppedWordElement.dataset.word === correctAnswer) {
                    zone.classList.add('correct');
                    zone.classList.remove('incorrect');
                    correctCount++;
                } else if (droppedWordElement.dataset.word === 'meet' && correctAnswer === 'meet') {
                    // Special case for 'meet' used twice
                    zone.classList.add('correct');
                    zone.classList.remove('incorrect');
                    correctCount++;
                } else {
                    zone.classList.add('incorrect');
                    zone.classList.remove('correct');
                    allFilled = false;
                }
            } else {
                zone.classList.add('incorrect');
                zone.classList.remove('correct');
                allFilled = false;
            }
        });

        if (correctCount === totalQuestions) {
            u12g2Feedback.textContent = 'Tuyệt vời! Tất cả các câu trả lời đều đúng.';
            u12g2Feedback.style.color = 'green';
        } else {
            u12g2Feedback.textContent = `Bạn đã trả lời đúng ${correctCount} trên ${totalQuestions} câu. Vui lòng xem lại.`;
            u12g2Feedback.style.color = 'red';
        }
    });

    // Initial setup to make words draggable
    document.querySelectorAll('.draggable-word').forEach(word => {
        word.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.dataset.word);
            e.target.classList.add('dragging');
        });
        word.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
            // Show all words again for next drag (simulating re-adding to bank)
            document.querySelectorAll('.draggable-word').forEach(w => w.style.display = 'block');
        });
    });
});