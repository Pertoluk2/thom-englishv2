document.addEventListener('DOMContentLoaded', () => {

    // Task 1: Write phrases about health based on the phonetic transcriptions.
    document.getElementById('check-u10t1').addEventListener('click', () => {
        const answers = {
            'u10t1-q1': 'headache', 'u10t1-q2': 'flu', 'u10t1-q3': 'sore throat', 'u10t1-q4': 'fever',
            'u10t1-q5': 'cough', 'u10t1-q6': 'sneeze', 'u10t1-q7': 'have a broken leg', 'u10t1-q8': 'have a stomach ache',
            'u10t1-q9': 'have a check up', 'u10t1-q10': 'take medicine', 'u10t1-q11': 'have a healthy diet', 
            'u10t1-q12': 'take a rest', 'u10t1-q13': 'get enough sleep', 'u10t1-q14': 'take care of', 
            'u10t1-q15': 'drink enough water', 'u10t1-q16': 'exercise regularly'
        };
        let correctCount = 0;
        const feedbackDiv = document.getElementById('feedback-u10t1');
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
            feedbackDiv.textContent = 'Tuyệt vời! Tất cả các từ đều đúng.';
            feedbackDiv.style.color = 'green';
        } else {
            feedbackDiv.textContent = `Bạn đã trả lời đúng ${correctCount} trên ${totalQuestions} từ. Vui lòng xem lại.`;
            feedbackDiv.style.color = 'red';
        }
    });

    // Task 2: Match each word with its correct picture.
    const u10t2Questions = document.querySelectorAll('#u10t2-words .match-item');
    const u10t2Answers = document.querySelectorAll('#u10t2-pictures .match-item');
    let u10t2Selected = [];
    const u10t2Feedback = document.getElementById('feedback-u10t2');

    function handleU10t2MatchClick(e) {
        const item = e.target.closest('.match-item');
        if (!item || item.classList.contains('paired')) return;

        item.classList.toggle('selected');
        if (item.classList.contains('selected')) {
            u10t2Selected.push(item);
        } else {
            u10t2Selected = u10t2Selected.filter(el => el !== item);
        }

        if (u10t2Selected.length === 2) {
            checkU10t2Pair();
        }
    }

    function checkU10t2Pair() {
        const [item1, item2] = u10t2Selected;
        if (item1.dataset.pair === item2.dataset.pair) {
            const pairIndex = item1.dataset.pair.charCodeAt(0) - 'A'.charCodeAt(0);
            const pairClass = `pair-${pairIndex}`;
            
            item1.classList.add('paired', pairClass);
            item2.classList.add('paired', pairClass);
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
        u10t2Selected = [];
    }

    u10t2Questions.forEach(item => item.addEventListener('click', handleU10t2MatchClick));
    u10t2Answers.forEach(item => item.addEventListener('click', handleU10t2MatchClick));

    document.getElementById('check-u10t2').addEventListener('click', () => {
        const totalItems = u10t2Questions.length + u10t2Answers.length;
        const allPaired = document.querySelectorAll('#matching-game-u10t2 .match-item.paired').length;
        if (allPaired === totalItems) {
            u10t2Feedback.textContent = 'Tuyệt vời! Tất cả các cặp đều đúng.';
            u10t2Feedback.style.color = 'green';
        } else {
            u10t2Feedback.textContent = 'Có lỗi. Vui lòng thử lại.';
            u10t2Feedback.style.color = 'red';
        }
    });
});