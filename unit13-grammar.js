document.addEventListener('DOMContentLoaded', () => {

    // Helper function for matching game logic
    const setupMatchingGame = (containerId, checkBtnId, feedbackId) => {
        const questions = document.querySelectorAll(`#${containerId} .match-column:first-child .match-item`);
        const answers = document.querySelectorAll(`#${containerId} .match-column:last-child .match-item`);
        let selected = [];
        const feedback = document.getElementById(feedbackId);
        const checkBtn = document.getElementById(checkBtnId);

        const handleMatchClick = (e) => {
            const item = e.target.closest('.match-item');
            if (!item || item.classList.contains('paired')) return;

            item.classList.toggle('selected');
            if (item.classList.contains('selected')) {
                selected.push(item);
            } else {
                selected = selected.filter(el => el !== item);
            }

            if (selected.length === 2) {
                checkPair();
            }
        }

        const checkPair = () => {
            const [item1, item2] = selected;
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
            selected = [];
        }

        questions.forEach(item => item.addEventListener('click', handleMatchClick));
        answers.forEach(item => item.addEventListener('click', handleMatchClick));

        checkBtn.addEventListener('click', () => {
            const totalItems = questions.length + answers.length;
            const allPaired = document.querySelectorAll(`#${containerId} .match-item.paired`).length;
            if (allPaired === totalItems) {
                feedback.textContent = 'Tuyệt vời! Tất cả các cặp đều đúng.';
                feedback.style.color = 'green';
            } else {
                feedback.textContent = 'Có lỗi. Vui lòng thử lại.';
                feedback.style.color = 'red';
            }
        });
    };

    // Task 1: Word Partners
    setupMatchingGame('matching-game-u13g1', 'check-u13g1', 'feedback-u13g1');

    // Task 2: Sentence Halves
    setupMatchingGame('matching-game-u13g2', 'check-u13g2', 'feedback-u13g2');

    // Task 3: Present Perfect Simple
    document.getElementById('check-u13g3').addEventListener('click', () => {
        const answers = {
            'u13g3-q1': 'has worked',
            'u13g3-q2': 'has taken',
            'u13g3-q3': 'have employed',
            'u13g3-q4': 'has trained',
            'u13g3-q5': 'have finished',
            'u13g3-q6': 'has approved'
        };
        let correctCount = 0;
        const feedbackDiv = document.getElementById('feedback-u13g3');
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
            feedbackDiv.textContent = 'Tuyệt vời! Tất cả các câu trả lời đều đúng (Hiện tại Hoàn thành).';
            feedbackDiv.style.color = 'green';
        } else {
            feedbackDiv.textContent = `Bạn đã trả lời đúng ${correctCount} trên ${totalQuestions} câu. Vui lòng xem lại.`;
            feedbackDiv.style.color = 'red';
        }
    });
});