document.addEventListener('DOMContentLoaded', () => {

    // --- OEFENING 1: MEERKEUZE (VERB FORM) ---
    (() => {
        const quizData = [
            { question: "She (check/checks) her emails every morning before starting her tasks.", answer: "checks" },
            { question: "They (attend/attends) a weekly team meeting every Monday.", answer: "attend" },
            { question: "The manager (review/reviews) the project reports at the end of the day.", answer: "reviews" },
            { question: "We (prepare/prepares) the marketing plans for the upcoming campaigns every Friday.", answer: "prepare" },
            { question: "He (coordinate/coordinates) with the IT department to fix system issues regularly.", answer: "coordinates" }
        ];
        const container = document.getElementById('u3-b1-container');
        const checkButton = document.getElementById('check-u3-b1');
        const feedback = document.getElementById('feedback-u3-b1');

        if (!container || !checkButton) return;

        quizData.forEach((data, index) => {
            const questionBlock = document.createElement('div');
            questionBlock.className = 'question-block';
            const options = data.question.match(/\(([^)]+)\)/)[1].split('/');
            const sentence = data.question.replace(/\s*\([^)]+\)\s*/, ' ___ ');

            let optionsHTML = '';
            options.forEach(opt => {
                optionsHTML += `<label><input type="radio" name="q1_${index}" value="${opt}"> ${opt}</label>`;
            });

            questionBlock.innerHTML = `<p class="question-text">${index + 1}. ${sentence.replace('___', `<div class="options-group">${optionsHTML}</div>`)}</p>`;
            container.appendChild(questionBlock);
        });

        checkButton.addEventListener('click', () => {
            let correctCount = 0;
            quizData.forEach((data, index) => {
                const block = container.children[index];
                block.classList.remove('correct-q', 'incorrect-q');
                const selected = document.querySelector(`input[name="q1_${index}"]:checked`);
                if (selected && selected.value === data.answer) {
                    correctCount++;
                    block.classList.add('correct-q');
                } else {
                    block.classList.add('incorrect-q');
                }
            });
            feedback.textContent = `Bạn đã trả lời đúng ${correctCount} trên ${quizData.length} câu!`;
        });
    })();

    // --- OEFENING 2: INVULOEFENING (VERB FORM) ---
    (() => {
        const fillInData = [
            { sentence: "his workday at 8:30 AM every day.", verb: "start", answer: "starts" },
            { sentence: "a quick stand-up meeting every morning.", verb: "have", answer: "has" },
            { sentence: "reports to summarize the daily progress.", verb: "write", answer: "write" },
            { sentence: "customer inquiries via email during her shift.", verb: "handle", answer: "handles" },
            { sentence: "project deadlines every week.", verb: "review", answer: "review" },
            { sentence: "feedback after we submit our reports.", verb: "give", answer: "gives" },
            { sentence: "a time-tracking tool to monitor our work hours.", verb: "use", answer: "use" },
            { sentence: "the meeting agenda before it begins.", verb: "print", answer: "prints" }
        ];
        const subjects = ["He", "The team", "I", "She", "They", "Our manager", "We", "The assistant"];
        const container = document.getElementById('u3-b2-container');
        const checkButton = document.getElementById('check-u3-b2');
        
        if (!container || !checkButton) return;

        fillInData.forEach((data, index) => {
            const sentenceDiv = document.createElement('div');
            sentenceDiv.className = 'sentence';
            sentenceDiv.innerHTML = `${index + 1}. (${data.verb}) ${subjects[index]} <input type="text" class="fill-in-input-small" id="u3-b2-ans-${index}"> ${data.sentence}`;
            container.appendChild(sentenceDiv);
        });

        checkButton.addEventListener('click', () => {
            fillInData.forEach((data, index) => {
                const input = document.getElementById(`u3-b2-ans-${index}`);
                if (input.value.trim().toLowerCase() === data.answer) {
                    input.style.borderBottomColor = 'green';
                } else {
                    input.style.borderBottomColor = 'red';
                }
            });
        });
    })();
    
    // --- OEFENING 3: SLEEPOEFENING (ADVERBS OF FREQUENCY) ---
    (() => {
        const sentences = [
            { sentence: "She ___ checks her schedule before starting her day.", answer: "always" },
            { sentence: "We ___ have lunch together at the office cafeteria.", answer: "often" },
            { sentence: "He ___ misses deadlines because he is very organized.", answer: "rarely" },
            { sentence: "I ___ work overtime when there is an important project.", answer: "sometimes" },
            { sentence: "The manager ___ reviews the sales reports every Friday.", answer: "usually" },
            { sentence: "We ___ get coffee from the nearby shop during breaks.", answer: "never" }
        ];
        const wordbank = document.getElementById('u3-b3-wordbank');
        const container = document.getElementById('u3-b3-container');
        const checkButton = document.getElementById('check-u3-b3');

        if (!wordbank || !container || !checkButton) return;
        
        const adverbs = sentences.map(s => s.answer);
        
        // Bouw de zinnen met drop zones
        sentences.forEach((data, index) => {
            const sentenceDiv = document.createElement('div');
            sentenceDiv.className = 'sentence';
            sentenceDiv.innerHTML = `${index + 1}. ${data.sentence.replace('___', `<span class="drop-zone" data-answer="${data.answer}"></span>`)}`;
            container.appendChild(sentenceDiv);
        });

        // Vul de wordbank
        adverbs.sort(() => Math.random() - 0.5).forEach(adv => {
            const wordDiv = document.createElement('div');
            wordDiv.className = 'draggable-word';
            wordDiv.textContent = adv;
            wordDiv.draggable = true;
            wordDiv.id = `adv-${adv}`;
            wordDiv.addEventListener('dragstart', e => e.dataTransfer.setData('text/plain', e.target.id));
            wordbank.appendChild(wordDiv);
        });

        // Drop logica
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

        // Check logica
        checkButton.addEventListener('click', () => {
            container.querySelectorAll('.drop-zone').forEach(zone => {
                zone.classList.remove('correct', 'incorrect');
                const droppedWord = zone.firstElementChild ? zone.firstElementChild.textContent : '';
                if (droppedWord === zone.dataset.answer) {
                    zone.classList.add('correct');
                } else {
                    zone.classList.add('incorrect');
                }
            });
        });
    })();
});