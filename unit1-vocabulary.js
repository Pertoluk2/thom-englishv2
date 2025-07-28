document.addEventListener('DOMContentLoaded', () => {
    
    // --- LOGICA VOOR OEFENING 1: DRAG AND DROP ---

    const dndWords = [
        { word: 'province', category: 'Hometown' }, { word: 'traveling', category: 'Hobbies' },
        { word: 'hardworking', category: 'Strengths' }, { word: 'organized', category: 'Strengths' },
        { word: 'shy', category: 'Weakness' }, { word: 'forgetful', category: 'Weakness' },
        { word: 'position', category: 'Occupation' }, { word: 'countryside', category: 'Hometown' },
        { word: 'responsibilities', category: 'Occupation' }, { word: 'impatient', category: 'Weakness' },
        { word: 'playing sports', category: 'Hobbies' }, { word: 'city', category: 'Hometown' },
        { word: 'company', category: 'Occupation' }, { word: 'overthinking', category: 'Weakness' },
        { word: 'creative', category: 'Strengths' }
    ];
    const dndCategories = ['Occupation', 'Hometown', 'Hobbies', 'Strengths', 'Weakness'];

    const wordBank = document.getElementById('word-bank');
    const categoriesContainer = document.getElementById('categories-container');
    const checkDndButton = document.getElementById('check-dnd-button');
    const resetDndButton = document.getElementById('reset-dnd-button');

    function initializeDnd() {
        if (!wordBank || !categoriesContainer) return;
        wordBank.innerHTML = '';
        categoriesContainer.innerHTML = '';

        dndWords.sort(() => Math.random() - 0.5).forEach(item => {
            const wordDiv = document.createElement('div');
            wordDiv.id = `word-${item.word.replace(/\s/g, '-')}`;
            wordDiv.className = 'word';
            wordDiv.draggable = true;
            wordDiv.textContent = item.word;
            wordDiv.dataset.category = item.category;
            wordBank.appendChild(wordDiv);
            wordDiv.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', e.target.id); setTimeout(() => e.target.classList.add('dragging'), 0); });
            wordDiv.addEventListener('dragend', e => { e.target.classList.remove('dragging'); });
        });

        dndCategories.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category-box';
            categoryDiv.dataset.categoryName = category;
            categoryDiv.innerHTML = `<h3>${category}</h3>`;
            categoriesContainer.appendChild(categoryDiv);
            categoryDiv.addEventListener('dragover', e => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); });
            categoryDiv.addEventListener('dragleave', e => e.currentTarget.classList.remove('drag-over'));
            categoryDiv.addEventListener('drop', e => {
                e.preventDefault();
                e.currentTarget.classList.remove('drag-over');
                const wordId = e.dataTransfer.getData('text/plain');
                const draggedWord = document.getElementById(wordId);
                if (draggedWord) e.currentTarget.appendChild(draggedWord);
            });
        });
    }

    if (checkDndButton) {
        checkDndButton.addEventListener('click', () => {
            document.querySelectorAll('.word').forEach(wordDiv => {
                const parentCategoryBox = wordDiv.closest('.category-box');
                const parentCategory = parentCategoryBox ? parentCategoryBox.dataset.categoryName : null;
                const correctCategory = wordDiv.dataset.category;
                
                wordDiv.classList.remove('correct', 'incorrect');
                
                if (parentCategory && parentCategory === correctCategory) {
                    wordDiv.classList.add('correct');
                } else if (parentCategory) {
                    wordDiv.classList.add('incorrect');
                }
            });
        });
    }

    if (resetDndButton) {
        resetDndButton.addEventListener('click', initializeDnd);
    }
    
    // --- LOGICA VOOR OEFENING 2: CLICK TO FILL ---
    
    const fillInSentences = [
        { text: "I work as an ___ in a big company.", answer: "engineer" }, { text: "My ___ is Hanoi. It's a beautiful and busy city.", answer: "hometown" },
        { text: "In my free time, I enjoy playing ___ with my friends.", answer: "soccer" }, { text: "I'm very ___ and always try my best to complete my tasks on time.", answer: "hardworking" },
        { text: "I feel a bit ___ when speaking in front of many people.", answer: "shy" }, { text: "My mother is a ___. She has been teaching for over 10 years.", answer: "teacher" },
        { text: "I love to ___ to new places and explore different cultures.", answer: "travel" }, { text: "Sometimes I'm quite ___ and forget important things.", answer: "forgetful" },
        { text: "One of my favorite hobbies is ___. I love preparing delicious meals.", answer: "cooking" }, { text: "I think I'm quite ___ because I always come up with new ideas for projects.", answer: "creative" }
    ];
    
    const fillInContainer = document.getElementById('fill-in-the-blanks-container');
    const fillInWordBox = document.getElementById('fill-in-word-box');
    const checkFillInButton = document.getElementById('check-fill-in-button');
    const feedbackFillIn = document.getElementById('feedback-fill-in');
    let activeInput = null;

    function initializeFillIn() {
        if (!fillInContainer || !fillInWordBox) return;
        const choiceWords = fillInSentences.map(item => item.answer).sort(() => Math.random() - 0.5);
        fillInWordBox.innerHTML = '';
        fillInContainer.innerHTML = '';

        choiceWords.forEach(word => {
            const wordDiv = document.createElement('div');
            wordDiv.className = 'choice-word';
            wordDiv.textContent = word;
            wordDiv.addEventListener('click', () => {
                if (activeInput && !wordDiv.classList.contains('used')) {
                    activeInput.value = word;
                    wordDiv.classList.add('used');
                    
                    // Zoek het vorige gebruikte woord en maak het weer beschikbaar indien nodig
                    const previouslyUsedWord = activeInput.dataset.usedWord;
                    if(previouslyUsedWord) {
                        document.querySelectorAll('.choice-word').forEach(w => {
                            if(w.textContent === previouslyUsedWord) w.classList.remove('used');
                        });
                    }
                    activeInput.dataset.usedWord = word; // Onthoud welk woord is gebruikt

                    activeInput.classList.remove('active');
                    activeInput = null;
                }
            });
            fillInWordBox.appendChild(wordDiv);
        });

        fillInSentences.forEach((sentenceData, index) => {
            const sentenceDiv = document.createElement('div');
            sentenceDiv.className = 'sentence';
            const html = sentenceData.text.replace('___', `<input type="text" id="answer-fill-in-${index}" class="fill-in-input" readonly />`);
            sentenceDiv.innerHTML = `${index + 1}. ${html}`;
            fillInContainer.appendChild(sentenceDiv);
            
            const inputField = sentenceDiv.querySelector('.fill-in-input');
            inputField.addEventListener('click', () => {
                document.querySelectorAll('.fill-in-input.active').forEach(el => el.classList.remove('active'));
                inputField.classList.add('active');
                activeInput = inputField;
            });
        });
    }

if(checkFillInButton) {
        checkFillInButton.addEventListener('click', () => {
            let correctCount = 0;
            fillInSentences.forEach((data, index) => {
                const input = document.getElementById(`answer-fill-in-${index}`);
                input.style.borderBottom = ''; // Reset border
                if (input.value.trim().toLowerCase() === data.answer.toLowerCase()) {
                    correctCount++;
                    input.style.borderBottom = '2px solid green';
                } else {
                    input.style.borderBottom = '2px solid red';
                }
            });
            if(feedbackFillIn) feedbackFillIn.textContent = `Bạn đã trả lời đúng ${correctCount} trên ${fillInSentences.length} câu!`;
        });
    }
    
    // Start de oefeningen
    initializeDnd();
    initializeFillIn();
});