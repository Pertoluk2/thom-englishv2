document.addEventListener('DOMContentLoaded', () => {
    const quizData = [
        {
            sentence: "I always ___ to work.",
            options: ["catch", "drive"],
            answer: "drive"
        },
        {
            sentence: "It's usually quicker to ___.",
            options: ["bike", "cycle"],
            answer: "cycle"
        },
        {
            sentence: "When it's sunny, we go on ___.",
            options: ["foot", "walk"],
            answer: "foot"
        },
        {
            sentence: "We don't like taking the ___.",
            options: ["metro", "cycle"],
            answer: "metro"
        },
        {
            sentence: "I ___ to work to stay fit.",
            options: ["walk", "foot"],
            answer: "walk"
        },
        {
            sentence: "I read a book when I go ___ train.",
            options: ["on", "by"],
            answer: "by"
        },
        {
            sentence: "I ___ the bus when it rains.",
            options: ["take", "walk"],
            answer: "take"
        }
    ];

    const container = document.getElementById('u4-b1-container');
    const checkButton = document.getElementById('check-u4-b1');
    const feedback = document.getElementById('feedback-u4-b1');

    if (!container || !checkButton || !feedback) return;

    // Bouw de quiz op
    quizData.forEach((data, index) => {
        const questionBlock = document.createElement('div');
        questionBlock.className = 'question-block';

        let optionsHTML = '';
        const shuffledOptions = [...data.options].sort(() => Math.random() - 0.5);
        shuffledOptions.forEach(opt => {
            optionsHTML += `
                <label>
                    <input type="radio" name="question${index}" value="${opt}">
                    ${opt}
                </label>
            `;
        });

        // Genereer de HTML voor de vraag
        const sentenceHTML = data.sentence.replace('___', `<span class="options-group-inline">${optionsHTML}</span>`);
        questionBlock.innerHTML = `<p class="question-text">${index + 1}. ${sentenceHTML}</p>`;
        container.appendChild(questionBlock);
    });

    // Voeg de controle-logica toe
    checkButton.addEventListener('click', () => {
        let correctCount = 0;
        quizData.forEach((data, index) => {
            const questionBlock = container.children[index];
            questionBlock.classList.remove('correct-q', 'incorrect-q');
            
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);

            if (selectedOption) {
                if (selectedOption.value === data.answer) {
                    correctCount++;
                    questionBlock.classList.add('correct-q');
                } else {
                    questionBlock.classList.add('incorrect-q');
                }
            } else {
                questionBlock.classList.add('incorrect-q'); // Markeer als fout als er niets is geselecteerd
            }
        });
        feedback.textContent = `Bạn đã trả lời đúng ${correctCount} trên ${quizData.length} câu!`;
    });
});