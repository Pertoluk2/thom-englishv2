document.addEventListener('DOMContentLoaded', () => {

    // --- OEFENING 1: KLIK EN VUL IN ---
    const prepositionData1 = [
        { sentence: "She was born ___ 1995.", answer: "in" },
        { sentence: "We always go to the beach ___ summer.", answer: "in" },
        { sentence: "The meeting is scheduled ___ Monday.", answer: "on" },
        { sentence: "I will call you ___ 5 PM.", answer: "at" },
        { sentence: "My father likes to read newspapers ___ the morning.", answer: "in" },
        { sentence: "They moved to this city ___ October.", answer: "in" },
        { sentence: "The event took place ___ April 15th.", answer: "on" },
        { sentence: "She prefers to study ___ night.", answer: "at" },
        { sentence: "I always visit my grandparents ___ Christmas Day.", answer: "on" },
        { sentence: "The train arrives ___ noon.", answer: "at" }
    ];

    const wordbox1 = document.getElementById('u2-b1-wordbox');
    const container1 = document.getElementById('u2-b1-container');
    const checkButton1 = document.getElementById('check-u2-b1');
    const feedback1 = document.getElementById('feedback-u2-b1');
    
    let activeInput = null;

    if (wordbox1 && container1 && checkButton1 && feedback1) {
        const choices = ["in", "on", "at"];
        choices.forEach(choice => {
            const choiceDiv = document.createElement('div');
            choiceDiv.className = 'choice-word';
            choiceDiv.textContent = choice;
            choiceDiv.addEventListener('click', () => {
                if (activeInput) {
                    activeInput.value = choice;
                    activeInput.classList.remove('active');
                    activeInput = null;
                }
            });
            wordbox1.appendChild(choiceDiv);
        });

        prepositionData1.forEach((data, index) => {
            const sentenceDiv = document.createElement('div');
            sentenceDiv.className = 'sentence';
            const sentenceHTML = data.sentence.replace('___', `<input type="text" id="answer-u2-b1-${index}" class="fill-in-input" readonly />`);
            sentenceDiv.innerHTML = `${index + 1}. ${sentenceHTML}`;
            container1.appendChild(sentenceDiv);

            const inputField = sentenceDiv.querySelector('.fill-in-input');
            inputField.addEventListener('click', () => {
                const currentActive = document.querySelector('.fill-in-input.active');
                if (currentActive) { currentActive.classList.remove('active'); }
                inputField.classList.add('active');
                activeInput = inputField;
            });
        });

        checkButton1.addEventListener('click', () => {
            let correctCount = 0;
            prepositionData1.forEach((data, index) => {
                const input = document.getElementById(`answer-u2-b1-${index}`);
                input.style.borderBottomColor = '';
                if (input.value.toLowerCase() === data.answer) {
                    correctCount++;
                    input.style.borderBottomColor = 'green';
                } else {
                    input.style.borderBottomColor = 'red';
                }
            });
            feedback1.textContent = `Bạn đã trả lời đúng ${correctCount} trên ${prepositionData1.length} câu!`;
        });
    }

    // --- OEFENING 2: ZINNEN CORRIGEREN ---
    const sentencesToCorrect = [
        { incorrect: "She has an appointment on 3 PM.", correct: "She has an appointment at 3 PM." },
        { incorrect: "We went to the museum in Sunday.", correct: "We went to the museum on Sunday." },
        { incorrect: "My birthday is at November.", correct: "My birthday is in November." },
        { incorrect: "He usually wakes up on the morning.", correct: "He usually wakes up in the morning." },
        { incorrect: "The concert will start in 7:30 PM.", correct: "The concert will start at 7:30 PM." },
        { incorrect: "I love the weather at summer.", correct: "I love the weather in summer." },
        { incorrect: "She graduated in June 15th.", correct: "She graduated on June 15th." },
        { incorrect: "We will visit you on the weekend.", correct: "We will visit you at the weekend." },
        { incorrect: "The flight landed on midnight.", correct: "The flight landed at midnight." },
        { incorrect: "He got his first job at 2018.", correct: "He got his first job in 2018." }
    ];

    const container2 = document.getElementById('u2-b2-container');

    if (container2) {
        sentencesToCorrect.forEach((s) => {
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
            container2.appendChild(div);
        });

        container2.addEventListener('click', (e) => {
            if (e.target.classList.contains('show-answer-btn')) {
                const answerText = e.target.closest('.correction-item').querySelector('.correct-answer-text');
                answerText.classList.toggle('hidden');
            }
        });
    }

    // --- OEFENING 3: MEERKEUZE QUIZ ---
    const quizData3 = [
        { question: "My brother's wedding is ___ July 25th.", answer: "on" },
        { question: "The train departs ___ 6:45 AM.", answer: "at" },
        { question: "We usually have a big family dinner ___ Christmas Eve.", answer: "on" },
        { question: "He graduated from university ___ 2020.", answer: "in" },
        { question: "I always go for a walk ___ the evening.", answer: "in" },
        { question: "They met for the first time ___ a cold day in December.", answer: "on" },
        { question: "The football match will start ___ Saturday afternoon.", answer: "on" },
        { question: "I usually get up ___ dawn during the summer.", answer: "at" },
        { question: "She always makes a wish ___ her birthday.", answer: "on" },
        { question: "We had a long conversation ___ the weekend.", answer: "at" }
    ];
    
    const container3 = document.getElementById('u2-b3-container');
    const checkButton3 = document.getElementById('check-u2-b3');
    const feedback3 = document.getElementById('feedback-u2-b3');

    if (container3 && checkButton3 && feedback3) {
        const options = ["in", "on", "at"];
        quizData3.forEach((data, index) => {
            const questionBlock = document.createElement('div');
            questionBlock.className = 'question-block';

            let optionsHTML = '';
            options.forEach(opt => {
                optionsHTML += `<label><input type="radio" name="q3_${index}" value="${opt}"> ${opt}</label>`;
            });

            const questionHTML = data.question.replace('___', `<div class="options-group">${optionsHTML}</div>`);
            questionBlock.innerHTML = `<p class="question-text">${index + 1}. ${questionHTML}</p>`;
            container3.appendChild(questionBlock);
        });

        checkButton3.addEventListener('click', () => {
            let correctCount = 0;
            quizData3.forEach((data, index) => {
                const block = container3.children[index];
                block.classList.remove('correct-q', 'incorrect-q');
                const selected = document.querySelector(`input[name="q3_${index}"]:checked`);
                if (selected) {
                    if (selected.value === data.answer) {
                        correctCount++;
                        block.classList.add('correct-q');
                    } else {
                        block.classList.add('incorrect-q');
                    }
                } else {
                    block.classList.add('incorrect-q');
                }
            });
            feedback3.textContent = `Bạn đã trả lời đúng ${correctCount} trên ${quizData3.length} câu!`;
        });
    }
});