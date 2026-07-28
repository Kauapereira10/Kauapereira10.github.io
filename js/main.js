AOS.init({
  duration: 600,
  once: true, 
  offset: 60
});

const phrases = [
  'Desenvolvedor Backend Java',
  'Apaixonado por APIs REST',
  'Spring Boot Developer',
  'Estudante de ADS'
];

let phraseIndex = 0;
let charIndex   = 0;
let deleting    = false;

const typedEl = document.getElementById('typed');

function type() {
  const current = phrases[phraseIndex];

  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(type, deleting ? 45 : 90);
}

type();


const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.getAttribute('data-width');
      bar.style.width = width + '%';
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));


const menuBtn    = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  menuBtn.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
});

function closeMenu() {
  mobileMenu.classList.remove('open');
  menuBtn.textContent = '☰';
}
