document.addEventListener('DOMContentLoaded', () => {

    // Task 1: Match the job titles to the correct pictures/descriptions.
    const u12t1Questions = document.querySelectorAll('#u12t1-titles .match-item');
    const u12t1Answers = document.querySelectorAll('#u12t1-descriptions .match-item');
    let u12t1Selected = [];
    const u12t1Feedback = document.getElementById('feedback-u12t1');

    function handleU12t1MatchClick(e) {
        const item = e.target.closest('.match-item');
        if (!item || item.classList.contains('paired')) return;

        item.classList.toggle('selected');
        if (item.classList.contains('selected')) {
            u12t1Selected.push(item);
        } else {
            u12t1Selected = u12t1Selected.filter(el => el !== item);
        }

        if (u12t1Selected.length === 2) {
            checkU12t1Pair();
        }
    }

    function checkU12t1Pair() {
        const [item1, item2] = u12t1Selected;
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
        u12t1Selected = [];
    }

    u12t1Questions.forEach(item => item.addEventListener('click', handleU12t1MatchClick));
    u12t1Answers.forEach(item => item.addEventListener('click', handleU12t1MatchClick));

    document.getElementById('check-u12t1').addEventListener('click', () => {
        const totalItems = u12t1Questions.length + u12t1Answers.length;
        const allPaired = document.querySelectorAll('#matching-game-u12t1 .match-item.paired').length;
        if (allPaired === totalItems) {
            u12t1Feedback.textContent = 'Tuyệt vời! Tất cả các cặp đều đúng.';
            u12t1Feedback.style.color = 'green';
        } else {
            u12t1Feedback.textContent = 'Có lỗi. Vui lòng thử lại.';
            u12t1Feedback.style.color = 'red';
        }
    });
});