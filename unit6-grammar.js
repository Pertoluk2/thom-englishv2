document.addEventListener('DOMContentLoaded', () => {
    const u6b1_data = [
        { term: "1. Can I help you?", id: "u6b1_q1", answerId: "u6b1_a1", meaning: "c. I'm just looking around. Thank you." },
        { term: "2. Are you looking for anything in particular?", id: "u6b1_q2", answerId: "u6b1_a2", meaning: "f. Yes, I'm looking for a new laptop." },
        { term: "3. Where can I find printers?", id: "u6b1_q3", answerId: "u6b1_a3", meaning: "e. Printers are usually in the electronics or office supplies section." },
        { term: "4. Is there any discount on this projector?", id: "u6b1_q4", answerId: "u6b1_a4", meaning: "a. The price is $295, but we can offer a discount of 20%." },
        { term: "5. How much is this office chair?", id: "u6b1_q5", answerId: "u6b1_a5", meaning: "h. It's $37." },
        { term: "6. Do you have this laptop in a different color?", id: "u6b1_q6", answerId: "u6b1_a6", meaning: "b. Let me check if other colors are available for this model." },
        { term: "7. Is there a warranty on this product?", id: "u6b1_q7", answerId: "u6b1_a7", meaning: "d. Yes, this product comes with a 1-year warranty." },
        { term: "8. Would you like to pay by cash or credit card?", id: "u6b1_q8", answerId: "u6b1_a8", meaning: "g. I'll pay by credit card." }
    ];

    const u6b1_container = document.getElementById('u6-b1-container');
    const u6b1_checkBtn = document.getElementById('check-u6-b1');
    const u6b1_resetBtn = document.getElementById('reset-u6-b1');
    let u6b1_selectedTerm = null;
    let u6b1_userPairs = {};

    function initialize_u6b1() {
        u6b1_selectedTerm = null;
        u6b1_userPairs = {};
        if (!u6b1_container) return;
        u6b1_container.innerHTML = `<div id="u6b1_terms"></div><div id="u6b1_meanings"></div>`;
        const termsCol = document.getElementById('u6b1_terms');
        const meaningsCol = document.getElementById('u6b1_meanings');
        
        u6b1_data.forEach(item => {
            termsCol.innerHTML += `<div class="match-item" id="${item.id}">${item.term}</div>`;
        });

        const shuffledMeanings = [...u6b1_data].sort(() => Math.random() - 0.5);
        shuffledMeanings.forEach(item => {
            meaningsCol.innerHTML += `<div class="match-item" id="${item.answerId}">${item.meaning}</div>`;
        });

        u6b1_container.querySelectorAll('.match-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const clickedItem = e.currentTarget;
                if (termsCol.contains(clickedItem)) {
                    if (clickedItem.classList.contains('paired')) return;
                    const currentSelected = u6b1_container.querySelector('.match-item.selected');
                    if (currentSelected) currentSelected.classList.remove('selected');
                    clickedItem.classList.add('selected');
                    u6b1_selectedTerm = clickedItem;
                } else {
                    if (!u6b1_selectedTerm || clickedItem.classList.contains('paired')) return;
                    const termId = u6b1_selectedTerm.id;
                    const meaningId = clickedItem.id;
                    for(const t_id in u6b1_userPairs) {
                        if (u6b1_userPairs[t_id] === meaningId || t_id === termId) {
                            document.getElementById(t_id)?.classList.remove('paired', 'pair-' + (Object.keys(u6b1_userPairs).indexOf(t_id) % 8));
                            document.getElementById(u6b1_userPairs[t_id])?.classList.remove('paired', 'pair-' + (Object.keys(u6b1_userPairs).indexOf(t_id) % 8));
                            delete u6b1_userPairs[t_id];
                        }
                    }
                    u6b1_userPairs[termId] = meaningId;
                    const pairIndex = Object.keys(u6b1_userPairs).indexOf(termId) % 8;
                    u6b1_selectedTerm.className = 'match-item paired pair-' + pairIndex;
                    clickedItem.className = 'match-item paired pair-' + pairIndex;
                    u6b1_selectedTerm = null;
                }
            });
        });
    }

    if(u6b1_checkBtn) {
        u6b1_checkBtn.addEventListener('click', () => {
            u6b1_data.forEach(item => {
                const termEl = document.getElementById(item.id);
                const userChoiceId = u6b1_userPairs[item.id];
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
    if(u6b1_resetBtn) u6b1_resetBtn.addEventListener('click', initialize_u6b1);
    initialize_u6b1();
});