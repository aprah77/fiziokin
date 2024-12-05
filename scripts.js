document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector(link.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });  

let currentIndex = 0;
const quotes = document.querySelectorAll('.quote-slide');
const totalQuotes = quotes.length;
const wrapper = document.querySelector('.quote-wrapper');

// Clone the first and last slides for seamless looping
const firstClone = quotes[0].cloneNode(true);
const lastClone = quotes[totalQuotes - 1].cloneNode(true);

// Add the clones to the wrapper
wrapper.appendChild(firstClone);
wrapper.insertBefore(lastClone, quotes[0]);

// Adjust the wrapper's transform for the initial visible slide
wrapper.style.transform = `translateX(-100%)`; // Start at the real first slide

function moveToQuote(index) {
  wrapper.style.transition = 'transform 0.5s ease-in-out';
  wrapper.style.transform = `translateX(-${(index + 1) * 100}%)`;

  // Handle transition to clones for seamless looping
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

// Automatic sliding
let autoSlideTimer = setInterval(nextQuote, 3000); // Change quote every 3 seconds

function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  autoSlideTimer = setInterval(nextQuote, 3000);
}

// Event listeners for arrows
document.querySelector('.quote-arrow.prev').addEventListener('click', prevQuote);
document.querySelector('.quote-arrow.next').addEventListener('click', nextQuote);
