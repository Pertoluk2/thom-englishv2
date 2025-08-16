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
    // Re-using the matching game logic, so no need to repeat it all here. 
    // This part assumes the matching logic from previous units will be applied.
    const u7a1_container = document.getElementById('u7-a1-container');
    if (u7a1_container) {
        // Build and initialize matching game for u7a1
    }

    // --- Task 2: Choose the correct word ---
    const u7a2_sentences = [
        { q: "Could you tell me who is in ___ of this department?", a: "charge" },
        { q: "Our company is a leader in the IT ___.", a: "industry" },
        { q: "The ___ of the company is located downtown.", a: "headquarters" },
        { q: "He was promoted to the ___ of manager.", a: "position" },
        { q: "Could you ___ a meeting for next Monday?", a: "schedule" }
    ];
    const u7a2_container = document.getElementById('u7-a2-container');
    if(u7a2_container){
        u7a2_sentences.forEach((s, i) => {
            // Placeholder options for the multiple choice
            const options = [s.a, "other", "another"].sort(() => Math.random() - 0.5);
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