document.addEventListener('DOMContentLoaded', () => {

    const questions = [
        { id: 'q1', text: "What's your name?" },
        { id: 'q2', text: "Where are you from?" },
        { id: 'q3', text: "What do you do?" },
        { id: 'q4', text: "What are your hobbies?" },
        { id: 'q5', text: "Can you tell me about your strengths?" },
        { id: 'q6', text: "What is one of your weaknesses?" },
        { id: 'q7', text: "How old are you?" },
        { id: 'q8', text: "Are you a student or do you work?" }
    ];

    const answers = [
        { id: 'a1', text: "I enjoy reading and playing soccer." },
        { id: 'a2', text: "I'm from Hanoi, Vietnam." },
        { id: 'a3', text: "I'm hardworking and very organized." },
        { id: 'a4', text: "My name is John." },
        { id: 'a5', text: "One of my weaknesses is that I'm sometimes shy." },
        { id: 'a6', text: "I work in an IT company." },
        { id: 'a7', text: "I'm 25 years old." },
        { id: 'a8', text: "I'm a teacher." }
    ];
    
    // De correcte antwoorden
    const correctPairs = { q1: 'a4', q2: 'a2', q3: 'a8', q4: 'a1', q5: 'a3', q6: 'a5', q7: 'a7', q8: 'a6' };

    const questionsCol = document.getElementById('questions-col');
    const answersCol = document.getElementById('answers-col');
    const checkBtn = document.getElementById('check-match-button');
    const resetBtn = document.getElementById('reset-match-button');
    const feedback = document.getElementById('feedback-match');

    let selectedQuestion = null;
    let userPairs = {};

    function initializeGame() {
        // Reset
        userPairs = {};
        selectedQuestion = null;
        questionsCol.innerHTML = '';
        answersCol.innerHTML = '';
        feedback.textContent = '';
        
        // Vragen weergeven
        questions.forEach(q => {
            const div = document.createElement('div');
            div.textContent = q.text;
            div.id = q.id;
            div.className = 'match-item';
            div.addEventListener('click', () => selectQuestion(div));
            questionsCol.appendChild(div);
        });

        // Antwoorden in willekeurige volgorde weergeven
        answers.sort(() => Math.random() - 0.5).forEach(a => {
            const div = document.createElement('div');
            div.textContent = a.text;
            div.id = a.id;
            div.className = 'match-item';
            div.addEventListener('click', () => selectAnswer(div));
            answersCol.appendChild(div);
        });
    }

    function selectQuestion(questionDiv) {
        if (questionDiv.classList.contains('paired')) return; // Gekoppelde vraag niet selecteren

        // Verwijder 'selected' van de vorige selectie
        const currentSelected = document.querySelector('.match-item.selected');
        if (currentSelected) {
            currentSelected.classList.remove('selected');
        }

        // Maak de nieuwe vraag 'selected'
        questionDiv.classList.add('selected');
        selectedQuestion = questionDiv;
    }

    function selectAnswer(answerDiv) {
        if (!selectedQuestion || answerDiv.classList.contains('paired')) return;

        const questionId = selectedQuestion.id;
        const answerId = answerDiv.id;

        // Verwijder eventuele oude koppeling van deze vraag/antwoord
        const oldAnswerId = userPairs[questionId];
        if (oldAnswerId) {
            document.getElementById(oldAnswerId)?.classList.remove('paired', 'pair-' + (Object.keys(userPairs).indexOf(questionId) % 8));
        }
        for(const qid in userPairs) {
            if(userPairs[qid] === answerId) {
                document.getElementById(qid)?.classList.remove('paired', 'pair-' + (Object.keys(userPairs).indexOf(qid) % 8));
                delete userPairs[qid];
            }
        }

        // Maak de nieuwe koppeling
        userPairs[questionId] = answerId;
        const pairIndex = Object.keys(userPairs).indexOf(questionId) % 8;

        selectedQuestion.className = 'match-item paired pair-' + pairIndex;
        answerDiv.className = 'match-item paired pair-' + pairIndex;
        
        selectedQuestion = null; // Reset selectie
    }

checkBtn.addEventListener('click', () => {
        let correctCount = 0;
        document.querySelectorAll('.match-item').forEach(el => el.classList.remove('correct', 'incorrect'));

        for (const questionId in userPairs) {
            const answerId = userPairs[questionId];
            const isCorrect = correctPairs[questionId] === answerId;
            
            const qEl = document.getElementById(questionId);
            const aEl = document.getElementById(answerId);

            if (isCorrect) {
                qEl.classList.add('correct');
                aEl.classList.add('correct');
                correctCount++;
            } else {
                qEl.classList.add('incorrect');
                aEl.classList.add('incorrect');
            }
        }
        feedback.textContent = `Bạn đã trả lời đúng ${correctCount} trên 8 cặp!`;
    });

    resetBtn.addEventListener('click', initializeGame);

    // Start het spel
    initializeGame();
});