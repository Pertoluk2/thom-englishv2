document.addEventListener('DOMContentLoaded', () => {
    const trueFalseQuestions = [
        { statement: "Sumiko cycles to work every day.", answer: "True" },
        { statement: "She reads her emails first thing every morning.", answer: "False" },
        { statement: "She writes a list of things to do that day.", answer: "True" },
        { statement: "She meets her colleagues to talk about the day's work.", answer: "True" },
        { statement: "Sumiko goes to a local restaurant for lunch every day.", answer: "False" },
        { statement: "She tries to deal with all her emails by 5 o'clock.", answer: "True" },
        { statement: "Sumiko always leaves work at 6 o'clock.", answer: "False" },
        { statement: "She turns her phone off when she gets home.", answer: "True" }
    ];

    const container = document.getElementById('u3-s1-container');
    const checkButton = document.getElementById('check-u3-s1');
    const feedback = document.getElementById('feedback-u3-s1');

    if (!container || !checkButton || !feedback) return;

    // Bouw de quiz op
    trueFalseQuestions.forEach((qData, index) => {
        const questionBlock = document.createElement('div');
        questionBlock.className = 'question-block';

        const optionsHTML = `
            <label><input type="radio" name="question${index}" value="True"> True</label>
            <label><input type="radio" name="question${index}" value="False"> False</label>
        `;

        questionBlock.innerHTML = `
            <p class="question-text">${index + 1}. ${qData.statement}</p>
            <div class="options-group">${optionsHTML}</div>
        `;
        container.appendChild(questionBlock);
    });

    // Controleer de antwoorden
    checkButton.addEventListener('click', () => {
        let correctCount = 0;
        trueFalseQuestions.forEach((qData, index) => {
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
        feedback.textContent = `Bạn đã trả lời đúng ${correctCount} trên ${trueFalseQuestions.length} câu!`;
    });
});