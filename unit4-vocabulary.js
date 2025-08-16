document.addEventListener('DOMContentLoaded', () => {

    const transportationData = [
        { name: 'bike', image: 'images/unit4/bike.png' },
        { name: 'motorbike', image: 'images/unit4/motorbike.png' },
        { name: 'taxi', image: 'images/unit4/taxi.png' },
        { name: 'car', image: 'images/unit4/car.png' },
        { name: 'bus', image: 'images/unit4/bus.png' },
        { name: 'van', image: 'images/unit4/van.png' },
        { name: 'lorry', image: 'images/unit4/lorry.png' },
        { name: 'airplane', image: 'images/unit4/airplane.png' },
        { name: 'ship', image: 'images/unit4/ship.png' },
        { name: 'boat', image: 'images/unit4/boat.png' },
        { name: 'train', image: 'images/unit4/train.png' },
        { name: 'scooter', image: 'images/unit4/scooter.png' } // AANGEPAST
    ];

    const wordbank = document.getElementById('u4-a1-wordbank');
    const container = document.getElementById('image-matching-container');
    const checkButton = document.getElementById('check-u4-a1');

    if (!wordbank || !container || !checkButton) return;

    // 1. Maak de afbeeldingen en drop zones aan
    transportationData.forEach(item => {
        const matchingItem = document.createElement('div');
        matchingItem.className = 'matching-item';
        
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = `Image of a ${item.name}`;

        const dropZone = document.createElement('div');
        dropZone.className = 'drop-zone';
        dropZone.dataset.correctAnswer = item.name;

        matchingItem.appendChild(img);
        matchingItem.appendChild(dropZone);
        container.appendChild(matchingItem);
    });

    // 2. Maak de sleepbare woorden in de wordbank
    const words = transportationData.map(item => item.name).sort(() => Math.random() - 0.5);
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