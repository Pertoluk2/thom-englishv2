document.addEventListener('DOMContentLoaded', () => {

    // --- OEFENING 1: WOORDEN EN AFBEELDINGEN KOPPELEN ---
    const vocabularyData = [
        { name: 'morning', image: 'images/unit2/morning.png' },
        { name: 'noon', image: 'images/unit2/noon.png' },
        { name: 'afternoon', image: 'images/unit2/afternoon.png' },
        { name: 'evening', image: 'images/unit2/evening.png' },
        { name: 'midnight', image: 'images/unit2/midnight.png' },
        { name: 'breakfast', image: 'images/unit2/breakfast.png' },
        { name: 'lunch', image: 'images/unit2/lunch.png' },
        { name: 'dinner', image: 'images/unit2/dinner.png' }
    ];

    const wordbank1 = document.getElementById('u2-a1-wordbank');
    const container1 = document.getElementById('image-matching-container');
    const checkButton1 = document.getElementById('check-u2-a1');

    if (wordbank1 && container1 && checkButton1) {
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
            container1.appendChild(matchingItem);
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
            wordbank1.appendChild(wordDiv);
        });
        
        // 3. Voeg drop-logica toe
        const allDropTargets1 = [wordbank1, ...container1.querySelectorAll('.drop-zone')];
        allDropTargets1.forEach(target => {
            target.addEventListener('dragover', e => { e.preventDefault(); });
            target.addEventListener('drop', e => {
                e.preventDefault();
                const draggedId = e.dataTransfer.getData('text/plain');
                const draggedEl = document.getElementById(draggedId);
                
                if (target.classList.contains('drop-zone') && target.children.length > 0) {
                    wordbank1.appendChild(target.firstElementChild);
                }
                target.appendChild(draggedEl);
            });
        });

        // 4. Logica voor de controleknop
        checkButton1.addEventListener('click', () => {
            container1.querySelectorAll('.drop-zone').forEach(zone => {
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
    }

    // --- OEFENING 2: DAGEN VAN DE WEEK ORDENEN ---
    const correctOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    const pool = document.getElementById('u2-a2-pool');
    const dropzone = document.getElementById('u2-a2-dropzone');
    const checkButton2 = document.getElementById('check-u2-a2');
    const feedback2 = document.getElementById('feedback-u2-a2');

    if (pool && dropzone && checkButton2 && feedback2) {
        // 1. Vul de 'pool' met willekeurige dagen
        const shuffledDays = [...correctOrder].sort(() => Math.random() - 0.5);
        shuffledDays.forEach(day => {
            const dayTile = document.createElement('span');
            dayTile.className = 'draggable-word-tile';
            dayTile.textContent = day;
            dayTile.draggable = true;
            dayTile.id = `day-${day}`;
            dayTile.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.id);
            });
            pool.appendChild(dayTile);
        });

        // 2. Voeg drop-logica toe
        [pool, dropzone].forEach(zone => {
            zone.addEventListener('dragover', e => e.preventDefault());
            zone.addEventListener('drop', e => {
                e.preventDefault();
                const id = e.dataTransfer.getData('text/plain');
                const el = document.getElementById(id);
                zone.appendChild(el);
            });
        });

        // 3. Logica voor de controleknop
        checkButton2.addEventListener('click', () => {
            const userOrder = Array.from(dropzone.children).map(child => child.textContent);
            
            if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
                feedback2.textContent = "Chính xác! De volgorde is perfect.";
                feedback2.style.color = 'green';
            } else {
                feedback2.textContent = "Niet helemaal correct, probeer het opnieuw.";
                feedback2.style.color = 'red';
            }
        });
    }
});