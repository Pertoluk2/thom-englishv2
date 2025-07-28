document.addEventListener('DOMContentLoaded', () => {
    // --- Task 1: Matching ---
    const u6a1_data = [
        { term: "Discount", id: "u6a1_q1", answerId: "u6a1_a1", meaning: "e. A reduction in the usual price of something." },
        { term: "Promotion", id: "u6a1_q2", answerId: "u6a1_a2", meaning: "c. Activities to advertise something." },
        { term: "Cashier", id: "u6a1_q3", answerId: "u6a1_a3", meaning: "a. A person whose job is to receive and pay out money in a shop." },
        { term: "Trolley", id: "u6a1_q4", answerId: "u6a1_a4", meaning: "b. A small vehicle with wheels that you push or pull." },
        { term: "Receipt", id: "u6a1_q5", answerId: "u6a1_a5", meaning: "d. A piece of paper that shows you have paid for something." }
    ];
    const u6a1_container = document.getElementById('u6-a1-container');
    const u6a1_checkBtn = document.getElementById('check-u6-a1');
    const u6a1_resetBtn = document.getElementById('reset-u6-a1');
    let u6a1_selectedTerm = null;
    let u6a1_userPairs = {};

    function initialize_u6a1() {
        u6a1_selectedTerm = null;
        u6a1_userPairs = {};
        if (!u6a1_container) return;
        u6a1_container.innerHTML = `<div id="u6a1_terms"></div><div id="u6a1_meanings"></div>`;
        const termsCol = document.getElementById('u6a1_terms');
        const meaningsCol = document.getElementById('u6a1_meanings');
        
        u6a1_data.forEach((item, index) => {
            termsCol.innerHTML += `<div class="match-item" id="${item.id}">${index + 1}. ${item.term}</div>`;
        });

        const shuffledMeanings = [...u6a1_data].sort(() => Math.random() - 0.5);
        shuffledMeanings.forEach(item => {
            meaningsCol.innerHTML += `<div class="match-item" id="${item.answerId}">${item.meaning}</div>`;
        });

        u6a1_container.querySelectorAll('.match-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const clickedItem = e.currentTarget;
                if (termsCol.contains(clickedItem)) {
                    if (clickedItem.classList.contains('paired')) return;
                    const currentSelected = u6a1_container.querySelector('.match-item.selected');
                    if (currentSelected) currentSelected.classList.remove('selected');
                    clickedItem.classList.add('selected');
                    u6a1_selectedTerm = clickedItem;
                } else {
                    if (!u6a1_selectedTerm || clickedItem.classList.contains('paired')) return;
                    const termId = u6a1_selectedTerm.id;
                    const meaningId = clickedItem.id;
                    for(const t_id in u6a1_userPairs) {
                        if (u6a1_userPairs[t_id] === meaningId || t_id === termId) {
                            document.getElementById(t_id)?.classList.remove('paired', 'pair-' + (Object.keys(u6a1_userPairs).indexOf(t_id) % 8));
                            document.getElementById(u6a1_userPairs[t_id])?.classList.remove('paired', 'pair-' + (Object.keys(u6a1_userPairs).indexOf(t_id) % 8));
                            delete u6a1_userPairs[t_id];
                        }
                    }
                    u6a1_userPairs[termId] = meaningId;
                    const pairIndex = Object.keys(u6a1_userPairs).indexOf(termId) % 8;
                    u6a1_selectedTerm.className = 'match-item paired pair-' + pairIndex;
                    clickedItem.className = 'match-item paired pair-' + pairIndex;
                    u6a1_selectedTerm = null;
                }
            });
        });
    }

    if(u6a1_checkBtn) {
        u6a1_checkBtn.addEventListener('click', () => {
            u6a1_data.forEach(item => {
                const termEl = document.getElementById(item.id);
                const userChoiceId = u6a1_userPairs[item.id];
                if(userChoiceId){
                    const meaningEl = document.getElementById(userChoiceId);
                    termEl.classList.remove('correct', 'incorrect');
                    meaningEl.classList.remove('correct', 'incorrect');
                    if(userChoiceId === item.answerId) {
                        termEl.classList.add('correct');
                        meaningEl.classList.add('correct');
                    } else {
                        termEl.classList.add('incorrect');
                        meaningEl.classList.add('incorrect');
                    }
                }
            });
        });
    }
    if(u6a1_resetBtn) u6a1_resetBtn.addEventListener('click', initialize_u6a1);
    initialize_u6a1();

    // --- Task 2: Click to Fill in the Blanks (BIJGEWERKT) ---
    const u6a2_sentences = [
        { text: "Money in the form of coins or notes (and not a card) is called ___.", answer: "cash" },
        { text: "A person who is buying something in a shop is a ___.", answer: "customer" },
        { text: "The ___ is the place where you pay for things in a supermarket.", answer: "checkout" },
        { text: "A ___ is a small piece of metal money.", answer: "coin" },
        { text: "A ___ has wheels. We push it around a supermarket and put things we want to buy in it.", answer: "trolley" },
        { text: "After we pay for our goods, the shop assistant gives us a ___.", answer: "receipt" }
    ];
    const u6a2_wordbox = document.getElementById('u6-a2-wordbox');
    const u6a2_container = document.getElementById('u6-a2-container');
    const u6a2_checkBtn = document.getElementById('check-u6-a2');
    let u6a2_activeInput = null;

    if(u6a2_container && u6a2_wordbox){
        // Maak de woordenlijst, voeg afleiders toe en schud door elkaar
        const correctWords = u6a2_sentences.map(s => s.answer);
        const distractorWords = ["wallet", "shelf"]; // Nepwoorden
        const allWords = [...correctWords, ...distractorWords].sort(() => Math.random() - 0.5);

        // Bouw de woordendoos
        allWords.forEach(word => {
            const wordDiv = document.createElement('div');
            wordDiv.className = 'choice-word';
            wordDiv.textContent = word;
            wordDiv.addEventListener('click', () => {
                if (u6a2_activeInput && !wordDiv.classList.contains('used')) {
                    u6a2_activeInput.value = word;
                    // Reset 'used' status van het vorige woord in dit veld, indien aanwezig
                    const previouslyUsedWord = u6a2_activeInput.dataset.usedWord;
                     if(previouslyUsedWord) {
                        document.querySelectorAll('#u6-a2-wordbox .choice-word').forEach(w => {
                            if(w.textContent === previouslyUsedWord) w.classList.remove('used');
                        });
                    }
                    wordDiv.classList.add('used');
                    u6a2_activeInput.dataset.usedWord = word;
                    u6a2_activeInput.classList.remove('active');
                    u6a2_activeInput = null;
                }
            });
            u6a2_wordbox.appendChild(wordDiv);
        });

        // Bouw de zinnen
        u6a2_sentences.forEach((s, i) => {
            const sentenceDiv = document.createElement('div');
            sentenceDiv.className = 'sentence';
            const inputHTML = `<input type="text" class="fill-in-input" id="u6a2_ans_${i}" readonly>`;
            sentenceDiv.innerHTML = `${i + 1}. ${s.text.replace('___', inputHTML)}`;
            u6a2_container.appendChild(sentenceDiv);
            
            const inputField = sentenceDiv.querySelector('.fill-in-input');
            inputField.addEventListener('click', () => {
                document.querySelectorAll('.fill-in-input.active').forEach(el => el.classList.remove('active'));
                inputField.classList.add('active');
                u6a2_activeInput = inputField;
            });
        });

        // Check-knop functionaliteit
        u6a2_checkBtn.addEventListener('click', () => {
            u6a2_sentences.forEach((s, i) => {
                const input = document.getElementById(`u6a2_ans_${i}`);
                input.style.borderBottom = (input.value.trim().toLowerCase() === s.answer) ? '2px solid green' : '2px solid red';
            });
        });
    }
});