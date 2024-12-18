let currentIndex = 0;
const quotes = document.querySelectorAll('.quote-slide');
const totalQuotes = quotes.length;
const wrapper = document.querySelector('.quote-wrapper');

const firstClone = quotes[0].cloneNode(true);
const lastClone = quotes[totalQuotes - 1].cloneNode(true);

wrapper.appendChild(firstClone);
wrapper.insertBefore(lastClone, quotes[0]);

wrapper.style.transform = `translateX(-100%)`;

function moveToQuote(index) {
  wrapper.style.transition = 'transform 0.5s ease-in-out';
  wrapper.style.transform = `translateX(-${(index + 1) * 100}%)`;

  wrapper.addEventListener('transitionend', () => {
    if (index === -1) {
      wrapper.style.transition = 'none';
      wrapper.style.transform = `translateX(-${totalQuotes * 100}%)`;
      currentIndex = totalQuotes - 1;
    } else if (index === totalQuotes) {
      wrapper.style.transition = 'none';
      wrapper.style.transform = 'translateX(-100%)';
      currentIndex = 0;
    }
  }, { once: true });
}

function prevQuote() {
  currentIndex--;
  moveToQuote(currentIndex);
  resetAutoSlide();
}

function nextQuote() {
  currentIndex++;
  moveToQuote(currentIndex);
  resetAutoSlide();
}

let autoSlideTimer = setInterval(nextQuote, 3000);

function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  autoSlideTimer = setInterval(nextQuote, 3000);
}

document.querySelector('.quote-arrow.prev').addEventListener('click', prevQuote);
document.querySelector('.quote-arrow.next').addEventListener('click', nextQuote);

document.querySelectorAll('.find-out-more').forEach(button => {
  button.addEventListener('click', () => {
    const flipCard = button.closest('.flip-card');
    flipCard.classList.add('flipped');
  });
});

document.querySelectorAll('.turn-back').forEach(button => {
  button.addEventListener('click', () => {
    const flipCard = button.closest('.flip-card');
    flipCard.classList.remove('flipped');
  });
});

// mail form with EmailJS
document.addEventListener("DOMContentLoaded", function () {

  emailjs.init("7wK173sx0dlPrc75i"); // public API key

  console.log("EmailJS has been initialized");

  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
      event.preventDefault();

      const serviceID = "service_ab605me"; // service ID
      const templateID = "template_kk105qi"; // template ID

      emailjs.sendForm(serviceID, templateID, form)
          .then(
              function () {
                  alert("Vaše sporočilo je bilo poslano! Odgovorili bomo v najkrajšem možnem času.");
                  form.reset();
              },
              function (error) {
                  alert("Prišlo je do napake. Prosim, poskusite ponovno.");
                  console.error("EmailJS error:", error);
              }
          );
  });
});
