document.addEventListener('DOMContentLoaded', () => {
    // --- Task 1: Listen and choose the correct word ---
    const u7c1_data = [
        { q: "A: Who's in charge of the ___ department?", options: ["Sales", "Marketing"], answer: "Sales" },
        { q: "B: Mr. Smith is the head of the Sales department.", options: [], answer: "" },
        { q: "A: Which department is responsible for ___ new employees?", options: ["hiring", "firing"], answer: "hiring" },
        { q: "B: The Human Resources department is in charge of recruitment.", options: [], answer: "" },
        { q: "A: What does the Marketing department do?", options: [], answer: "" },
        { q: "B: They are responsible for ___ our products and services.", options: ["promoting", "selling"], answer: "promoting" },
        { q: "A: Who should I talk to about my ___?", options: ["salary", "computer"], answer: "salary" },
        { q: "B: You should speak to someone in the Accounts department.", options: [], answer: "" },
        { q: "A: Can you tell me where the IT department is?", options: [], answer: "" },
        { q: "B: It's on the ___ floor, at the end of the hallway.", options: ["third", "first"], answer: "third" }
    ];

    const u7c1_container = document.getElementById('u7-c1-container');
    if (u7c1_container) {
        let html = '<div class="conversation">';
        u7c1_data.forEach((line, index) => {
            if (line.options.length > 0) {
                let optionsHTML = line.options.map(opt => `<label><input type="radio" name="u7c1_q${index}" value="${opt}"> ${opt}</label>`).join('');
                html += `<p>${line.q.replace('___', `<span class="options-group-inline">${optionsHTML}</span>`)}</p>`;
            } else {
                html += `<p>${line.q}</p>`;
            }
        });
        html += '</div>';
        u7c1_container.innerHTML = html;

        document.getElementById('check-u7-c1').addEventListener('click', () => {
            u7c1_data.forEach((line, index) => {
                if (line.options.length > 0) {
                    const selected = document.querySelector(`input[name="u7c1_q${index}"]:checked`);
                    const group = document.querySelector(`input[name="u7c1_q${index}"]`).closest('.options-group-inline');
                    group.classList.remove('correct-q', 'incorrect-q');
                    if (selected && selected.value === line.answer) {
                        group.classList.add('correct-q');
                    } else {
                        group.classList.add('incorrect-q');
                    }
                }
            });
        });
    }
});