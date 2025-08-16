document.addEventListener('DOMContentLoaded', () => {
    const readingQuestions = [
        {
            question: "1. James's email was sent to:",
            options: [
                "Mindy Jacques",
                "staff who are attending a conference",
                "visitors to James's company",
                "everyone in the company"
            ],
            answer: "everyone in the company"
        },
        {
            question: "2. Which of the following is true about the journey James has planned?",
            options: [
                "Delegates will take a different route on the return journey.",
                "The delegates will arrive just after the conference starts.",
                "The return journey is faster than the outbound journey.",
                "The delegates will need to change trains on the outbound journey."
            ],
            answer: "The return journey is faster than the outbound journey."
        },
        {
            question: "3. When did Mindy send her email?",
            options: [
                "Monday (17th March)",
                "Thursday (13th March)",
                "Friday morning (14th March)",
                "Friday afternoon (14th March)"
            ],
            answer: "Monday (17th March)"
        },
        {
            question: "4. What is James likely to do after receiving Mindy's message?",
            options: [
                "reserve a double room",
                "buy another conference ticket",
                "phone a taxi company",
                "cancel a train ticket"
            ],
            answer: "cancel a train ticket"
        }
    ];

    const container = document.getElementById('u4-s1-container');
    const checkButton = document.getElementById('check-u4-s1');
    const feedback = document.getElementById('feedback-u4-s1');

    if (!container || !checkButton || !feedback) return;

    // Bouw de quiz op
    readingQuestions.forEach((qData, index) => {
        const questionBlock = document.createElement('div');
        questionBlock.className = 'question-block';

        let optionsHTML = '';
        qData.options.forEach(option => {
            optionsHTML += `
                <label>
                    <input type="radio" name="question${index}" value="${option}">
                    ${option}
                </label>
            `;
        });

        questionBlock.innerHTML = `
            <p class="question-text">${qData.question}</p>
            <div class="options-group">${optionsHTML}</div>
        `;
        container.appendChild(questionBlock);
    });

    // Controleer de antwoorden
    checkButton.addEventListener('click', () => {
        let correctCount = 0;
        readingQuestions.forEach((qData, index) => {
            const questionBlock = container.children[index];
            questionBlock.classList.remove('correct-q', 'incorrect-q');
            
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);

            if (selectedOption) {
                if (selectedOption.value === qData.answer) {
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
});