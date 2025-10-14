document.addEventListener('DOMContentLoaded', () => {

    // DAY 1: Exercise 1: Multiple Choice Job Skills
    const u9d1e1Questions = [
        { q: "1. It's important to have good ___ when talking to customers on the phone.", options: ["negotiation skills", "phone manner", "teamwork skills", "leadership"], ans: "phone manner" },
        { q: "2. She always finishes her tasks on time because she has excellent ___.", options: ["time management skills", "public speaking skills", "computer skills", "negotiation skills"], ans: "time management skills" },
        { q: "3. He is confident when presenting ideas to a large audience. His ___ are impressive.", options: ["interpersonal skills", "problem-solving skills", "public speaking skills", "administration skills"], ans: "public speaking skills" },
        { q: "4. Good ___ help employees work together effectively to achieve a common goal.", options: ["teamwork skills", "computer skills", "phone manner", "leadership"], ans: "teamwork skills" },
        { q: "5. A manager must have strong ___ to guide and inspire their team.", options: ["work well under pressure", "leadership", "fluent in languages", "problem-solving skills"], ans: "leadership" },
        { q: "6. She is ___ and can speak English, Spanish, and French fluently.", options: ["public speaking skilled", "fluent in languages", "computer skilled", "teamwork skilled"], ans: "fluent in languages" },
        { q: "7. He stays calm and focused even during tight deadlines. He can ___.", options: ["work well under pressure", "negotiate well", "organize files efficiently", "manage teams effectively"], ans: "work well under pressure" },
        { q: "8. Employees with strong ___ can analyze challenges and find solutions quickly.", options: ["public speaking skills", "problem-solving skills", "phone manners", "teamwork skills"], ans: "problem-solving skills" },
        { q: "9. She manages office files, schedules, and emails daily. Her ___ are excellent.", options: ["interpersonal skills", "leadership", "administration skills", "computer skills"], ans: "administration skills" },
        { q: "10. To be successful in sales, you need strong ___ to discuss and reach agreements with clients.", options: ["teamwork skills", "negotiation skills", "public speaking skills", "phone manner"], ans: "negotiation skills" },
    ];
    
    const u9d1e1Container = document.getElementById('u9d1e1-container');

    u9d1e1Questions.forEach((qData, index) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'question-block';
        let optionsHtml = `<p><strong>${index + 1}. ${qData.q}</strong></p><div class="options-group">`;
        qData.options.forEach((option, optIndex) => {
            const id = `u9d1e1-q${index + 1}-opt${optIndex}`;
            optionsHtml += `<label><input type="radio" name="u9d1e1-q${index + 1}" value="${option}" id="${id}"> ${option}</label>`;
        });
        optionsHtml += `</div>`;
        qDiv.innerHTML = optionsHtml;
        u9d1e1Container.appendChild(qDiv);
    });

    document.getElementById('check-u9d1e1').addEventListener('click', () => {
        let correctCount = 0;
        u9d1e1Questions.forEach((qData, index) => {
            const qName = `u9d1e1-q${index + 1}`;
            const selected = document.querySelector(`input[name="${qName}"]:checked`);
            const qBlock = selected ? selected.closest('.question-block') : document.querySelector(`.question-block:nth-child(${index + 1})`);
            
            qBlock.classList.remove('correct-q', 'incorrect-q');

            if (selected && selected.value.trim() === qData.ans.trim()) {
                correctCount++;
                qBlock.classList.add('correct-q');
            } else if (selected) {
                qBlock.classList.add('incorrect-q');
            }
        });

        const feedbackDiv = document.getElementById('feedback-u9d1e1');
        if (correctCount === u9d1e1Questions.length) {
            feedbackDiv.textContent = 'Tuyệt vời! Tất cả các câu trả lời đều đúng.';
            feedbackDiv.style.color = 'green';
        } else {
            feedbackDiv.textContent = `Bạn đã trả lời đúng ${correctCount} trên ${u9d1e1Questions.length} câu. Vui lòng xem lại.`;
            feedbackDiv.style.color = 'red';
        }
    });

    // DAY 2: Exercise 1: Fill in the blanks (Dialogue)
    document.getElementById('check-u9d2e1').addEventListener('click', () => {
        const answers = {
            'u9d2e1-q1': 'started', 'u9d2e1-q2': 'first week', 'u9d2e1-q3': 'showed me around', 
            'u9d2e1-q4': 'help', 'u9d2e1-q5': 'friendly', 'u9d2e1-q6': 'marketing campaigns', 
            'u9d2e1-q7': 'promotional event', 'u9d2e1-q8': 'a big success', 
            'u9d2e1-q9': 'energy', 'u9d2e1-q10': 'eager'
        };
        let correctCount = 0;
        const feedbackDiv = document.getElementById('feedback-u9d2e1');
        
        for (const id in answers) {
            const input = document.getElementById(id);
            if (input.value.trim().toLowerCase() === answers[id].toLowerCase()) {
                input.style.borderColor = 'green';
                correctCount++;
            } else {
                input.style.borderColor = 'red';
            }
        }
        
        if (correctCount === Object.keys(answers).length) {
            feedbackDiv.textContent = 'Tuyệt vời! Tất cả các câu trả lời đều đúng.';
            feedbackDiv.style.color = 'green';
        } else {
            feedbackDiv.textContent = `Bạn đã trả lời đúng ${correctCount} trên ${Object.keys(answers).length} câu. Vui lòng xem lại.`;
            feedbackDiv.style.color = 'red';
        }
    });
    
    // DAY 3: Exercise 1: Rearrange sentences
    document.getElementById('check-u9d3e1').addEventListener('click', () => {
        let allCorrect = true;
        const rearrangeItems = document.querySelectorAll('#u9d3e1-container .rearrange-item');
        rearrangeItems.forEach(item => {
            const dropZone = item.querySelector('.sentence-drop-zone');
            const userAnswer = dropZone.textContent.trim().replace(/[.,?]/g, '');
            const correctAnswer = dropZone.dataset.correct.trim().replace(/[.,?]/g, '');

            if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
                dropZone.classList.add('correct');
                dropZone.classList.remove('incorrect');
            } else {
                dropZone.classList.add('incorrect');
                dropZone.classList.remove('correct');
                allCorrect = false;
            }
        });

        const feedbackDiv = document.getElementById('feedback-u9d3e1');
        if (allCorrect) {
            feedbackDiv.textContent = 'Tuyệt vời! Tất cả các câu đều đúng.';
            feedbackDiv.style.color = 'green';
        } else {
            feedbackDiv.textContent = 'Có lỗi trong sắp xếp. Vui lòng thử lại.';
            feedbackDiv.style.color = 'red';
        }
    });
});