document.addEventListener('DOMContentLoaded', () => {
    // --- DAY 1, EXERCISE 1: Drag and Drop ---
    (() => {
        const sentences = [
            { start: "I always have breakfast in the ", end: ".", answer: "morning" },
            { start: "The meeting is scheduled for ", end: ".", answer: "Monday" },
            { start: "She usually goes to the gym in the ", end: ".", answer: "afternoon" },
            { start: "___ is my favorite day of the week because it's almost the weekend.", end: "", answer: "Friday" },
            { start: "We often watch TV together in the ", end: ".", answer: "evening" }
        ];

        const wordbank = document.getElementById('u2wb-d1-e1-wordbox');
        const container = document.getElementById('u2wb-d1-e1-container');
        const checkButton = document.getElementById('check-u2wb-d1-e1');

        if (!wordbank || !container || !checkButton) return;
        
        const words = sentences.map(s => s.answer);
        
        // Bouw de zinnen met drop zones
        sentences.forEach((data, index) => {
            const sentenceDiv = document.createElement('div');
            sentenceDiv.className = 'sentence';
            let html = `${index + 1}. ${data.start} <span class="drop-zone" data-answer="${data.answer}"></span> ${data.end}`;
            if (data.start === "") { // Speciaal voor de 'Friday' zin
                 html = `${index + 1}. <span class="drop-zone" data-answer="${data.answer}"></span> ${data.end} is my favorite day of the week because it's almost the weekend.`;
            }
            sentenceDiv.innerHTML = html;
            container.appendChild(sentenceDiv);
        });

        // Vul de wordbank
        words.sort(() => Math.random() - 0.5).forEach(word => {
            const wordDiv = document.createElement('div');
            wordDiv.className = 'draggable-word';
            wordDiv.textContent = word;
            wordDiv.draggable = true;
            wordDiv.id = `u2wb-d1-${word}`;
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