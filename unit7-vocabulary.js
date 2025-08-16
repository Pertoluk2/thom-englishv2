document.addEventListener('DOMContentLoaded', () => {
    // --- Task 1: Match department to function ---
    const u7a1_data = [
        { term: "Marketing", id: "u7a1_q1", answerId: "u7a1_a1", meaning: "[deals with promoting products]" },
        { term: "Sales", id: "u7a1_q2", answerId: "u7a1_a2", meaning: "[deals with selling a finished product to outside markets]" },
        { term: "Accounts / Finance", id: "u7a1_q3", answerId: "u7a1_a3", meaning: "[deals with money matters, from paying bills to projecting sales]" },
        { term: "Production", id: "u7a1_q4", answerId: "u7a1_a4", meaning: "[ensures all manufacturing stages run smoothly]" },
        { term: "Human Resources (HR)", id: "u7a1_q5", answerId: "u7a1_a5", meaning: "[deals with employee relations and matters such as hiring staff]" },
        { term: "Research and Development (R&D)", id: "u7a1_q6", answerId: "u7a1_a6", meaning: "[deals with researching and developing future products for a company]" }
    ];
    
    const container = document.getElementById('u7-a1-container');
    const checkBtn = document.getElementById('check-u7-a1');
    const resetBtn = document.getElementById('reset-u7-a1');
    let selectedTerm = null;
    let userPairs = {};

    function initializeGame() {
        selectedTerm = null;
        userPairs = {};
        if (!container) return;
        container.innerHTML = `<div id="u7a1_terms"></div><div id="u7a1_meanings"></div>`;
        const termsCol = document.getElementById('u7a1_terms');
        const meaningsCol = document.getElementById('u7a1_meanings');
        
        u7a1_data.forEach((item, index) => {
            termsCol.innerHTML += `<div class="match-item" id="${item.id}">${index + 1}. ${item.term}</div>`;
        });

        const shuffledMeanings = [...u7a1_data].sort(() => Math.random() - 0.5);
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
            u7a1_data.forEach(item => {
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


    // --- Task 2: Choose the correct word ---
    const u7a2_sentences = [
        { q: "Could you tell me who is in ___ of this department?", a: "charge", options: ["charge", "lead", "head"] },
        { q: "Our company is a leader in the IT ___.", a: "industry", options: ["industry", "business", "field"] },
        { q: "The ___ of the company is located downtown.", a: "headquarters", options: ["headquarters", "main office", "building"] },
        { q: "He was promoted to the ___ of manager.", a: "position", options: ["position", "place", "role"] },
        { q: "Could you ___ a meeting for next Monday?", a: "schedule", options: ["schedule", "make", "put"] }
    ];
    const u7a2_container = document.getElementById('u7-a2-container');
    if(u7a2_container){
        u7a2_sentences.forEach((s, i) => {
            const options = s.options.sort(() => Math.random() - 0.5);
            u7a2_container.innerHTML += `
            <div class="question-block">
                <p class="question-text">${i + 1}. ${s.q.replace('___', '...')}</p>
                <div class="options-group">
                    <label><input type="radio" name="u7a2_q${i}" value="${options[0]}"> ${options[0]}</label>
                    <label><input type="radio" name="u7a2_q${i}" value="${options[1]}"> ${options[1]}</label>
                    <label><input type="radio" name="u7a2_q${i}" value="${options[2]}"> ${options[2]}</label>
                </div>
            </div>`;
        });
         document.getElementById('check-u7-a2').addEventListener('click', () => {
            u7a2_sentences.forEach((s, i) => {
                const block = u7a2_container.children[i];
                const selected = document.querySelector(`input[name="u7a2_q${i}"]:checked`);
                block.classList.remove('correct-q', 'incorrect-q');
                if (selected && selected.value === s.a) block.classList.add('correct-q');
                else block.classList.add('incorrect-q');
            });
        });
    }
});