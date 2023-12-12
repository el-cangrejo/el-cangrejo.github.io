window.onload = function() {
  displayRandomQuote();
};

function displayRandomQuote() {
    const quotes = [
        "“When you look at the dark side, careful you must be. For the dark side looks back.”",
        "“Try not! Do. Or do not. There is no try.”",
        "“Great warrior. Hmm. Wars not make one great.”",
        "“Many of the truths that we cling to depend on our point of view.”",
        "“If no mistake have you made, yet losing you are, a different game you should play.”",
        "“Named must your fear be, before banish it you can.”",
        "“Train yourself to let go of everything you fear to lose.”", 
    ];

    const randomIndex = Math.floor(Math.random() * quotes.length);

    const randomQuote = quotes[randomIndex];
    
    const quoteElement = document.getElementById('quoteText');
    quoteElement.textContent = randomQuote;
}
