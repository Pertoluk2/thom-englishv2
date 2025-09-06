document.addEventListener('DOMContentLoaded', () => {
    // Workbook Day 1 JavaScript
    document.getElementById('check-ex1').addEventListener('click', () => {
        const answers = {
            'q1-day1-ex1': 'Is this the cafeteria?',
            'q2-day1-ex1': 'Is this printer working?',
            'q3-day1-ex1': 'Is this your desk?',
            'q4-day1-ex1': 'Are the windows closed?',
            'q5-day1-ex1': 'Is this cupboard locked?',
            'q6-day1-ex1': 'Is his desk messy?',
            'q7-day1-ex1': 'Is she the CEO?',
            'q8-day1-ex1': 'Are you Jo\'s assistant?'
        };
        let correctCount = 0;
        for (const id in answers) {
            const input = document.getElementById(id);
            if (input.value.trim().toLowerCase() === answers[id].toLowerCase()) {
                input.style.borderColor = 'green';
                correctCount++;
            } else {
                input.style.borderColor = 'red';
            }
        }
        const feedback = document.getElementById('feedback-ex1');
        feedback.textContent = `You got ${correctCount} out of ${Object.keys(answers).length} correct.`;
        feedback.style.color = correctCount === Object.keys(answers).length ? 'green' : 'red';
    });

    document.getElementById('show-ex1').addEventListener('click', () => {
        const answers = {
            'q1-day1-ex1': 'Is this the cafeteria?',
            'q2-day1-ex1': 'Is this printer working?',
            'q3-day1-ex1': 'Is this your desk?',
            'q4-day1-ex1': 'Are the windows closed?',
            'q5-day1-ex1': 'Is this cupboard locked?',
            'q6-day1-ex1': 'Is his desk messy?',
            'q7-day1-ex1': 'Is she the CEO?',
            'q8-day1-ex1': 'Are you Jo\'s assistant?'
        };
        for (const id in answers) {
            document.getElementById(id).value = answers[id];
            document.getElementById(id).style.borderColor = '';
        }
        document.getElementById('feedback-ex1').textContent = '';
    });

    document.getElementById('check-ex2').addEventListener('click', () => {
        const answers = {
            'q1-day1-ex2': 'Is that John\'s pen?',
            'q2-day1-ex2': 'Is this the kitchen?',
            'q3-day1-ex2': 'Is that the CEO\'s office?',
            'q4-day1-ex2': 'Is Tina the CEO\'s PA?',
            'q5-day1-ex2': 'Is Tom\'s desk organized?',
            'q6-day1-ex2': 'Is the printer working?',
            'q7-day1-ex2': 'Is the stationery cabinet locked?'
        };
        let correctCount = 0;
        for (const id in answers) {
            const input = document.getElementById(id);
            if (input.value.trim().toLowerCase() === answers[id].toLowerCase()) {
                input.style.borderColor = 'green';
                correctCount++;
            } else {
                input.style.borderColor = 'red';
            }
        }
        const feedback = document.getElementById('feedback-ex2');
        feedback.textContent = `You got ${correctCount} out of ${Object.keys(answers).length} correct.`;
        feedback.style.color = correctCount === Object.keys(answers).length ? 'green' : 'red';
    });

    document.getElementById('show-ex2').addEventListener('click', () => {
        const answers = {
            'q1-day1-ex2': 'Is that John\'s pen?',
            'q2-day1-ex2': 'Is this the kitchen?',
            'q3-day1-ex2': 'Is that the CEO\'s office?',
            'q4-day1-ex2': 'Is Tina the CEO\'s PA?',
            'q5-day1-ex2': 'Is Tom\'s desk organized?',
            'q6-day1-ex2': 'Is the printer working?',
            'q7-day1-ex2': 'Is the stationery cabinet locked?'
        };
        for (const id in answers) {
            document.getElementById(id).value = answers[id];
            document.getElementById(id).style.borderColor = '';
        }
        document.getElementById('feedback-ex2').textContent = '';
    });

    document.getElementById('check-d1-ex3').addEventListener('click', () => {
        const correctAnswers = {
            'd1e3-q1': 'do',
            'd1e3-q2': 'does',
            'd1e3-q3': 'does',
            'd1e3-q4': 'do',
            'd1e3-q5': 'does',
            'd1e3-q6': 'do',
            'd1e3-q7': 'does',
            'd1e3-q8': 'do',
            'd1e3-q9': 'does',
            'd1e3-q10': 'do'
        };
        let correctCount = 0;
        const feedback = document.getElementById('feedback-d1-ex3');
        let allCorrect = true;
        for (const q in correctAnswers) {
            const radios = document.getElementsByName(q);
            let isCorrect = false;
            radios.forEach(radio => {
                const parentSpan = radio.closest('.fill-in-radio');
                if (radio.checked) {
                    if (radio.value === correctAnswers[q]) {
                        isCorrect = true;
                        parentSpan.style.border = '2px solid green';
                    } else {
                        parentSpan.style.border = '2px solid red';
                    }
                } else {
                    parentSpan.style.border = 'none';
                }
            });
            if (isCorrect) {
                correctCount++;
            } else {
                allCorrect = false;
            }
        }
        if (allCorrect) {
            feedback.textContent = `Correct! All answers are correct.`;
            feedback.style.color = 'green';
        } else {
            feedback.textContent = `You got ${correctCount} out of ${Object.keys(correctAnswers).length} correct.`;
            feedback.style.color = 'red';
        }
    });
    
    // Workbook Day 2 JavaScript
    const d2e1Questions = document.querySelectorAll('#questions-col-d2e1 .match-item');
    const d2e1Answers = document.querySelectorAll('#answers-col-d2e1 .match-item');
    let d2e1Selected = [];
    const d2e1Feedback = document.getElementById('feedback-d2-ex1');

    function handleMatchClick(e) {
        const item = e.target.closest('.match-item');
        if (!item || item.classList.contains('paired')) return;

        item.classList.toggle('selected');
        if (item.classList.contains('selected')) {
            d2e1Selected.push(item);
        } else {
            d2e1Selected = d2e1Selected.filter(el => el !== item);
        }

        if (d2e1Selected.length === 2) {
            checkPair();
        }
    }

    function checkPair() {
        const [item1, item2] = d2e1Selected;
        if (item1.dataset.pair === item2.dataset.pair) {
            const pairClass = `pair-${item1.dataset.pair.charCodeAt(0) - 'a'.charCodeAt(0)}`;
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
        d2e1Selected = [];
    }

    d2e1Questions.forEach(item => item.addEventListener('click', handleMatchClick));
    d2e1Answers.forEach(item => item.addEventListener('click', handleMatchClick));

    document.getElementById('check-d2-ex1').addEventListener('click', () => {
        const allPaired = document.querySelectorAll('#matching-game-container-d2e1 .match-item.paired').length;
        if (allPaired === d2e1Questions.length + d2e1Answers.length) {
            d2e1Feedback.textContent = 'Excellent! All pairs are correct.';
            d2e1Feedback.style.color = 'green';
        } else {
            d2e1Feedback.textContent = 'Not all pairs are correct. Keep trying!';
            d2e1Feedback.style.color = 'red';
        }
    });

    document.getElementById('check-d2-ex2').addEventListener('click', () => {
        const correctAnswers = {
            'd2e2-q1': 'Where',
            'd2e2-q2': 'How',
            'd2e2-q3': 'What',
            'd2e2-q4': 'Why',
            'd2e2-q5': 'When',
            'd2e2-q6': 'Where',
            'd2e2-q7': 'What',
            'd2e2-q8': 'Who'
        };
        let correctCount = 0;
        const feedback = document.getElementById('feedback-d2-ex2');
        for (const q in correctAnswers) {
            const radios = document.getElementsByName(q);
            radios.forEach(radio => {
                if (radio.checked) {
                    const parent = radio.closest('.options-group-inline');
                    if (radio.value === correctAnswers[q]) {
                        correctCount++;
                        parent.style.borderColor = 'green';
                    } else {
                        parent.style.borderColor = 'red';
                    }
                }
            });
        }
        feedback.textContent = `You got ${correctCount} out of ${Object.keys(correctAnswers).length} correct.`;
        feedback.style.color = correctCount === Object.keys(correctAnswers).length ? 'green' : 'red';
    });

    document.getElementById('check-d2-ex3').addEventListener('click', () => {
        let correctCount = 0;
        const feedback = document.getElementById('feedback-d2-ex3');
        const answers = {
            'd2e3-q1': 'correct',
            'd2e3-q2': 'correct',
            'd2e3-q3': 'correct',
            'd2e3-q4': 'correct',
            'd2e3-q5': 'correct',
            'd2e3-q6': 'correct',
            'd2e3-q7': 'correct',
            'd2e3-q8': 'correct'
        };
        let allCorrect = true;
        for (const q in answers) {
            const radios = document.getElementsByName(q);
            let isCorrect = false;
            radios.forEach(radio => {
                if (radio.checked) {
                    if (radio.value === answers[q]) {
                        isCorrect = true;
                    }
                }
            });
            if (isCorrect) {
                correctCount++;
            } else {
                allCorrect = false;
            }
        }
        if (allCorrect) {
            feedback.textContent = 'All answers are correct!';
            feedback.style.color = 'green';
        } else {
            feedback.textContent = `You got ${correctCount} out of ${Object.keys(answers).length} correct.`;
            feedback.style.color = 'red';
        }
    });

    // Drag and drop logic for D2 Ex 4
    const wordPool = document.getElementById('d2e4-word-pool');
    const dropZones = document.querySelectorAll('.drop-zone');
    const checkBtnD2E4 = document.getElementById('check-d2-ex4');
    const feedbackD2E4 = document.getElementById('feedback-d2-ex4');

    let draggedItem = null;

    wordPool.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('draggable-word')) {
            draggedItem = e.target;
            e.dataTransfer.setData('text/plain', e.target.dataset.word);
            setTimeout(() => e.target.style.display = 'none', 0);
        }
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (!zone.querySelector('.draggable-word')) {
                zone.classList.add('drag-over');
            }
        });

        zone.addEventListener('dragleave', (e) => {
            zone.classList.remove('drag-over');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            if (draggedItem && !zone.querySelector('.draggable-word')) {
                zone.appendChild(draggedItem);
                draggedItem.style.display = 'block';
                draggedItem = null;
            }
        });
    });

    checkBtnD2E4.addEventListener('click', () => {
        let correctCount = 0;
        let allFilled = true;
        dropZones.forEach(zone => {
            const word = zone.querySelector('.draggable-word');
            if (word) {
                if (word.dataset.word === zone.dataset.wordAnswer) {
                    zone.classList.add('correct');
                    zone.classList.remove('incorrect');
                    correctCount++;
                } else {
                    zone.classList.add('incorrect');
                    zone.classList.remove('correct');
                }
            } else {
                allFilled = false;
            }
        });

        if (allFilled && correctCount === dropZones.length) {
            feedbackD2E4.textContent = 'All answers are correct!';
            feedbackD2E4.style.color = 'green';
        } else {
            feedbackD2E4.textContent = `You got ${correctCount} out of ${dropZones.length} correct.`;
            feedbackD2E4.style.color = 'red';
        }
    });
    
    // Workbook Day 3 JavaScript
    document.getElementById('check-d3-ex1').addEventListener('click', () => {
        const correctAnswers = ['d3e1-q2', 'd3e1-q4', 'd3e1-q8', 'd3e1-q9'];
        const userAnswers = Array.from(document.querySelectorAll('#d3e1-ex1 input[type="checkbox"]:checked')).map(cb => cb.id);
        const allCorrect = correctAnswers.every(id => userAnswers.includes(id)) && userAnswers.every(id => correctAnswers.includes(id));
        const feedback = document.getElementById('feedback-d3-ex1');
        if (allCorrect) {
            feedback.textContent = 'Correct! You have found all the items.';
            feedback.style.color = 'green';
        } else {
            feedback.textContent = 'Incorrect. Please listen again and check your answers.';
            feedback.style.color = 'red';
        }
    });

    document.getElementById('check-d3-ex2').addEventListener('click', () => {
        const answers = {
            'd3e2-q1': 'repair',
            'd3e2-q2': 'discount',
            'd3e2-q3': 'charge',
            'd3e2-q4': 'special',
            'd3e2-q5': 'deliver'
        };
        let correctCount = 0;
        const feedback = document.getElementById('feedback-d3-ex2');
        for (const id in answers) {
            const input = document.getElementById(id);
            if (input.value.trim().toLowerCase() === answers[id].toLowerCase()) {
                correctCount++;
                input.style.borderColor = 'green';
            } else {
                input.style.borderColor = 'red';
            }
        }
        feedback.textContent = `You got ${correctCount} out of ${Object.keys(answers).length} correct.`;
        feedback.style.color = correctCount === Object.keys(answers).length ? 'green' : 'red';
    });

    const d3e3Questions = document.querySelectorAll('#d3e3-questions .match-item');
    const d3e3Replies = document.querySelectorAll('#d3e3-replies .match-item');
    let d3e3Selected = [];
    const d3e3Feedback = document.getElementById('feedback-d3-ex3');

    function handleD3E3MatchClick(e) {
        const item = e.target.closest('.match-item');
        if (!item || item.classList.contains('paired')) return;

        item.classList.toggle('selected');
        if (item.classList.contains('selected')) {
            d3e3Selected.push(item);
        } else {
            d3e3Selected = d3e3Selected.filter(el => el !== item);
        }

        if (d3e3Selected.length === 2) {
            checkD3E3Pair();
        }
    }

    function checkD3E3Pair() {
        const [item1, item2] = d3e3Selected;
        if (item1.dataset.pair === item2.dataset.pair) {
            const pairClass = `pair-${item1.dataset.pair.charCodeAt(0) - 'a'.charCodeAt(0)}`;
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
        d3e3Selected = [];
    }

    d3e3Questions.forEach(item => item.addEventListener('click', handleD3E3MatchClick));
    d3e3Replies.forEach(item => item.addEventListener('click', handleD3E3MatchClick));

    document.getElementById('check-d3-ex3').addEventListener('click', () => {
        const allPaired = document.querySelectorAll('#matching-game-container-d3e3 .match-item.paired').length;
        if (allPaired === d3e3Questions.length + d3e3Replies.length) {
            d3e3Feedback.textContent = 'Excellent! All pairs are correct.';
            d3e3Feedback.style.color = 'green';
        } else {
            d3e3Feedback.textContent = 'Not all pairs are correct. Keep trying!';
            d3e3Feedback.style.color = 'red';
        }
    });
});