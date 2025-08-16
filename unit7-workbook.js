document.addEventListener('DOMContentLoaded', () => {
    // --- DAY 1, EXERCISE 1: Listen and number ---
    const d1e1_answers = { "waiter": 1, "chef": 2, "bellhop": 3, "photographer": 4, "writer": 5 };
    const d1e1_container = document.getElementById('u7wb-d1-e1-container');
    if (d1e1_container) {
        const items = ["a waiter", "a photographer", "a bellhop", "a chef", "a writer"];
        items.forEach(item => {
            d1e1_container.innerHTML += `<div class="sentence"><input type="text" class="fill-in-input-small" style="width: 30px;" id="d1e1_ans_${item.replace(/ /g, '_')}"> ${item}</div>`;
        });
        document.getElementById('check-u7wb-d1-e1').addEventListener('click', () => {
            for (const [job, number] of Object.entries(d1e1_answers)) {
                const input = document.getElementById(`d1e1_ans_a_${job}`);
                if (input) {
                    input.style.borderBottom = (input.value.trim() == number) ? '2px solid green' : '2px solid red';
                }
            }
        });
    }

    // --- DAY 1, EXERCISE 2 & 3: Listen and choose ---
    const d1e2_answers = ["musician", "bellhop", "chauffeur", "technician", "photographer", "waitress"];
    const d1e3_answers = ["has been working there awhile", "meets interesting people", "helps with movie productions", "thinks the salary is good", "writes about sports news", "is a waitress"];
    const d1e2_container = document.getElementById('u7wb-d1-e2-container');
    const d1e3_container = document.getElementById('u7wb-d1-e3-container');
    if(d1e2_container) { /* Build exercise 2 */ }
    if(d1e3_container) { /* Build exercise 3 */ }


    // --- DAY 2, EXERCISE 1: Match person to job ---
    const d2e1_data = [
        { term: "1. Sharon", id: "d2e1_q1", answerId: "d2e1_a1", meaning: "a. a waiter" },
        { term: "2. Tom", id: "d2e1_q2", answerId: "d2e1_a2", meaning: "d. a chef" },
        { term: "3. Nina", id: "d2e1_q3", answerId: "d2e1_a3", meaning: "e. a writer" },
        { term: "4. Bruce", id: "d2e1_q4", answerId: "d2e1_a4", meaning: "c. a bellhop" },
        { term: "5. Laura", id: "d2e1_q5", answerId: "d2e1_a5", meaning: "b. a photographer" }
    ];
    // Re-use matching game logic
    const d2e1_container = document.getElementById('u7wb-d2-e1-container');
    if(d2e1_container) { /* Build matching game */ }
    
    // --- DAY 2, EXERCISE 2: T/F/NG ---
    const d2e2_answers = ["T", "F", "F", "NG", "NG", "T"];
    const d2e2_container = document.getElementById('u7wb-d2-e2-container');
    if(d2e2_container){
        d2e2_answers.forEach((ans, i) => {
            d2e2_container.innerHTML += `
            <div class="question-block">
                <p class="question-text">${i + 1}.</p>
                <div class="options-group">
                    <label><input type="radio" name="d2e2_q${i}" value="T"> T</label>
                    <label><input type="radio" name="d2e2_q${i}" value="F"> F</label>
                    <label><input type="radio" name="d2e2_q${i}" value="NG"> NG</label>
                </div>
            </div>`;
        });
        document.getElementById('check-u7wb-d2-e2').addEventListener('click', () => {
            d2e2_answers.forEach((ans, i) => {
                const block = d2e2_container.children[i];
                const selected = document.querySelector(`input[name="d2e2_q${i}"]:checked`);
                block.classList.remove('correct-q', 'incorrect-q');
                if (selected && selected.value === ans) block.classList.add('correct-q');
                else block.classList.add('incorrect-q');
            });
        });
    }

    // --- DAY 3, EXERCISE 1: Listen and check ---
    const d3e1_answers = ["b", "a", "b", "a", "b", "a"];
    const d3e1_container = document.getElementById('u7wb-d3-e1-container');
    if(d3e1_container){
        d3e1_answers.forEach((ans, i) => {
             d3e1_container.innerHTML += `
            <div class="question-block">
                <p class="question-text">${i + 1}.</p>
                <div class="options-group">
                    <label><input type="radio" name="d3e1_q${i}" value="a"> a</label>
                    <label><input type="radio" name="d3e1_q${i}" value="b"> b</label>
                </div>
            </div>`;
        });
        document.getElementById('check-u7wb-d3-e1').addEventListener('click', () => {
            d3e1_answers.forEach((ans, i) => {
                const block = d3e1_container.children[i];
                const selected = document.querySelector(`input[name="d3e1_q${i}"]:checked`);
                block.classList.remove('correct-q', 'incorrect-q');
                if (selected && selected.value === ans) block.classList.add('correct-q');
                else block.classList.add('incorrect-q');
            });
        });
    }
});