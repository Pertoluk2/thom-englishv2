document.addEventListener('DOMContentLoaded', () => {
    // --- DAY 1, EXERCISE 2: What does each person do? ---
    const d1e2_answers = ["musician", "bellhop", "chauffeur", "technician", "photographer", "waitress"];
    const d1e2_options = [
        ["musician", "manager"], ["manager", "bellhop"], ["TV producer", "chauffeur"],
        ["technician", "secretary"], ["reporter", "photographer"], ["cashier", "waitress"]
    ];
    const d1e2_container = document.getElementById('u7wb-d1-e2-container');
    if (d1e2_container) {
        d1e2_container.innerHTML = '';
        d1e2_answers.forEach((ans, i) => {
            d1e2_container.innerHTML += `<div class="question-block"><p class="question-text">${i + 1}.</p><div class="options-group"><label><input type="radio" name="d1e2_q${i}" value="${d1e2_options[i][0]}"> ${d1e2_options[i][0]}</label><label><input type="radio" name="d1e2_q${i}" value="${d1e2_options[i][1]}"> ${d1e2_options[i][1]}</label></div></div>`;
        });
        document.getElementById('check-u7wb-d1-e2').addEventListener('click', () => {
            d1e2_answers.forEach((ans, i) => {
                const block = d1e2_container.children[i];
                const selected = document.querySelector(`input[name="d1e2_q${i}"]:checked`);
                block.classList.remove('correct-q', 'incorrect-q');
                if (selected && selected.value === ans) block.classList.add('correct-q'); else block.classList.add('incorrect-q');
            });
        });
    }

    // --- DAY 1, EXERCISE 3: Listen again and choose ---
    const d1e3_answers = ["b", "b", "b", "a", "b", "b"];
    const d1e3_questions = [
        { q: "1. He...", opts: ["does not have a lot of experience", "has been working there awhile", "works at a theater"]},
        { q: "2. He...", opts: ["works in the manager's office", "meets interesting people", "hates the work"]},
        { q: "3. He...", opts: ["sees the TV producer every day", "helps with movie productions", "doesn't know how to drive"]},
        { q: "4. She...", opts: ["thinks the salary is good", "is looking for another job", "likes her co-workers"]},
        { q: "5. He...", opts: ["works for a magazine", "writes about sports news", "isn't famous"]},
        { q: "6. She...", opts: ["works there only part time", "is a waitress", "likes the restaurant's food"]}
    ];
    const d1e3_container = document.getElementById('u7wb-d1-e3-container');
    if (d1e3_container) {
        d1e3_container.innerHTML = '';
        d1e3_questions.forEach((q_data, i) => {
            d1e3_container.innerHTML += `<div class="question-block"><p class="question-text">${q_data.q}</p><div class="options-group"><label><input type="radio" name="d1e3_q${i}" value="a"> ${q_data.opts[0]}</label><label><input type="radio" name="d1e3_q${i}" value="b"> ${q_data.opts[1]}</label><label><input type="radio" name="d1e3_q${i}" value="c"> ${q_data.opts[2]}</label></div></div>`;
        });
        document.getElementById('check-u7wb-d1-e3').addEventListener('click', () => {
            d1e3_answers.forEach((ans, i) => {
                const block = d1e3_container.children[i];
                const selected = document.querySelector(`input[name="d1e3_q${i}"]:checked`);
                block.classList.remove('correct-q', 'incorrect-q');
                if (selected && selected.value === ans) block.classList.add('correct-q'); else block.classList.add('incorrect-q');
            });
        });
    }

    // --- DAY 2, EXERCISE 1: Match person to job ---
    const d2e1_data = [
        { term: "1. Sharon", id: "d2e1_q1", answerId: "d2e1_a1", meaning: "a. a waiter" },
        { term: "2. Tom", id: "d2e1_q2", answerId: "d2e1_a2", meaning: "d. a chef" },
        { term: "3. Nina", id: "d2e1_q3", answerId: "d2e1_a3", meaning: "e. a writer" },
        { term: "4. Bruce", id: "d2e1_q4", answerId: "d2e1_a4", meaning: "c. a bellhop" },
        { term: "5. Laura", id: "d2e1_q5", answerId: "d2e1_a5", meaning: "b. a photographer" }
    ];
    const d2e1_container = document.getElementById('u7wb-d2-e1-container');
    if (d2e1_container) {
        let selectedTerm = null, userPairs = {};
        const checkBtn = document.getElementById('check-u7wb-d2-e1');
        const resetBtn = document.getElementById('reset-u7wb-d2-e1');
        
        function init_d2e1() {
            selectedTerm = null; userPairs = {};
            d2e1_container.innerHTML = `<div id="d2e1_terms"></div><div id="d2e1_meanings"></div>`;
            const termsCol = document.getElementById('d2e1_terms');
            const meaningsCol = document.getElementById('d2e1_meanings');
            d2e1_data.forEach(item => termsCol.innerHTML += `<div class="match-item" id="${item.id}">${item.term}</div>`);
            const shuffled = [...d2e1_data].sort(() => 0.5 - Math.random());
            shuffled.forEach(item => meaningsCol.innerHTML += `<div class="match-item" id="${item.answerId}">${item.meaning}</div>`);

            d2e1_container.querySelectorAll('.match-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    const el = e.currentTarget;
                    if (termsCol.contains(el)) {
                        if (el.classList.contains('paired')) return;
                        const current = d2e1_container.querySelector('.match-item.selected');
                        if (current) current.classList.remove('selected');
                        el.classList.add('selected');
                        selectedTerm = el;
                    } else {
                        if (!selectedTerm || el.classList.contains('paired')) return;
                        const termId = selectedTerm.id;
                        const meaningId = el.id;
                        userPairs[termId] = meaningId;
                        const pairIndex = Object.keys(userPairs).length;
                        selectedTerm.className = `match-item paired pair-${pairIndex}`;
                        el.className = `match-item paired pair-${pairIndex}`;
                        selectedTerm = null;
                    }
                });
            });
        }
        if(checkBtn) checkBtn.addEventListener('click', () => {
             d2e1_data.forEach(item => {
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
        if(resetBtn) resetBtn.addEventListener('click', init_d2e1);
        init_d2e1();
    }


    // --- DAY 2, EXERCISE 2: T/F/NG ---
    const d2e2_answers = ["T", "T", "F", "T", "NG", "NG"];
    const d2e2_container = document.getElementById('u7wb-d2-e2-container');
    if (d2e2_container) {
        d2e2_container.innerHTML = '';
        const questions = [
            "Silvia has worked for three employers so far.", 
            "Her first job was boring.", 
            "She worked there for six months.", 
            "Silvia worked in a bar while she was studying.", 
            "She only worked in the evenings.", 
            "She was working as an intern until recently."
        ];
        questions.forEach((q, i) => {
            d2e2_container.innerHTML += `<div class="question-block"><p class="question-text">${i + 1}. ${q}</p><div class="options-group"><label><input type="radio" name="d2e2_q${i}" value="T"> T</label><label><input type="radio" name="d2e2_q${i}" value="F"> F</label><label><input type="radio" name="d2e2_q${i}" value="NG"> NG</label></div></div>`;
        });
        document.getElementById('check-u7wb-d2-e2').addEventListener('click', () => {
            d2e2_answers.forEach((ans, i) => {
                const block = d2e2_container.children[i];
                const selected = document.querySelector(`input[name="d2e2_q${i}"]:checked`);
                block.classList.remove('correct-q', 'incorrect-q');
                if (selected && selected.value === ans) {
                    block.classList.add('correct-q');
                } else {
                    block.classList.add('incorrect-q');
                }
            });
        });
    }
});