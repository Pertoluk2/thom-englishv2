document.addEventListener('DOMContentLoaded', () => {
    // --- Task 1: Listen and fill in the blanks ---
    // GECORRIGEERDE ANTWOORDEN
    const u6c1_answers = [
        "laptops", "looking for", "schoolwork", "storage", "files",
        "$600", "pricey", "discount", "10%", "mouse", 
        "free", "install", "$50", "lower", "$40"
    ];

    const u6c1_container = document.getElementById('u6-c1-container');
    if (u6c1_container) {
        const conversationHTML = `
            <div class="conversation">
                <p><b>Man:</b> Hi, do you have any good (1) <input type="text" id="u6c1_ans_0" class="fill-in-input-small">?</p>
                <p><b>Salesperson:</b> Yes, we have a few options. What are you (2) <input type="text" id="u6c1_ans_1" class="fill-in-input"> in a laptop?</p>
                <p><b>Man:</b> I need one for (3) <input type="text" id="u6c1_ans_2" class="fill-in-input-small"> and maybe some games do you have any with good specs?</p>
                <p><b>Salesperson:</b> Sure. Let me show you this one. It has a fast processor and plenty of (4) <input type="text" id="u6c1_ans_3" class="fill-in-input-small"> for games and school (5) <input type="text" id="u6c1_ans_4" class="fill-in-input-small">.</p>
                <p><b>Man:</b> How much does it cost?</p>
                <p><b>Salesperson:</b> This one is (6) <input type="text" id="u6c1_ans_5" class="fill-in-input-small">.</p>
                <p><b>Man:</b> Hmm, that's a bit (7) <input type="text" id="u6c1_ans_6" class="fill-in-input-small">. Can you give me a (8) <input type="text" id="u6c1_ans_7" class="fill-in-input-small">?</p>
                <p><b>Salesperson:</b> Well, I can offer you a (9) <input type="text" id="u6c1_ans_8" class="fill-in-input-small"> discount if you buy it today.</p>
                <p><b>Man:</b> Okay, that sounds better. Can you also throw in a free (10) <input type="text" id="u6c1_ans_9" class="fill-in-input-small"> and laptop bag?</p>
                <p><b>Salesperson:</b> I can give you a free mouse, but the laptop bag will be an additional $20.</p>
                <p><b>Man:</b> Hmm, I was hoping for both for (11) <input type="text" id="u6c1_ans_10" class="fill-in-input-small">. How about I pay $10 for the bag?</p>
                <p><b>Salesperson:</b> I can't do that, but I can give you a discount on the bag if you buy it with the laptop.</p>
                <p><b>Man:</b> Okay, I'll take the laptop with the free mouse. Can you also (12) <input type="text" id="u6c1_ans_11" class="fill-in-input-small"> Microsoft Office for me?</p>
                <p><b>Salesperson:</b> Sure. That'll be an additional (13) <input type="text" id="u6c1_ans_12" class="fill-in-input-small">.</p>
                <p><b>Man:</b> Oh, that's a bit expensive. Can you (14) <input type="text" id="u6c1_ans_13" class="fill-in-input-small"> the price?</p>
                <p><b>Salesperson:</b> How about I install it for (15) <input type="text" id="u6c1_ans_14" class="fill-in-input-small">?</p>
                <p><b>Man:</b> Hmm, I was thinking more like $30.</p>
                <p><b>Salesperson:</b> Okay, $30 it is. Anything else you need?</p>
                <p><b>Man:</b> No, I think that's it. Thanks for your help.</p>
                <p><b>Salesperson:</b> You're welcome. Enjoy your new laptop.</p>
            </div>
        `;
        u6c1_container.innerHTML = conversationHTML;

        document.getElementById('check-u6-c1').addEventListener('click', () => {
            u6c1_answers.forEach((answer, index) => {
                const input = document.getElementById(`u6c1_ans_${index}`);
                // Verwijder extra tekens zoals $ voor een betere controle
                const userAnswer = input.value.trim().toLowerCase().replace('$', '');
                const correctAnswer = answer.toLowerCase().replace('$', '');
                
                input.style.borderBottom = (userAnswer === correctAnswer) ? '2px solid green' : '2px solid red';
            });
        });
    }
});