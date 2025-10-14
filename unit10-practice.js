document.addEventListener('DOMContentLoaded', () => {

    // Task 1: Listen and fill in the blanks (Sickness Dialogue).
    document.getElementById('check-u10p1').addEventListener('click', () => {
        const answers = {
            'u10p1-q1': 'sick to my stomach', 
            'u10p1-q2': 'throwing', 
            'u10p1-q3': 'water', 
            'u10p1-q4': 'was wrong',
            'u10p1-q5': 'ate', 
            'u10p1-q6': 'feverish', 
            'u10p1-q7': 'throwing up', 
            'u10p1-q8': 'medicine',
            'u10p1-q9': 'flu', 
            'u10p1-q10': 'vomit', 
            'u10p1-q11': 'some tea', 
            'u10p1-q12': 'doctor',
            'u10p1-q13': 'prescription',
            'u10p1-q14': 'diagnose',
            'u10p1-q15': 'stomach'
        };
        let correctCount = 0;
        const feedbackDiv = document.getElementById('feedback-u10p1');
        const totalQuestions = Object.keys(answers).length;
        
        for (const id in answers) {
            const input = document.getElementById(id);
            const userAnswer = input.value.trim().toLowerCase().replace(/[,.!]/g, '');
            const correctValue = answers[id].toLowerCase().replace(/[,.!]/g, '');

            if (userAnswer === correctValue) {
                input.style.borderColor = 'green';
                correctCount++;
            } else {
                input.style.borderColor = 'red';
            }
        }
        
        if (correctCount === totalQuestions) {
            feedbackDiv.textContent = 'Tuyệt vời! Tất cả các câu trả lời đều đúng.';
            feedbackDiv.style.color = 'green';
        } else {
            feedbackDiv.textContent = `Bạn đã trả lời đúng ${correctCount} trên ${totalQuestions} câu. Vui lòng xem lại.`;
            feedbackDiv.style.color = 'red';
        }
    });

    // Task 2: Fill in the blanks and match the symptoms with advice.
    const symptomsAnswers = {
        'u10p2-q1': 'headache', // -> take medicine and rest
        'u10p2-q2': 'cough', // -> stop smoking
        'u10p2-q3': 'toothache', // -> go to the dentist
        'u10p2-q4': 'sore throat', // -> shouldn't drink cold water
        'u10p2-q5': 'stomach ache' // -> eat healthy food
    };

    document.getElementById('check-u10p2-match').addEventListener('click', () => {
        // Deel 1: Invullen van symptomen
        let fillCorrectCount = 0;
        const totalFillQuestions = Object.keys(symptomsAnswers).length;

        for (const id in symptomsAnswers) {
            const input = document.getElementById(id);
            const userAnswer = input.value.trim().toLowerCase();
            const correctValue = symptomsAnswers[id].toLowerCase();

            if (userAnswer === correctValue) {
                input.style.borderColor = 'green';
                fillCorrectCount++;
            } else {
                input.style.borderColor = 'red';
            }
        }
        
        // Deel 2: Controle van de match (gebruik makend van data-pair)
        const matchQuestions = document.querySelectorAll('#u10p2-symptoms .match-item');
        const matchAnswers = document.querySelectorAll('#u10p2-advice .match-item');
        let matchCorrectCount = 0;
        let matchTotal = matchQuestions.length;

        matchQuestions.forEach(q => {
            const pairedItem = matchAnswers[q.dataset.pair.charCodeAt(0) - 'A'.charCodeAt(0)];
            // Simplificatie: De oefening in de HTML is statisch, dus we controleren de data-pair van de elementen zelf.
            // Aangezien de gebruiker niet daadwerkelijk de items sleept/klikt in de huidige HTML-opzet,
            // zal ik de logica baseren op de veronderstelling dat dit een klik/match-oefening is
            // en de feedback beperken tot de invulvragen.
        });

        // De feedback wordt voornamelijk gebaseerd op de invuloefening.
        const feedbackDiv = document.getElementById('feedback-u10p2');
        if (fillCorrectCount === totalFillQuestions) {
            feedbackDiv.textContent = 'Tuyệt vời! Alle symptomen zijn correct ingevuld.';
            feedbackDiv.style.color = 'green';
        } else {
            feedbackDiv.textContent = `Invuloefening: ${fillCorrectCount} op ${totalFillQuestions} correct. Vui lòng xem lại.`;
            feedbackDiv.style.color = 'red';
        }
    });

    // Initial setup to make match items clickable (Tijdelijke logica voor matchen)
    const matchItems = document.querySelectorAll('#u10p2-container .match-item');
    let selectedItems = [];

    matchItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const el = e.target.closest('.match-item');
            if (!el || el.classList.contains('paired')) return;

            el.classList.toggle('selected');
            if (el.classList.contains('selected')) {
                selectedItems.push(el);
            } else {
                selectedItems = selectedItems.filter(i => i !== el);
            }

            if (selectedItems.length === 2) {
                const [item1, item2] = selectedItems;
                if (item1.dataset.pair === item2.dataset.pair && item1.parentElement.id !== item2.parentElement.id) {
                    item1.classList.add('paired', 'correct');
                    item2.classList.add('paired', 'correct');
                    item1.classList.remove('selected');
                    item2.classList.remove('selected');
                } else {
                    item1.classList.add('incorrect');
                    item2.classList.add('incorrect');
                    setTimeout(() => {
                        item1.classList.remove('selected', 'incorrect');
                        item2.classList.remove('selected', 'incorrect');
                    }, 500);
                }
                selectedItems = [];
            }
        });
    });
});