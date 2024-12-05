document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector(link.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });  

// Quotes Data
const quotes = [
    { text: "Tina je super!", author: "Ilka Štuhec" },
    { text: "Tina je neverjetna!", author: "Anja Šešum" },
    { text: "Tina je res fajn!", author: "Nataša Pirc Musar" },
    { text: "Tina je še kr OK!", author: "Robert Golob" },
    { text: "Tina je v redu!", author: "Albert Einstein" },
  ];
  
let currentQuote = 0;

function showQuoteWithSlide(index) {
const quoteWrapper = document.querySelector(".quote-wrapper");
const quoteSlides = quotes.map(
    (quote) =>
    `<div class="quote-slide">
        <p class="quote-text">"${quote.text}"</p>
        <p class="quote-author">- ${quote.author}</p>
    </div>`
);
quoteWrapper.innerHTML = quoteSlides.join("");
quoteWrapper.style.transform = `translateX(-${index * 100}%)`;
}

function prevQuote() {
currentQuote = (currentQuote - 1 + quotes.length) % quotes.length;
showQuoteWithSlide(currentQuote);
}

function nextQuote() {
currentQuote = (currentQuote + 1) % quotes.length;
showQuoteWithSlide(currentQuote);
}

// Initialize the first quote and add slide effect
document.addEventListener("DOMContentLoaded", () => {
showQuoteWithSlide(currentQuote);
});