document.addEventListener('DOMContentLoaded', () => {
    // --- Task: Matching ---
    const u7b1_data = [
        { term: "1. Who's in charge of the Sales department?", id: "u7b1_q1", answerId: "u7b1_a1", meaning: "e. Mr. Smith is the head of the Sales department." },
        { term: "2. Which department is responsible for hiring new employees?", id: "u7b1_q2", answerId: "u7b1_a2", meaning: "c. The Human Resources department is in charge of recruitment." },
        { term: "3. What does the Marketing department do?", id: "u7b1_q3", answerId: "u7b1_a3", meaning: "a. They are responsible for promoting our products and services." },
        { term: "4. Who should I talk to about my salary?", id: "u7b1_q4", answerId: "u7b1_a4", meaning: "b. You should speak to someone in the Accounts department." },
        { term: "5. Can you tell me where the IT department is?", id: "u7b1_q5", answerId: "u7b1_a5", meaning: "d. It's on the third floor, at the end of the hallway." }
    ];

    const container = document.getElementById('u7-b1-container');
    const checkBtn = document.getElementById('check-u7-b1');
    const resetBtn = document.getElementById('reset-u7-b1');
    let selectedTerm = null;
    let userPairs = {};

    function initializeGame() {
        selectedTerm = null;
        userPairs = {};
        if (!container) return;
        container.innerHTML = `<div id="u7b1_terms"></div><div id="u7b1_meanings"></div>`;
        const termsCol = document.getElementById('u7b1_terms');
        const meaningsCol = document.getElementById('u7b1_meanings');
        
        u7b1_data.forEach(item => {
            termsCol.innerHTML += `<div class="match-item" id="${item.id}">${item.term}</div>`;
        });

        const shuffledMeanings = [...u7b1_data].sort(() => Math.random() - 0.5);
        shuffledMeanings.forEach(item => {
            meaningsCol.innerHTML += `<div class="match-item" id="${item.answerId}">${item.meaning}</div>`;
        });

        container.querySelectorAll('.match-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const clickedItem = e.currentTarget;
                if (termsCol.contains(clickedItem)) {
                    if (clickedItem.classList.contains('paired')) return;
                    const currentSelected = container.querySelector('.match-item.selected');
                    if (currentSelected) currentSelected.classList.remove('selected');
                    clickedItem.classList.add('selected');
                    selectedTerm = clickedItem;
                } else {
                    if (!selectedTerm || clickedItem.classList.contains('paired')) return;
                    const termId = selectedTerm.id;
                    const meaningId = clickedItem.id;
                    for(const t_id in userPairs) {
                        if (userPairs[t_id] === meaningId || t_id === termId) {
                            document.getElementById(t_id)?.classList.remove('paired', 'pair-' + (Object.keys(userPairs).indexOf(t_id) % 8));
                            document.getElementById(userPairs[t_id])?.classList.remove('paired', 'pair-' + (Object.keys(userPairs).indexOf(t_id) % 8));
                            delete userPairs[t_id];
                        }
                    }
                    userPairs[termId] = meaningId;
                    const pairIndex = Object.keys(userPairs).indexOf(termId) % 8;
                    selectedTerm.className = 'match-item paired pair-' + pairIndex;
                    clickedItem.className = 'match-item paired pair-' + pairIndex;
                    selectedTerm = null;
                }
            });
        });
    }

    if(checkBtn) {
        checkBtn.addEventListener('click', () => {
            u7b1_data.forEach(item => {
                const termEl = document.getElementById(item.id);
                const userChoiceId = userPairs[item.id];
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
    if(resetBtn) resetBtn.addEventListener('click', initializeGame);
    initializeGame();
});