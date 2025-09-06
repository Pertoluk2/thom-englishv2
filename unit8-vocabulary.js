document.addEventListener('DOMContentLoaded', () => {
    // --- OEFENING 1: KANTOORARTIKELEN SLEPEN (AFBEELDINGEN) ---
    (() => {
        const imageData = [
            { name: 'laptop', image: 'images/unit8/laptop.png' },
            { name: 'tablet', image: 'images/unit8/tablet.png' },
            { name: 'screen', image: 'images/unit8/screen.png' },
            { name: 'monitor', image: 'images/unit8/monitor.png' },
            { name: 'mouse', image: 'images/unit8/mouse.png' },
            { name: 'keyboard', image: 'images/unit8/keyboard.png' },
            { name: 'computer', image: 'images/unit8/computer.png' },
            { name: 'photocopier', image: 'images/unit8/photocopier.png' },
            { name: 'telephone / phone', image: 'images/unit8/telephone.png' },
            { name: 'printer', image: 'images/unit8/printer.png' },
            { name: 'projector', image: 'images/unit8/projector.png' },
            { name: 'shredder', image: 'images/unit8/shredder.png' },
            { name: 'scanner', image: 'images/unit8/scanner.png' },
            { name: 'USB / flash drive', image: 'images/unit8/usb-flash-drive.png' },
            { name: 'hard drive', image: 'images/unit8/hard-drive.png' },
            { name: 'headset', image: 'images/unit8/headset.png' },
            { name: 'cell phone / mobile phone', image: 'images/unit8/cell-mobile-phone.png' }
        ];

        const wordbank = document.getElementById('u8-a1-wordbank');
        const container = document.getElementById('u8-a1-container');
        const checkButton = document.getElementById('check-u8-a1');
        const feedback = document.getElementById('feedback-u8-a1');

        if (!wordbank || !container || !checkButton) return;

        function initializeExercise() {
            wordbank.innerHTML = '';
            container.innerHTML = '';
            feedback.textContent = '';

            const shuffledImages = [...imageData].sort(() => Math.random() - 0.5);
            const words = imageData.map(item => item.name).sort(() => Math.random() - 0.5);
            
            // Maak de afbeeldingen met de drop-zones
            shuffledImages.forEach(item => {
                const matchingItem = document.createElement('div');
                matchingItem.className = 'matching-item';
                matchingItem.innerHTML = `
                    <img src="${item.image}" alt="Image for ${item.name}">
                    <div class="drop-zone" data-correct-answer="${item.name}"></div>
                `;
                container.appendChild(matchingItem);
            });

            // Maak de woordenbank
            words.forEach(word => {
                const wordDiv = document.createElement('div');
                wordDiv.className = 'draggable-word';
                wordDiv.textContent = word;
                wordDiv.draggable = true;
                wordDiv.id = `word1-${word.replace(/[\s/]/g, '-')}`;
                wordDiv.addEventListener('dragstart', e => e.dataTransfer.setData('text/plain', e.target.id));
                wordbank.appendChild(wordDiv);
            });

            const allDropTargets = [wordbank, ...container.querySelectorAll('.drop-zone')];
            allDropTargets.forEach(target => {
                target.addEventListener('dragover', e => {
                    e.preventDefault();
                    target.classList.add('drag-over');
                });
                target.addEventListener('dragleave', e => {
                    target.classList.remove('drag-over');
                });
                target.addEventListener('drop', e => {
                    e.preventDefault();
                    target.classList.remove('drag-over');
                    const id = e.dataTransfer.getData('text/plain');
                    const el = document.getElementById(id);
                    
                    if (target.children.length > 0 && target.classList.contains('drop-zone')) {
                        wordbank.appendChild(target.firstElementChild);
                    }
                    
                    target.appendChild(el);
                });
            });
        }

        checkButton.addEventListener('click', () => {
            let allCorrect = true;
            container.querySelectorAll('.drop-zone').forEach(zone => {
                const dropped = zone.firstElementChild;
                if (dropped && dropped.textContent.trim() === zone.dataset.correctAnswer.trim()) {
                    zone.classList.add('correct');
                    zone.classList.remove('incorrect');
                } else {
                    zone.classList.add('incorrect');
                    zone.classList.remove('correct');
                    allCorrect = false;
                }
            });

            if(allCorrect) {
                feedback.textContent = "Tuyệt vời! Tất cả các câu trả lời đều đúng.";
                feedback.style.color = "green";
            } else {
                feedback.textContent = "Có lỗi trong câu trả lời. Vui lòng thử lại.";
                feedback.style.color = "red";
            }
        });

        initializeExercise();
    })();
});