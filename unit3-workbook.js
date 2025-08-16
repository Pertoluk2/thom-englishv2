document.addEventListener('DOMContentLoaded', () => {

    // --- DAY 1, EXERCISE 1: DRAG & DROP ---
    (() => {
        const sentences = [
            { text: "We ___ a meeting everyday.", answer: "have" },
            { text: "She ___ a secretary.", answer: "has" },
            { text: "She ___ by train everyday.", answer: "travels" },
            { text: "The manager always ___ coffee before working.", answer: "drinks" },
            { text: "She often ___ lunch at a local restaurant with her colleagues.", answer: "is" } // PDF lijkt hier een fout te hebben, 'is' past niet. 'eats' zou logischer zijn. We gebruiken 'is' volgens de PDF.
        ];
        const wordbank = document.getElementById('u3wb-d1-e1-wordbox');
        const container = document.getElementById('u3wb-d1-e1-container');
        const checkButton = document.getElementById('check-u3wb-d1-e1');
        if (!wordbank || !container || !checkButton) return;
        
        const words = ["has", "is", "drinks", "have", "travels"]; // 'leaves' wordt niet gebruikt in de zinnen
        
        sentences.forEach((data, index) => {
            const sentenceDiv = document.createElement('div');
            sentenceDiv.className = 'sentence';
            sentenceDiv.innerHTML = `${index + 1}. ${data.text.replace('___', `<span class="drop-zone" data-answer="${data.answer}"></span>`)}`;
            container.appendChild(sentenceDiv);
        });

        words.sort(() => Math.random() - 0.5).forEach(word => {
            const wordDiv = document.createElement('div');
            wordDiv.className = 'draggable-word';
            wordDiv.textContent = word;
            wordDiv.draggable = true;
            wordDiv.id = `d1e1-${word}`;
            wordDiv.addEventListener('dragstart', e => e.dataTransfer.setData('text/plain', e.target.id));
            wordbank.appendChild(wordDiv);
        });

        const allDropTargets = [wordbank, ...container.querySelectorAll('.drop-zone')];
        allDropTargets.forEach(target => {
            target.addEventListener('dragover', e => e.preventDefault());
            target.addEventListener('drop', e => {
                e.preventDefault();
                const id = e.dataTransfer.getData('text/plain');
                const el = document.getElementById(id);
                if (target.children.length > 0 && target.classList.contains('drop-zone')) {
                    wordbank.appendChild(target.firstElementChild);
                }
                target.appendChild(el);
            });
        });

        checkButton.addEventListener('click', () => {
            container.querySelectorAll('.drop-zone').forEach(zone => {
                zone.classList.remove('correct', 'incorrect');
                const dropped = zone.firstElementChild ? zone.firstElementChild.textContent : '';
                if (dropped === zone.dataset.answer) {
                    zone.classList.add('correct');
                } else {
                    zone.classList.add('incorrect');
                }
            });
        });
    })();

    // --- DAY 1, EXERCISE 2: MULTIPLE CHOICE ---
    (() => {
        const questions = [
            { sentence: "They (make / makes) tea and coffee before the team meeting every Friday.", answer: "make" },
            { sentence: "The head of marketing (speak / speaks) for about an hour at every team meeting.", answer: "speaks" },
            { sentence: "The photocopier (stops / stop) working if we don't load the paper carefully.", answer: "stops" },
            { sentence: "The owners of the hotel (visit / visits) it at the end of every month.", answer: "visit" },
            { sentence: "The cleaner (start / starts) working at 6am every day.", answer: "starts" }
        ];
        const container = document.getElementById('u3wb-d1-e2-container');
        const checkButton = document.getElementById('check-u3wb-d1-e2');
        if (!container || !checkButton) return;

        questions.forEach((data, index) => {
            const block = document.createElement('div');
            block.className = 'question-block';
            const options = data.sentence.match(/\(([^)]+)\)/)[1].split(' / ');
            const mainText = data.sentence.replace(/\s*\([^)]+\)\s*/, ' ___ ');

            let optionsHTML = '';
            options.forEach(opt => {
                optionsHTML += `<label><input type="radio" name="d1e2_q${index}" value="${opt}"> ${opt}</label>`;
            });

            block.innerHTML = `<p class="question-text">${index + 1}. ${mainText.replace('___', `<span class="options-group-inline">${optionsHTML}</span>`)}</p>`;
            container.appendChild(block);
        });

        checkButton.addEventListener('click', () => {
            questions.forEach((data, index) => {
                const block = container.children[index];
                block.classList.remove('correct-q', 'incorrect-q');
                const selected = document.querySelector(`input[name="d1e2_q${index}"]:checked`);
                if (selected && selected.value === data.answer) {
                    block.classList.add('correct-q');
                } else {
                    block.classList.add('incorrect-q');
                }
            });
        });
    })();

    // --- GENERIC MATCHING GAME LOGIC ---
    function setupMatchingGame(config) {
        const container = document.getElementById(config.containerId);
        const checkBtn = document.getElementById(config.checkButtonId);
        const resetBtn = document.getElementById(config.resetButtonId);
        if (!container || !checkBtn || !resetBtn) return;

        let selectedLeft = null;
        let userPairs = {};

        function initialize() {
            userPairs = {};
            selectedLeft = null;
            container.innerHTML = `<div id="${config.leftColId}" class="questions-col"></div><div id="${config.rightColId}" class="answers-col"></div>`;
            const leftCol = document.getElementById(config.leftColId);
            const rightCol = document.getElementById(config.rightColId);

            config.pairs.forEach(pair => {
                const leftItem = document.createElement('div');
                leftItem.className = 'match-item';
                leftItem.textContent = pair.left;
                leftItem.dataset.id = pair.id;
                leftCol.appendChild(leftItem);
            });

            const shuffledRight = [...config.pairs].sort(() => Math.random() - 0.5);
            shuffledRight.forEach(pair => {
                const rightItem = document.createElement('div');
                rightItem.className = 'match-item';
                rightItem.textContent = pair.right;
                rightItem.dataset.id = pair.id;
                rightCol.appendChild(rightItem);
            });

            container.addEventListener('click', handleSelection);
        }

        function handleSelection(e) {
            if (!e.target.classList.contains('match-item')) return;
            const item = e.target;
            const id = item.dataset.id;
            const isLeft = item.parentElement.id === config.leftColId;

            if (isLeft) {
                if (item.classList.contains('paired')) return;
                if (selectedLeft) selectedLeft.classList.remove('selected');
                selectedLeft = item;
                item.classList.add('selected');
            } else { // Is right
                if (!selectedLeft || item.classList.contains('paired')) return;

                // Clear previous pairings for this selection
                Object.keys(userPairs).forEach(key => {
                    if (userPairs[key] === id) delete userPairs[key];
                });
                const oldRightId = userPairs[selectedLeft.dataset.id];
                delete userPairs[selectedLeft.dataset.id];

                // Remove visual pairing classes
                document.querySelectorAll(`[data-id="${oldRightId}"], [data-id="${selectedLeft.dataset.id}"]`).forEach(el => el.className = 'match-item');
                
                // Set new pairing
                userPairs[selectedLeft.dataset.id] = id;
                const pairIndex = Object.keys(userPairs).length;
                selectedLeft.className = `match-item paired pair-${pairIndex}`;
                item.className = `match-item paired pair-${pairIndex}`;
                selectedLeft = null;
            }
        }
        
        checkBtn.addEventListener('click', () => {
            container.querySelectorAll('.match-item').forEach(el => el.classList.remove('correct', 'incorrect'));
            for(const leftId in userPairs) {
                const rightId = userPairs[leftId];
                const isCorrect = leftId === rightId;
                const leftEl = document.querySelector(`#${config.leftColId} [data-id="${leftId}"]`);
                const rightEl = document.querySelector(`#${config.rightColId} [data-id="${rightId}"]`);
                if (isCorrect) {
                    leftEl.classList.add('correct');
                    rightEl.classList.add('correct');
                } else {
                    leftEl.classList.add('incorrect');
                    rightEl.classList.add('incorrect');
                }
            }
        });

        resetBtn.addEventListener('click', initialize);
        initialize();
    }

    // --- DAY 2, EXERCISE 3: MATCHING WORD PARTNERS ---
    setupMatchingGame({
        containerId: 'u3wb-d2-e3-container',
        checkButtonId: 'check-u3wb-d2-e3',
        resetButtonId: 'reset-u3wb-d2-e3',
        leftColId: 'u3wb_d2e3_left',
        rightColId: 'u3wb_d2e3_right',
        pairs: [
            { id: 1, left: "1. personal", right: "D. assistant" },
            { id: 2, left: "2. responsible", right: "E. for" },
            { id: 3, left: "3. take the", right: "C. minutes" },
            { id: 4, left: "4. look", right: "F. after" },
            { id: 5, left: "5. reply", right: "B. to" },
            { id: 6, left: "6. deal", right: "A. with" }
        ]
    });

    // --- DAY 3, EXERCISE 1: MATCHING SENTENCE HALVES ---
    setupMatchingGame({
        containerId: 'u3wb-d3-e1-container',
        checkButtonId: 'check-u3wb-d3-e1',
        resetButtonId: 'reset-u3wb-d3-e1',
        leftColId: 'u3wb_d3e1_left',
        rightColId: 'u3wb_d3e1_right',
        pairs: [
            { id: 1, left: "1. I'm responsible", right: "E. for my boss's appointments." },
            { id: 2, left: "2. My colleague makes", right: "D. my flight reservations." },
            { id: 3, left: "3. The receptionist looks", right: "A. after visitors to the company." },
            { id: 4, left: "4. I always reply", right: "C. to my emails." },
            { id: 5, left: "5. I don't answer", right: "B. my work mobile after 6 o'clock." }
        ]
    });

});