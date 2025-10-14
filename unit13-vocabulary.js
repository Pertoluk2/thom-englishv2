document.addEventListener('DOMContentLoaded', () => {

    // Task 2: Match the words in column A with column B (Departments).
    const u13t2Words = document.querySelectorAll('#u13t2-words .match-item');
    const u13t2Descriptions = document.querySelectorAll('#u13t2-descriptions .match-item');
    let u13t2Selected = [];
    const u13t2Feedback = document.getElementById('feedback-u13t2');

    function handleU13t2MatchClick(e) {
        const item = e.target.closest('.match-item');
        if (!item || item.classList.contains('paired')) return;

        item.classList.toggle('selected');
        if (item.classList.contains('selected')) {
            u13t2Selected.push(item);
        } else {
            u13t2Selected = u13t2Selected.filter(el => el !== item);
        }

        if (u13t2Selected.length === 2) {
            checkU13t2Pair();
        }
    }

    function checkU13t2Pair() {
        const [item1, item2] = u13t2Selected;
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
        u13t2Selected = [];
    }

    u13t2Words.forEach(item => item.addEventListener('click', handleU13t2MatchClick));
    u13t2Descriptions.forEach(item => item.addEventListener('click', handleU13t2MatchClick));

    document.getElementById('check-u13t2').addEventListener('click', () => {
        const totalItems = u13t2Words.length + u13t2Descriptions.length;
        const allPaired = document.querySelectorAll('#matching-game-u13t2 .match-item.paired').length;
        if (allPaired === totalItems) {
            u13t2Feedback.textContent = 'Tuyệt vời! Tất cả các cặp đều đúng.';
            u13t2Feedback.style.color = 'green';
        } else {
            u13t2Feedback.textContent = 'Có lỗi. Vui lòng thử lại.';
            u13t2Feedback.style.color = 'red';
        }
    });
});