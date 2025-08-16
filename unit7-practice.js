document.addEventListener('DOMContentLoaded', () => {

    /**
     * HERBRUIKBARE FUNCTIE VOOR SLEEP-OEFENINGEN
     * Deze functie zet een sleep-en-neerzet oefening op.
     */
    function setupDragAndDropExercise(config) {
        const wordbank = document.getElementById(config.wordbankId);
        const container = document.getElementById(config.containerId);
        const checkButton = document.getElementById(config.checkButtonId);
        const dropZones = container.querySelectorAll('.drop-zone');

        if (!wordbank || !container || !checkButton) return;

        // Maak de woordenlijst, inclusief het extra woord, en schud ze.
        const words = [...config.answers, config.distractorWord].sort(() => Math.random() - 0.5);

        // Vul de wordbank met sleepbare woorden
        words.forEach(word => {
            const wordDiv = document.createElement('div');
            wordDiv.className = 'draggable-word';
            wordDiv.textContent = word;
            wordDiv.draggable = true;
            wordDiv.id = `word-${word}-${Math.random()}`; // Uniek ID
            wordDiv.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.id);
            });
            wordbank.appendChild(wordDiv);
        });

        const allDropTargets = [wordbank, ...dropZones];

        allDropTargets.forEach(target => {
            target.addEventListener('dragover', (e) => {
                e.preventDefault(); // Noodzakelijk om 'drop' te laten werken
                if (target.classList.contains('drop-zone')) {
                    target.classList.add('drag-over');
                }
            });
            target.addEventListener('dragleave', (e) => {
                if (target.classList.contains('drop-zone')) {
                    target.classList.remove('drag-over');
                }
            });
            target.addEventListener('drop', (e) => {
                e.preventDefault();
                if (target.classList.contains('drop-zone')) {
                    target.classList.remove('drag-over');
                }
                const draggedId = e.dataTransfer.getData('text/plain');
                const draggedEl = document.getElementById(draggedId);

                // Als er al een woord in de dropzone zit, stuur het terug naar de wordbank
                if (target.classList.contains('drop-zone') && target.children.length > 0) {
                    wordbank.appendChild(target.firstElementChild);
                }
                
                target.appendChild(draggedEl);
            });
        });

        // Logica voor de controleknop
        checkButton.addEventListener('click', () => {
            dropZones.forEach(zone => {
                zone.classList.remove('correct', 'incorrect');
                const zoneIndex = parseInt(zone.dataset.index, 10);
                const correctAnswer = config.answers[zoneIndex];
                const droppedWordEl = zone.firstElementChild;

                if (droppedWordEl && droppedWordEl.textContent === correctAnswer) {
                    zone.classList.add('correct');
                } else {
                    zone.classList.add('incorrect');
                }
            });
        });
    }

    // --- Oefening 1: Configuratie ---
    setupDragAndDropExercise({
        containerId: 'u7-c1-container',
        wordbankId: 'u7-c1-wordbank',
        checkButtonId: 'check-u7-c1',
        answers: [
            "salesperson", "deadlines", "colleagues", "along", "6 months",
            "salary", "benefits", "vacation", "meeting", "co-workers"
        ],
        distractorWord: "report" // Extra woord dat nergens past
    });

    // --- Oefening 2: Configuratie (NU IN HET ENGELS) ---
    const dialogueContainer = document.getElementById('u7-c2-container');
    if (dialogueContainer) {
        // We moeten de HTML hier dynamisch aanpassen, omdat de configuratiefunctie geen HTML genereert.
        dialogueContainer.innerHTML = `
            <p><b>Manager (A):</b> Welcome! Let me introduce you to a few departments. This is the <strong>Human Resources</strong> department.</p>
            <p><b>Employee (B):</b> What are they in charge of?</p>
            <p><b>Manager (A):</b> They handle (1) <span class="drop-zone" data-index="0"></span> new employees.</p>
            <p><b>Employee (B):</b> I see. And what does the (2) <span class="drop-zone" data-index="1"></span> department do?</p>
            <p><b>Manager (A):</b> They are responsible for (3) <span class="drop-zone" data-index="2"></span> our products.</p>
            <p><b>Employee (B):</b> Great! Thank you.</p>
            <p><b>Manager (A):</b> You're welcome. If you have any computer issues, you should contact the (4) <span class="drop-zone" data-index="3"></span> department.</p>
        `;
    }

    setupDragAndDropExercise({
        containerId: 'u7-c2-container',
        wordbankId: 'u7-c2-wordbank',
        checkButtonId: 'check-u7-c2',
        answers: ["hiring", "Marketing", "promoting", "IT"],
        distractorWord: "invoice" // Extra woord in het Engels
    });

});