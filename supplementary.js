document.addEventListener('DOMContentLoaded', () => {

    const readingQuestions = [
        {
            question: "1. What word is used for making connections?",
            options: ["Networking", "Sharing", "Dividing"],
            answer: "Networking"
        },
        {
            question: "2. Who might be useful people to talk to?",
            options: ["Ex-colleagues", "Recruiters", "Family"],
            answer: "Ex-colleagues"
        },
        {
            question: "3. What do shy people do a lot?",
            options: ["Lie", "Say sorry", "Say thank you"],
            answer: "Say sorry"
        }
    ];

    const questionsContainer = document.getElementById('reading-questions-container');
    const checkBtn = document.getElementById('check-reading-button');
    const feedback = document.getElementById('feedback-reading');

    if (questionsContainer) {
        readingQuestions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-block';
            
            let optionsHTML = '';
            q.options.forEach(opt => {
                optionsHTML += `
                    <label>
                        <input type="radio" name="question${index}" value="${opt}">
                        ${opt}
                    </label>
                `;
            });

            questionDiv.innerHTML = `<p class="question-text">${q.question}</p><div class="options-group">${optionsHTML}</div>`;
            questionsContainer.appendChild(questionDiv);
        });

        checkBtn.addEventListener('click', () => {
            let correctCount = 0;
            readingQuestions.forEach((q, index) => {
                const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
                const questionBlock = questionsContainer.children[index];
                questionBlock.classList.remove('correct-q', 'incorrect-q');

                if (selectedOption) {
                    if (selectedOption.value === q.answer) {
                        correctCount++;
                        questionBlock.classList.add('correct-q');
                    } else {
                        questionBlock.classList.add('incorrect-q');
                    }
                } else {
                    questionBlock.classList.add('incorrect-q');
                }
            });
            feedback.textContent = `Bạn đã trả lời đúng ${correctCount} trên ${readingQuestions.length} câu!`;
        });
    }
});