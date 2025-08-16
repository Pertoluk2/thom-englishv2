document.addEventListener('DOMContentLoaded', () => {

    const vocabularyData = [
        { name: 'colleague', image: 'images/unit3/colleague.png' },
        { name: 'supervisor', image: 'images/unit3/supervisor.png' },
        { name: 'presentation', image: 'images/unit3/presentation.png' },
        { name: 'report', image: 'images/unit3/report.png' },
        { name: 'schedule', image: 'images/unit3/schedule.png' },
        { name: 'plan', image: 'images/unit3/plan.png' }
    ];

    const wordbank = document.getElementById('u3-a1-wordbank');
    const container = document.getElementById('image-matching-container');
    const checkButton = document.getElementById('check-u3-a1');

    if (!wordbank || !container || !checkButton) return;

    // 1. Maak de afbeeldingen en drop zones aan
    vocabularyData.forEach(item => {
        const matchingItem = document.createElement('div');
        matchingItem.className = 'matching-item';
        
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = `Image for ${item.name}`;

        const dropZone = document.createElement('div');
        dropZone.className = 'drop-zone';
        dropZone.dataset.correctAnswer = item.name;

        matchingItem.appendChild(img);
        matchingItem.appendChild(dropZone);
        container.appendChild(matchingItem);
    });

    // 2. Maak de sleepbare woorden in de wordbank
    const words = vocabularyData.map(item => item.name).sort(() => Math.random() - 0.5);
    words.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'draggable-word';
        wordDiv.textContent = word;
        wordDiv.draggable = true;
        wordDiv.id = `word-${word}`;
        wordDiv.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
        });
        wordbank.appendChild(wordDiv);
    });
    
    // 3. Voeg drop-logica toe
    const allDropTargets = [wordbank, ...container.querySelectorAll('.drop-zone')];
    allDropTargets.forEach(target => {
        target.addEventListener('dragover', e => { e.preventDefault(); });
        target.addEventListener('drop', e => {
            e.preventDefault();
            const draggedId = e.dataTransfer.getData('text/plain');
            const draggedEl = document.getElementById(draggedId);
            
            if (target.classList.contains('drop-zone') && target.children.length > 0) {
                wordbank.appendChild(target.firstElementChild);
            }
            target.appendChild(draggedEl);
        });
    });

    // 4. Logica voor de controleknop
    checkButton.addEventListener('click', () => {
        container.querySelectorAll('.drop-zone').forEach(zone => {
            zone.classList.remove('correct', 'incorrect');
            const correctAnswer = zone.dataset.correctAnswer;
            const droppedWordEl = zone.firstElementChild;

            if (droppedWordEl && droppedWordEl.textContent === correctAnswer) {
                zone.classList.add('correct');
            } else {
                zone.classList.add('incorrect');
            }
        });
    });
});