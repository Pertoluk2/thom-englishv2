console.log("practice.js is succesvol geladen!");
document.addEventListener('DOMContentLoaded', () => {

    // --- OEFENING 1: LUISTEROEFENING ---
    const listeningQuestions = [
        {
            question: "1. What is Jill's role at the company?",
            options: ["Design assistant", "Finance manager", "Intern"],
            answer: "Intern"
        },
        {
            question: "2. What is Jill's last name?",
            options: ["Greene", "Cheam", "Green"],
            answer: "Green"
        },
        {
            question: "3. How long has Mr. Singh been working in Spandone and Co.?",
            options: ["14 years", "15 years", "16 years"],
            answer: "14 years"
        },
        {
            question: "4. What is Mr. Singh's role at Spandone and Co.?",
            options: ["Lawyer", "CEO", "Accountant"],
            answer: "Accountant"
        },
        {
            question: "5. Which two people are meeting for the first time?",
            options: ["Jill and Daniel", "Jill and Mr. Singh", "Daniel and Mr. Singh"],
            answer: "Jill and Mr. Singh"
        }
    ];

    const listeningContainer = document.getElementById('listening-questions-container');
    const checkListeningBtn = document.getElementById('check-listening-button');
    const listeningFeedback = document.getElementById('feedback-listening');

    if (listeningContainer) {
        listeningQuestions.forEach((q, index) => {
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
            listeningContainer.appendChild(questionDiv);
        });

        checkListeningBtn.addEventListener('click', () => {
            let correctCount = 0;
            listeningQuestions.forEach((q, index) => {
                const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
                const questionBlock = listeningContainer.children[index];
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
            listeningFeedback.textContent = `Bạn đã trả lời đúng ${correctCount} trên ${listeningQuestions.length} câu!`;
        });
    }

    // --- OEFENING 2: ZINNEN CORRIGEREN ---
    const sentencesToCorrect = [
        { incorrect: "To meet you, it's a pleasure, too.", correct: "It's a pleasure to meet you, too." },
        { incorrect: "Hi, I'm name's Adedeyo.", correct: "Hi, my name's Adedeyo. / Hi, I'm Adedeyo." },
        { incorrect: "Greet to meet you.", correct: "Great to meet you." },
        { incorrect: "This my new colleague, Martin.", correct: "This is my new colleague, Martin." },
        { incorrect: "Marisa, meeting Roula, my partner.", correct: "Marisa, meet Roula, my partner." },
        { incorrect: "It's good to meet to you, Katherine.", correct: "It's good to meet you, Katherine." },
        { incorrect: "I may introduce Claudia Gomez, our new CEO?", correct: "May I introduce Claudia Gomez, our new CEO?" }
    ];

    const correctionContainer = document.getElementById('sentence-correction-container');
    if (correctionContainer) {
        correctionContainer.innerHTML = ''; // Maak de container eerst leeg voor het geval dat
        sentencesToCorrect.forEach((s, index) => {
            const div = document.createElement('div');
            div.className = 'correction-item';
            div.innerHTML = `
                <p><em>Incorrect:</em> "${s.incorrect}"</p>
                <div class="correction-input-group">
                    <input type="text" placeholder="Gõ câu đúng vào đây...">
                    <button class="show-answer-btn">Hiện đáp án</button>
                </div>
                <p class="correct-answer-text hidden"><strong>Câu đúng:</strong> ${s.correct}</p>
            `;
            correctionContainer.appendChild(div);
        });

        correctionContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('show-answer-btn')) {
                const answerText = e.target.closest('.correction-item').querySelector('.correct-answer-text');
                answerText.classList.toggle('hidden');
            }
        });
    }
});