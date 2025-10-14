document.addEventListener('DOMContentLoaded', () => {

    // DAY 11 LOGIC

    // Exercise 2: Match the pronunciation with pictures
    const d11Questions = document.querySelectorAll('#d11-col-left .match-item');
    const d11Answers = document.querySelectorAll('#d11-col-right .match-item');
    let d11Selected = [];
    const d11Feedback = document.getElementById('feedback-d11-ex2');

    function handleD11MatchClick(e) {
        const item = e.target.closest('.match-item');
        if (!item || item.classList.contains('paired')) return;

        item.classList.toggle('selected');
        if (item.classList.contains('selected')) {
            d11Selected.push(item);
        } else {
            d11Selected = d11Selected.filter(el => el !== item);
        }

        if (d11Selected.length === 2) {
            checkD11Pair();
        }
    }

    function checkD11Pair() {
        const [item1, item2] = d11Selected;
        if (item1.dataset.pair === item2.dataset.pair) {
            // Assign a unique color for the pair (a=0, b=1, c=2...)
            const pairIndex = item1.dataset.pair.charCodeAt(0) - 'a'.charCodeAt(0);
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
        d11Selected = [];
    }

    d11Questions.forEach(item => item.addEventListener('click', handleD11MatchClick));
    d11Answers.forEach(item => item.addEventListener('click', handleD11MatchClick));

    document.getElementById('check-d11-ex2').addEventListener('click', () => {
        const totalItems = d11Questions.length + d11Answers.length;
        const allPaired = document.querySelectorAll('#matching-game-d11-e2 .match-item.paired').length;
        if (allPaired === totalItems) {
            d11Feedback.textContent = 'Excellent! All pairs are correct.';
            d11Feedback.style.color = 'green';
        } else {
            d11Feedback.textContent = 'Not all pairs are correct. Keep trying!';
            d11Feedback.style.color = 'red';
        }
    });

    // Exercise 2: Words check
    document.getElementById('check-d11-words').addEventListener('click', () => {
        const correctAnswers = {
            'd11-word-1': 'Go to the supermarket',
            'd11-word-2': 'Brush the teeth',
            'd11-word-3': 'Clean the house',
            'd11-word-4': 'Iron the clothes',
            'd11-word-5': 'Prepare the meals',
            'd11-word-6': 'Make the bed',
            'd11-word-7': 'Do homework',
            'd11-word-8': 'Go to bed',
            'd11-word-9': 'Do the laundry',
            'd11-word-10': 'Wash the dishes'
        };
        let correctCount = 0;
        const feedbackDiv = document.getElementById('feedback-d11-words');
        const totalQuestions = Object.keys(correctAnswers).length;

        for (const id in correctAnswers) {
            const input = document.getElementById(id);
            const userAnswer = input.value.trim().toLowerCase().replace(/[,.]/g, '');
            const correctValue = correctAnswers[id].toLowerCase().replace(/[,.]/g, '');

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
});