document.addEventListener('DOMContentLoaded', () => {

    // --- DAY 1, EXERCISE 1: Drag and Drop ---
    const d1e1_words = ["afternoon", "pleasure", "meet", "I'm", "name's", "too"];
    const d1e1_sentences = [
        { text: "Hello. My ___ Sebastian.", answer: "name's" },
        { text: "Good ___. My name is Joe Carl.", answer: "afternoon" },
        { text: "Hi, Marie. ___ Clive.", answer: "I'm" },
        { text: "It's great to meet you, ___, Sven.", answer: "too" },
        { text: "It's a ___ to meet you.", answer: "pleasure" }
    ];
    const d1e1_wordbox = document.getElementById('wb-d1-e1-wordbox');
    const d1e1_container = document.getElementById('wb-d1-e1-container');

    function initialize_d1e1() {
        if (!d1e1_wordbox || !d1e1_container) return;
        d1e1_wordbox.innerHTML = '';
        d1e1_container.innerHTML = '';

        d1e1_words.forEach(word => {
            const wordDiv = document.createElement('div');
            wordDiv.id = `d1e1-word-${word}`;
            wordDiv.className = 'draggable-word';
            wordDiv.textContent = word;
            wordDiv.draggable = true;
            wordDiv.addEventListener('dragstart', e => e.dataTransfer.setData('text/plain', e.target.id));
            d1e1_wordbox.appendChild(wordDiv);
        });

        d1e1_sentences.forEach((s, i) => {
            const sentenceHTML = `${i + 1}. ${s.text.replace('___', `<span class="drop-zone" data-answer="${s.answer}"></span>`)}`;
            const sentenceDiv = document.createElement('div');
            sentenceDiv.className = 'sentence';
            sentenceDiv.innerHTML = sentenceHTML;
            d1e1_container.appendChild(sentenceDiv);
        });

        const allDropZones = d1e1_container.querySelectorAll('.drop-zone');
        const dropTargets = [d1e1_wordbox, ...allDropZones];

        dropTargets.forEach(target => {
            target.addEventListener('dragover', e => { e.preventDefault(); if (target.classList.contains('drop-zone')) target.classList.add('drag-over'); });
            target.addEventListener('dragleave', e => { if (target.classList.contains('drop-zone')) target.classList.remove('drag-over'); });
            target.addEventListener('drop', e => {
                e.preventDefault();
                if (target.classList.contains('drop-zone')) target.classList.remove('drag-over');
                const draggedId = e.dataTransfer.getData('text/plain');
                const draggedEl = document.getElementById(draggedId);
                if (target.children.length > 0) d1e1_wordbox.appendChild(target.firstElementChild);
                target.appendChild(draggedEl);
            });
        });
    }

    const checkBtn_d1e1 = document.getElementById('check-wb-d1-e1');
    if (checkBtn_d1e1) {
        checkBtn_d1e1.addEventListener('click', () => {
            d1e1_container.querySelectorAll('.drop-zone').forEach(zone => {
                zone.classList.remove('correct', 'incorrect');
                const droppedWordEl = zone.firstElementChild;
                if (droppedWordEl) {
                    if (droppedWordEl.textContent === zone.dataset.answer) zone.classList.add('correct');
                    else zone.classList.add('incorrect');
                } else {
                    zone.classList.add('incorrect');
                }
            });
        });
    }
    initialize_d1e1();

    // --- DAY 1, EXERCISE 2: Listen and mark ---
    const d1e2_names = [
        { pair: ["GEORGE", "JORGE"], answer: "GEORGE", file: "WB - Day 1- Ex 2.1.mp3" },
        { pair: ["KATIE", "KATY"], answer: "KATY", file: "WB - Day 1- Ex 2.2.mp3" },
        { pair: ["FRANCIS", "FRANCES"], answer: "FRANCES", file: "WB - Day 1- Ex 2.3.mp3" },
        { pair: ["LAURA", "LORNA"], answer: "LAURA", file: "WB - Day 1- Ex 2.4.mp3" },
        { pair: ["SANDRA", "ZANDRA"], answer: "SANDRA", file: "WB - Day 1- Ex 2.5.mp3" },
        { pair: ["BORIS", "DORIS"], answer: "BORIS", file: "WB - Day 1- Ex 2.6.mp3" }
    ];
    const d1e2_container = document.getElementById('wb-d1-e2-container');
    if (d1e2_container) {
        d1e2_container.innerHTML = '';
        d1e2_names.forEach((p, i) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-block audio-question-block';
            questionDiv.innerHTML = `
                <div class="audio-item">
                    <p class="question-text">${i + 1}.</p>
                    <audio controls class="inline-audio-player"><source src="audio/${p.file}" type="audio/mpeg"></audio>
                </div>
                <div class="options-group">
                    <label><input type="radio" name="d1e2_q${i}" value="${p.pair[0]}"> ${p.pair[0]}</label>
                    <label><input type="radio" name="d1e2_q${i}" value="${p.pair[1]}"> ${p.pair[1]}</label>
                </div>`;
            d1e2_container.appendChild(questionDiv);
        });
        document.getElementById('check-wb-d1-e2').addEventListener('click', () => {
            d1e2_names.forEach((p, i) => {
                const block = d1e2_container.children[i];
                const selected = document.querySelector(`input[name="d1e2_q${i}"]:checked`);
                block.classList.remove('correct-q', 'incorrect-q');
                if (selected && selected.value === p.answer) block.classList.add('correct-q');
                else block.classList.add('incorrect-q');
            });
        });
    }

    // --- DAY 2, EXERCISE 1: Match word to meaning ---
    const d2e1_data = [
        { term: "1. Occupation", id: "d2e1_q1", answerId: "d2e1_a1", meaning: "b) The job or profession someone has." },
        { term: "2. Hometown", id: "d2e1_q2", answerId: "d2e1_a2", meaning: "a) The place where someone was born or raised." },
        { term: "3. Hobby", id: "d2e1_q3", answerId: "d2e1_a3", meaning: "f) A personal interest or activity done for enjoyment." },
        { term: "4. Fluent", id: "d2e1_q4", answerId: "d2e1_a4", meaning: "c) The ability to speak a language smoothly and easily." },
        { term: "5. Background", id: "d2e1_q5", answerId: "d2e1_a5", meaning: "i) A person's personal history, education, or work history." },
        { term: "6. Colleague", id: "d2e1_q6", answerId: "d2e1_a6", meaning: "d) A person who works with you in the same company." },
        { term: "7. Experience", id: "d2e1_q7", answerId: "d2e1_a7", meaning: "j) The knowledge or skills gained from doing something over time." },
        { term: "8. Department", id: "d2e1_q8", answerId: "d2e1_a8", meaning: "e) A division of a company or organization." },
        { term: "9. Native", id: "d2e1_q9", answerId: "d2e1_a9", meaning: "h) Someone born in a particular place or country." },
        { term: "10. Industry", id: "d2e1_q10", answerId: "d2e1_a10", meaning: "g) The business or economic sector related to a particular field." }
    ];
    const d2e1_container = document.getElementById('wb-d2-e1-container');
    const d2e1_checkBtn = document.getElementById('check-wb-d2-e1');
    const d2e1_resetBtn = document.getElementById('reset-wb-d2-e1');
    let d2e1_selectedTerm = null;
    let d2e1_userPairs = {};

    function initialize_d2e1() {
        d2e1_selectedTerm = null;
        d2e1_userPairs = {};
        if (!d2e1_container) return;
        d2e1_container.innerHTML = `<div id="d2e1_terms"></div><div id="d2e1_meanings"></div>`;
        d2e1_container.classList.add('matching-game-container');
        const termsCol = document.getElementById('d2e1_terms');
        const meaningsCol = document.getElementById('d2e1_meanings');
        d2e1_data.forEach(item => { termsCol.innerHTML += `<div class="match-item" id="${item.id}">${item.term}</div>`; });
        const shuffledMeanings = [...d2e1_data].sort(() => Math.random() - 0.5);
        shuffledMeanings.forEach(item => { meaningsCol.innerHTML += `<div class="match-item" id="${item.answerId}">${item.meaning}</div>`; });
        d2e1_container.querySelectorAll('.match-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const clickedItem = e.currentTarget;
                if (termsCol.contains(clickedItem)) {
                    if (clickedItem.classList.contains('paired')) return;
                    const currentSelected = d2e1_container.querySelector('.match-item.selected');
                    if (currentSelected) currentSelected.classList.remove('selected');
                    clickedItem.classList.add('selected');
                    d2e1_selectedTerm = clickedItem;
                } else {
                    if (!d2e1_selectedTerm || clickedItem.classList.contains('paired')) return;
                    const termId = d2e1_selectedTerm.id;
                    const meaningId = clickedItem.id;
                    for (const t_id in d2e1_userPairs) {
                        if (d2e1_userPairs[t_id] === meaningId || t_id === termId) {
                            document.getElementById(t_id)?.classList.remove('paired', 'pair-' + (Object.keys(d2e1_userPairs).indexOf(t_id) % 8));
                            document.getElementById(d2e1_userPairs[t_id])?.classList.remove('paired', 'pair-' + (Object.keys(d2e1_userPairs).indexOf(t_id) % 8));
                            delete d2e1_userPairs[t_id];
                        }
                    }
                    d2e1_userPairs[termId] = meaningId;
                    const pairIndex = Object.keys(d2e1_userPairs).indexOf(termId) % 8;
                    d2e1_selectedTerm.className = 'match-item paired pair-' + pairIndex;
                    clickedItem.className = 'match-item paired pair-' + pairIndex;
                    d2e1_selectedTerm = null;
                }
            });
        });
    }
    if (d2e1_checkBtn) {
        d2e1_checkBtn.addEventListener('click', () => {
            d2e1_data.forEach(item => {
                const termEl = document.getElementById(item.id);
                const userChoiceId = d2e1_userPairs[item.id];
                if (userChoiceId) {
                    const meaningEl = document.getElementById(userChoiceId);
                    termEl.classList.remove('correct', 'incorrect');
                    meaningEl.classList.remove('correct', 'incorrect');
                    if (userChoiceId === item.answerId) {
                        termEl.classList.add('correct');
                        meaningEl.classList.add('correct');
                    } else {
                        termEl.classList.add('incorrect');
                        meaningEl.classList.add('incorrect');
                    }
                }
            });
        });
    }
    if (d2e1_resetBtn) d2e1_resetBtn.addEventListener('click', initialize_d2e1);
    initialize_d2e1();

    // --- DAY 2, EXERCISE 2: Choose the word ---
    const d2e2_sentences = [
        { q: "I live in a small ___ (province/city) near the mountains.", a: "province" },
        { q: "My friend is very ___ (hardworking/forgetful) and always completes tasks on time.", a: "hardworking" },
        { q: "The ___ (countryside/company) is peaceful and perfect for relaxing.", a: "countryside" },
        { q: "What are your main ___ (responsibilities/creative) in your current job?", a: "responsibilities" },
        { q: "She is a very ___ (creative/overthinking) designer with unique ideas.", a: "creative" },
        { q: "My brother loves ___ (traveling/playing sports) to new countries every year.", a: "traveling" },
        { q: "We need to hire someone who is ___ (organized/impatient) to handle this project.", a: "organized" },
        { q: "She often misses appointments because she's so ___ (forgetful/shy).", a: "forgetful" },
        { q: "Many young people prefer living in the ___ (city/countryside) because of better job opportunities.", a: "city" },
        { q: "He tends to make simple problems complicated because of his habit of ___ (overthinking/playing sports).", a: "overthinking" }
    ];
    const d2e2_container = document.getElementById('wb-d2-e2-container');
    if (d2e2_container) {
        d2e2_sentences.forEach((s, i) => {
            const options = s.q.substring(s.q.indexOf('(') + 1, s.q.indexOf(')')).split('/');
            d2e2_container.innerHTML += `
                <div class="question-block">
                    <p class="question-text">${i + 1}. ${s.q.substring(0, s.q.indexOf('('))} ___ ${s.q.substring(s.q.indexOf(')') + 1)}</p>
                    <div class="options-group">
                        <label><input type="radio" name="d2e2_q${i}" value="${options[0]}"> ${options[0]}</label>
                        <label><input type="radio" name="d2e2_q${i}" value="${options[1]}"> ${options[1]}</label>
                    </div>
                </div>`;
        });
        document.getElementById('check-wb-d2-e2').addEventListener('click', () => {
            d2e2_sentences.forEach((s, i) => {
                const block = d2e2_container.children[i];
                const selected = document.querySelector(`input[name="d2e2_q${i}"]:checked`);
                block.classList.remove('correct-q', 'incorrect-q');
                if (selected && selected.value === s.a) block.classList.add('correct-q');
                else block.classList.add('incorrect-q');
            });
        });
    }

    // --- DAY 3, EXERCISE 1: Correct the sentences ---
    const d3e1_sentences = [
        { incorrect: "My name am Sarah, and I work as a teacher.", correct: "My name is Sarah, and I work as a teacher." },
        { incorrect: "I works in the marketing department of ABC company.", correct: "I work in the marketing department of ABC company." },
        { incorrect: "My position are a sales assistant.", correct: "My position is a sales assistant." },
        { incorrect: "I has two years of experience in customer service.", correct: "I have two years of experience in customer service." },
        { incorrect: "Our department responsible for designing new products.", correct: "Our department is responsible for designing new products." },
        { incorrect: "I'm very good in communicating with customers.", correct: "I'm very good at communicating with customers." },
        { incorrect: "My hobby is playing sport and travel.", correct: "My hobby is playing sports and traveling." },
        { incorrect: "I want to introduce me to my team.", correct: "I want to introduce myself to my team." },
        { incorrect: "He is a very organized and hardworking people.", correct: "He is a very organized and hardworking person." },
        { incorrect: "Let me to introduce myself, my name is John.", correct: "Let me introduce myself, my name is John." }
    ];
    const d3e1_container = document.getElementById('wb-d3-e1-container');
    if (d3e1_container) {
        d3e1_container.innerHTML = '';
        d3e1_sentences.forEach(s => {
            const div = document.createElement('div');
            div.className = 'correction-item';
            div.innerHTML = `
                <p><em>Incorrect:</em> "${s.incorrect}"</p>
                <div class="correction-input-group">
                    <input type="text" placeholder="Gõ câu đúng vào đây...">
                    <button class="show-answer-btn">Hiện đáp án</button>
                </div>
                <p class="correct-answer-text hidden"><strong>Câu đúng:</strong> ${s.correct}</p>
            `;
            d3e1_container.appendChild(div);
        });
        d3e1_container.addEventListener('click', (e) => {
            if (e.target.classList.contains('show-answer-btn')) {
                const answerText = e.target.closest('.correction-item').querySelector('.correct-answer-text');
                answerText.classList.toggle('hidden');
            }
        });
    }

