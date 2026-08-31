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

const contactForm  = document.getElementById('contactForm');
const formStatus   = document.getElementById('formStatus');
const submitBtn    = document.getElementById('formSubmitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const endpoint = contactForm.getAttribute('data-endpoint');

    if (!endpoint || endpoint.includes('SEU_ID_AQUI')) {
      showStatus('Formulário ainda não configurado. Troque SEU_ID_AQUI pelo ID do Formspree.', 'error');
      return;
    }

    const formData = new FormData(contactForm);

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    showStatus('', '');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        showStatus('Mensagem enviada com sucesso! Retornarei o contato em breve.', 'success');
        contactForm.reset();
      } else {
        const data = await response.json().catch(() => null);
        const errorMsg = data && data.errors
          ? data.errors.map(e => e.message).join(', ')
          : 'Não foi possível enviar. Tente novamente ou use o e-mail direto.';
        showStatus(errorMsg, 'error');
      }
    } catch (err) {
      showStatus('Erro de conexão. Verifique sua internet e tente novamente.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar mensagem';
    }
  });
}

function showStatus(message, type) {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.className = 'form-status';
  if (type) formStatus.classList.add(`form-status--${type}`);
}