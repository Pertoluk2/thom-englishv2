document.addEventListener('DOMContentLoaded', () => {

    // Task 1: Put the following activities into the correct group.
    const activityMap = {
        "Check-in Counter": ["show your passport and ticket", "weigh and put luggage on the scale", "pay for extra baggage or other services", "choose a seat (window or aisle)"],
        "Security Check": ["take off shoes, belts, and outerwear", "take liquids out of bags for inspection", "place bags on the conveyor belt for scanning", "check pockets for small items (keys, coins, etc.)"],
        "On the Plane": ["sleep or rest during the flight", "order food and drinks", "listen to safety instructions or watch a safety video", "put luggage in the overhead bin or under the seat"],
        "At Customs Counter": ["answer questions from customs officers", "declare items you are bringing into the country"]
    };

    const wordBank = document.getElementById('u11t1-word-bank');
    const categories = document.querySelectorAll('#u11t1-categories .category-box');
    const checkBtn = document.getElementById('check-u11t1');
    const feedback = document.getElementById('feedback-u11t1');

    function setupDragAndDrop() {
        document.querySelectorAll('.draggable-word').forEach(word => {
            word.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.word);
                e.target.classList.add('dragging');
            });
            word.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
            });
        });

        categories.forEach(categoryBox => {
            const wordList = categoryBox.querySelector('.word-list');

            categoryBox.addEventListener('dragover', (e) => {
                e.preventDefault();
                categoryBox.classList.add('drag-over');
            });

            categoryBox.addEventListener('dragleave', (e) => {
                categoryBox.classList.remove('drag-over');
            });

            categoryBox.addEventListener('drop', (e) => {
                e.preventDefault();
                categoryBox.classList.remove('drag-over');
                const draggedWordText = e.dataTransfer.getData('text/plain');
                const draggedWordElement = document.querySelector(`.draggable-word[data-word="${draggedWordText}"]`);
                
                // Clone the dragged element to place in the list, removing the original
                const newElement = draggedWordElement.cloneNode(true);
                newElement.draggable = false;
                newElement.classList.remove('dragging');
                newElement.classList.add('dropped-word');
                
                wordList.appendChild(newElement);
                draggedWordElement.remove();
            });
        });

        // Add drop functionality back to the original word bank (for resetting)
        wordBank.addEventListener('dragover', (e) => e.preventDefault());
        wordBank.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggedWordText = e.dataTransfer.getData('text/plain');
            const draggedWordElement = document.querySelector(`.draggable-word[data-word="${draggedWordText}"]`);
            wordBank.appendChild(draggedWordElement);
        });
    }

    checkBtn.addEventListener('click', () => {
        let correctCount = 0;
        let totalWords = 0;
        let allCorrect = true;

        categories.forEach(categoryBox => {
            const categoryName = categoryBox.dataset.category;
            const correctWords = activityMap[categoryName];
            const droppedWords = categoryBox.querySelectorAll('.dropped-word');
            
            categoryBox.classList.remove('correct', 'incorrect');
            totalWords += correctWords.length;

            let categoryCorrect = true;
            if (droppedWords.length !== correctWords.length) {
                categoryCorrect = false;
            } else {
                const droppedTexts = Array.from(droppedWords).map(w => w.dataset.word.trim());
                
                // Check if all dropped words are in the correct list
                droppedTexts.forEach(droppedText => {
                    if (correctWords.includes(droppedText)) {
                        correctCount++;
                    } else {
                        categoryCorrect = false;
                    }
                });
            }

            if (categoryCorrect) {
                categoryBox.classList.add('correct');
            } else {
                categoryBox.classList.add('incorrect');
                allCorrect = false;
            }
        });
        
        // This check is imperfect due to the cloning/removing logic, a full reset/check is hard.
        // We focus on whether all words were correctly placed.
        const totalDropped = document.querySelectorAll('#u11t1-categories .dropped-word').length;

        if (totalDropped === totalWords && allCorrect) {
            feedback.textContent = 'Tuyệt vời! Tất cả các hoạt động đã được sắp xếp đúng.';
            feedback.style.color = 'green';
        } else {
            feedback.textContent = `Có lỗi. Số lượng từ đúng: ${correctCount}/${totalWords}. Vui lòng kiểm tra lại.`;
            feedback.style.color = 'red';
        }
    });
    
    setupDragAndDrop();
});