// --- DAY 3, EXERCISE 2: Rearrange the words ---
const d3e2_sentences = [
    { jumbled: "a/I/hardworking/person/am", correct: "I am a hardworking person." },
    { jumbled: "responsibilities/are/your/what/main?", correct: "What are your main responsibilities?" },
    { jumbled: "She/loves/in/living/the/city", correct: "She loves living in the city." },
    { jumbled: "shy/new/feel/meeting/people/I/when/very", correct: "I feel very shy when meeting new people." },
    { jumbled: "We/in/a/small/province/live", correct: "We live in a small province." },
    { jumbled: "her/always/finishes/tasks/she/on time", correct: "She always finishes her tasks on time." }
];
const d3e2_container = document.getElementById('wb-d3-e2-container');
if (d3e2_container) {
    d3e2_container.innerHTML = ''; // Maak de container leeg
    d3e2_sentences.forEach((s, i) => {
        const div = document.createElement('div');
        div.className = 'rearrange-item';
        div.innerHTML = `
            <p>${i + 1}. Sắp xếp lại các từ:</p>
            <div class="word-pool" id="pool-${i}"></div>
            <div class="sentence-drop-zone" id="dropzone-${i}"></div>
            <button class="check-rearrange-btn" data-index="${i}">Kiểm tra</button>
            <p class="rearrange-feedback" id="feedback-${i}"></p>
        `;
        const wordPool = div.querySelector(`#pool-${i}`);
        const words = s.jumbled.split('/').sort(() => Math.random() - 0.5);
        words.forEach(word => {
            const wordTile = document.createElement('span');
            wordTile.className = 'draggable-word-tile';
            wordTile.textContent = word;
            wordTile.draggable = true;
            wordTile.id = `d3e2-word-${i}-${word.replace(/ /g, '')}`;
            wordTile.addEventListener('dragstart', e => e.dataTransfer.setData('text/plain', e.target.id));
            wordPool.appendChild(wordTile);
        });
        d3e2_container.appendChild(div);
    });

    d3e2_container.querySelectorAll('.word-pool, .sentence-drop-zone').forEach(zone => {
        zone.addEventListener('dragover', e => e.preventDefault());
        zone.addEventListener('drop', e => {
            e.preventDefault();
            const id = e.dataTransfer.getData('text/plain');
            const el = document.getElementById(id);
            e.currentTarget.appendChild(el);
        });
    });

    d3e2_container.querySelectorAll('.check-rearrange-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const index = e.target.dataset.index;
            const dropZone = document.getElementById(`dropzone-${index}`);
            const feedbackEl = document.getElementById(`feedback-${index}`);
            const words = Array.from(dropZone.children).map(child => child.textContent);
            const userAnswer = words.join(' ').trim();
            const correctAnswer = d3e2_sentences[index].correct.replace(/[.?]/g, '');

            feedbackEl.classList.remove('correct', 'incorrect');
            if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
                feedbackEl.textContent = 'Chính xác!';
                feedbackEl.classList.add('correct');
            } else {
                feedbackEl.textContent = 'Không đúng, hãy thử lại.';
                feedbackEl.classList.add('incorrect');
            }
        });
    });
}
});