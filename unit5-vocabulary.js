document.addEventListener('DOMContentLoaded', () => {

    // --- OEFENING 1: SLEEPOEFENING (AFBEELDINGEN) ---
    (() => {
        const imageData = [
            { name: 'coin', image: 'images/unit5/coin.png' },
            { name: 'cash', image: 'images/unit5/cash.png' },
            { name: 'credit card', image: 'images/unit5/credit-card.png' },
            { name: 'check', image: 'images/unit5/check.png' },
            { name: 'receipt', image: 'images/unit5/receipt.png' },
            { name: 'wallet', image: 'images/unit5/wallet.png' },
            { name: 'cashier', image: 'images/unit5/cashier.png' },
            { name: 'discount', image: 'images/unit5/discount.png' }
        ];
        const wordbank = document.getElementById('u5-a1-wordbank');
        const container = document.getElementById('u5-a1-container');
        const checkButton = document.getElementById('check-u5-a1');

        if (!wordbank || !container || !checkButton) return;

        imageData.forEach(item => {
            const matchingItem = document.createElement('div');
            matchingItem.className = 'matching-item';
            matchingItem.innerHTML = `
                <img src="${item.image}" alt="Image for ${item.name}">
                <div class="drop-zone" data-correct-answer="${item.name}"></div>
            `;
            container.appendChild(matchingItem);
        });

        const words = imageData.map(item => item.name).sort(() => Math.random() - 0.5);
        words.forEach(word => {
            const wordDiv = document.createElement('div');
            wordDiv.className = 'draggable-word';
            wordDiv.textContent = word;
            wordDiv.draggable = true;
            wordDiv.id = `word1-${word.replace(' ', '-')}`;
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
                const dropped = zone.firstElementChild;
                if (dropped && dropped.textContent === zone.dataset.correctAnswer) {
                    zone.classList.add('correct');
                } else {
                    zone.classList.add('incorrect');
                }
            });
        });
    })();

    // --- OEFENING 2: KLIK EN VUL IN (ZINNEN) ---
    (() => {
        const sentenceData = [
            { sentence: "Please keep the ___ so you can return the item if you don't like it.", answer: "receipt" },
            { sentence: "This jacket is on sale for $79.99. It originally cost $120, but there's a 30% ___ today.", answer: "discount" },
            { sentence: "___ allows people to easily manage their accounts through bank's websites or apps.", answer: "online banking" },
            { sentence: "At the store, if you don't bring cash, you can pay with either a ___ or ___.", answer: "credit card" },
            { sentence: "I went to the ___ to withdraw money.", answer: "cash machine" },
            { sentence: "I wrote a ___ to pay for my rent last week.", answer: "check" }
        ];
        const words = ["receipt", "discount", "online banking", "credit card", "cash machine", "check"];
        
        const wordbox = document.getElementById('u5-a2-wordbank');
        const container = document.getElementById('u5-a2-container');
        const checkButton = document.getElementById('check-u5-a2');
        const feedback = document.getElementById('feedback-u5-a2');
        let activeInput = null;

        if (!wordbox || !container || !checkButton) return;

        // Vul de wordbox
        words.sort(() => Math.random() - 0.5).forEach(word => {
            const choiceDiv = document.createElement('div');
            choiceDiv.className = 'choice-word';
            choiceDiv.textContent = word;
            choiceDiv.addEventListener('click', () => {
                if(activeInput) {
                    activeInput.value = word;
                    activeInput.classList.remove('active');
                    activeInput = null;
                }
            });
            wordbox.appendChild(choiceDiv);
        });
        
        // Bouw de zinnen
        let inputIndex = 0;
        sentenceData.forEach((data, index) => {
            const sentenceDiv = document.createElement('div');
            sentenceDiv.className = 'sentence';
            let html = data.sentence;
            while(html.includes('___')) {
                html = html.replace('___', `<input type="text" id="ans2-${inputIndex}" class="fill-in-input" readonly>`);
                inputIndex++;
            }
            sentenceDiv.innerHTML = `${index + 1}. ${html}`;
            container.appendChild(sentenceDiv);
        });

        container.querySelectorAll('.fill-in-input').forEach(input => {
            input.addEventListener('click', () => {
                if(activeInput) activeInput.classList.remove('active');
                activeInput = input;
                activeInput.classList.add('active');
            });
        });

        checkButton.addEventListener('click', () => {
            let correctCount = 0;
            // Omdat de 4e zin twee antwoorden heeft, is een simpele check lastiger.
            // Voor nu houden we het simpel en checken we de zinnen met één antwoord.
            alert("Controle-functie voor deze specifieke oefening is nog in ontwikkeling. Probeer de sleep-oefening!");
            feedback.textContent = "Check-functie nog niet geïmplementeerd.";
        });
    })();
});