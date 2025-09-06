// Task 1 & 2 Logic
document.getElementById('check-task1').addEventListener('click', function() {
    const answers = {
        'task1-q1': 'photocopier',
        'task1-q2': 'hand',
        'task1-q3': 'symbol',
        'task1-q4': 'paper',
        'task1-q5': 'opening',
        'task1-q6': 'pulling',
        'task1-q7': 'stuck'
    };
    let correctCount = 0;
    const feedbackDiv = document.getElementById('feedback-task1');
    for (const id in answers) {
        const input = document.getElementById(id);
        if (input.value.toLowerCase() === answers[id].toLowerCase()) {
            input.style.borderColor = 'green';
            correctCount++;
        } else {
            input.style.borderColor = 'red';
        }
    }
    if (correctCount === Object.keys(answers).length) {
        feedbackDiv.textContent = 'Perfect! All answers are correct.';
        feedbackDiv.style.color = 'green';
    } else {
        feedbackDiv.textContent = `You got ${correctCount} out of ${Object.keys(answers).length} correct.`;
        feedbackDiv.style.color = 'red';
    }
});

document.getElementById('show-answers-task1').addEventListener('click', function() {
    const answers = {
        'task1-q1': 'photocopier',
        'task1-q2': 'hand',
        'task1-q3': 'symbol',
        'task1-q4': 'paper',
        'task1-q5': 'opening',
        'task1-q6': 'pulling',
        'task1-q7': 'stuck'
    };
    for (const id in answers) {
        document.getElementById(id).value = answers[id];
        document.getElementById(id).style.borderColor = 'green';
    }
});

// Task 3 Drag and Drop Logic
const pool = document.getElementById('rearrange-container');
const checkBtn3 = document.getElementById('check-task3');
const feedback3 = document.getElementById('feedback-task3');

function createDropZones() {
    for (let i = 0; i < 7; i++) {
        const zone = document.createElement('div');
        zone.className = 'sentence-drop-zone';
        zone.dataset.order = i + 1;
        pool.appendChild(zone);
    }
    const wordPool = document.getElementById('pool');
    pool.insertBefore(wordPool, pool.firstChild);
}

let draggedItem = null;

document.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('draggable-word-tile')) {
        draggedItem = e.target;
        e.dataTransfer.effectAllowed = 'move';
    }
});

document.addEventListener('dragover', (e) => {
    e.preventDefault();
    const target = e.target.closest('.sentence-drop-zone');
    if (target && !target.querySelector('.draggable-word-tile')) {
        target.classList.add('drag-over');
    }
});

document.addEventListener('dragleave', (e) => {
    const target = e.target.closest('.sentence-drop-zone');
    if (target) {
        target.classList.remove('drag-over');
    }
});

document.addEventListener('drop', (e) => {
    e.preventDefault();
    const target = e.target.closest('.sentence-drop-zone');
    if (target && draggedItem) {
        target.appendChild(draggedItem);
        target.classList.remove('drag-over');
        draggedItem = null;
    }
});

checkBtn3.addEventListener('click', () => {
    const dropZones = document.querySelectorAll('.sentence-drop-zone');
    let correctCount = 0;
    let totalItems = 0;

    dropZones.forEach(zone => {
        totalItems++;
        const item = zone.querySelector('.draggable-word-tile');
        if (item) {
            if (parseInt(item.dataset.order) === parseInt(zone.dataset.order)) {
                zone.classList.add('correct');
                zone.classList.remove('incorrect');
                correctCount++;
            } else {
                zone.classList.add('incorrect');
                zone.classList.remove('correct');
            }
        }
    });

    if (correctCount === totalItems) {
        feedback3.textContent = 'Correct! The conversation is in the right order.';
        feedback3.style.color = 'green';
    } else {
        feedback3.textContent = `Incorrect. You got ${correctCount} out of ${totalItems} correct.`;
        feedback3.style.color = 'red';
    }
});

document.addEventListener('DOMContentLoaded', createDropZones);