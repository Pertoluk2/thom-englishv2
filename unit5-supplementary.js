document.addEventListener('DOMContentLoaded', () => {

    // --- OEFENING 1: SLEEPOEFENING ---
    (() => {
        const sentences = [
            { sentence: `"Buy one, get one free" is a common example of a ___.`, answer: "special offer" },
            { sentence: `If you think something is a ___, you think it's a good price for what you are getting.`, answer: "bargain" },
            { sentence: `The ___ tells you how much something costs in a shop.`, answer: "price tag" },
            { sentence: `When a shop has a ___, it sells some of its items at lower prices.`, answer: "sale" },
            { sentence: `If a shop gives you a ___, you pay less than the usual price.`, answer: "discount" },
            { sentence: `Magazines sometimes have ___ that give you money off in a shop.`, answer: "coupons" },
            { sentence: `If you ask for a ___ in a shop, you ask for your money back.`, answer: "refund" },
            { sentence: `A ___ is a small piece of paper that you get when you pay for something.`, answer: "receipt" },
            { sentence: `Could you lower the price for a ___?`, answer: "bulk order" }
        ];
        const wordbank = document.getElementById('u5-s1-wordbank');
        const container = document.getElementById('u5-s1-container');
        const checkButton = document.getElementById('check-u5-s1');

        if (!wordbank || !container || !checkButton) return;
        
        const words = sentences.map(s => s.answer);
        
        sentences.forEach((data, index) => {
            const sentenceDiv = document.createElement('div');
            sentenceDiv.className = 'sentence';
            sentenceDiv.innerHTML = `${index + 1}. ${data.sentence.replace('___', `<span class="drop-zone" data-answer="${data.answer}"></span>`)}`;
            container.appendChild(sentenceDiv);
        });

        words.sort(() => Math.random() - 0.5).forEach(word => {
            const wordDiv = document.createElement('div');
            wordDiv.className = 'draggable-word';
            wordDiv.textContent = word;
            wordDiv.draggable = true;
            wordDiv.id = `s1-word-${word.replace(' ', '-')}`;
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

    // --- OEFENING 2: LEESVAARDIGHEID (MEERKEUZE) ---
    (() => {
        const questions = [
            { 
                question: "How much is the printer paper on sale for?",
                options: ["$9.50", "$5.99", "$2.99"],
                answer: "$5.99"
            },
            {
                question: "What's the original price of the printer paper?",
                options: ["$9.50", "$5.99", "$4.50"],
                answer: "$9.50"
            },
            {
                question: "How much are the pens for a pack of 10?",
                options: ["$4.50", "$79.99", "$2.99"],
                answer: "$2.99"
            },
            {
                question: "How much does the desk chair cost that Colleague 1 wants?",
                options: ["$79.99", "$129", "$12.99"],
                answer: "$129"
            },
            {
                question: "What is the lunch special at the café?",
                options: ["A sandwich, soup, and a drink for $12.99", "A pack of pens for $2.99", "A desk chair for $79.99"],
                answer: "A sandwich, soup, and a drink for $12.99"
            },
            {
                question: "Does Colleague 2 plan to join Colleague 1 for lunch?",
                options: ["Yes", "No", "It's not mentioned"],
                answer: "Yes"
            }
        ];
        const container = document.getElementById('u5-s2-container');
        const checkButton = document.getElementById('check-u5-s2');
        const feedback = document.getElementById('feedback-u5-s2');

        if (!container || !checkButton) return;

        questions.forEach((qData, index) => {
            const block = document.createElement('div');
            block.className = 'question-block';
            let optionsHTML = '';
            qData.options.forEach(opt => {
                optionsHTML += `<label><input type="radio" name="s2_q${index}" value="${opt}"> ${opt}</label>`;
            });
            block.innerHTML = `<p class="question-text">${index + 1}. ${qData.question}</p><div class="options-group">${optionsHTML}</div>`;
            container.appendChild(block);
        });

        checkButton.addEventListener('click', () => {
            let correctCount = 0;
            questions.forEach((qData, index) => {
                const block = container.children[index];
                block.classList.remove('correct-q', 'incorrect-q');
                const selected = document.querySelector(`input[name="s2_q${index}"]:checked`);
                if (selected && selected.value === qData.answer) {
                    correctCount++;
                    block.classList.add('correct-q');
                } else {
                    block.classList.add('incorrect-q');
                }
            });
            feedback.textContent = `Bạn đã trả lời đúng ${correctCount} trên ${questions.length} câu!`;
        });
    })();
});