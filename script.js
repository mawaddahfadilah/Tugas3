// ==============================
// FITUR 1: DARK MODE TOGGLE
// ==============================

const darkToggleBtn = document.querySelector('#dark-toggle');
const body = document.body;

darkToggleBtn.textContent = '☀️ Light Mode';

darkToggleBtn.addEventListener('click', function () {
  body.classList.toggle('light-mode');

  const isLight = body.classList.contains('light-mode');
  if (isLight) {
    darkToggleBtn.textContent = '🌙 Dark Mode';
  } else {
    darkToggleBtn.textContent = '☀️ Light Mode';
  }
});

// ==============================
// FITUR 2: VALIDASI FORM
// ==============================

const btnKirim = document.querySelector('#btn-kirim');
const inputNama = document.querySelector('#input-nama');
const inputEmail = document.querySelector('#input-email');
const inputPesan = document.querySelector('#input-pesan');
const formFeedback = document.querySelector('#form-feedback');

function tampilkanPesan(teks, tipe) {
  formFeedback.textContent = teks;
  formFeedback.className = 'feedback ' + tipe;
}

function isEmailValid(email) {
  return email.includes('@') && email.includes('.');
}

btnKirim.addEventListener('click', function () {
  const nama = inputNama.value.trim();
  const email = inputEmail.value.trim();
  const pesan = inputPesan.value.trim();

  if (nama === '' || email === '' || pesan === '') {
    tampilkanPesan('⚠️ Semua field harus diisi!', 'error');
    return;
  }
  if (!isEmailValid(email)) {
    tampilkanPesan('⚠️ Format email tidak valid! Contoh:mawaddahfdilah66@gmail.com', 'error');
    return;
  }
  tampilkanPesan('✅ Pesan berhasil dikirim! Terima kasih, ' + nama + '!', 'success');
  inputNama.value = '';
  inputEmail.value = '';
  inputPesan.value = '';
});

// ==============================
// FITUR 3: PARTICLE CANVAS
// ==============================

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.querySelector('.hero').offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let particlesArray = [];
for (let i = 0; i < 150; i++) {
  particlesArray.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5,
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0,170,255,0.7)';
  particlesArray.forEach((p) => {
    p.x += p.speedX;
    p.y += p.speedY;
    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();

// ==============================
// FITUR 4: SKILL COUNTER
// ==============================

const counters = document.querySelectorAll('.counter');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        let count = 0;
        const step = Math.ceil(target / 60);
        const interval = setInterval(() => {
          count += step;
          if (count >= target) {
            el.textContent = target + '%';
            clearInterval(interval);
          } else {
            el.textContent = count + '%';
          }
        }, 20);
        observer.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((c) => observer.observe(c));

// ==============================
// FITUR 5: LOADING SCREEN
// ==============================

const loader = document.createElement('div');
loader.id = 'loader';
loader.innerHTML = `
  <div class="loader-content">
    <div class="loader-ring"></div>
    <p class="loader-text">Loading...</p>
  </div>
`;
document.body.prepend(loader);

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.6s ease';
    setTimeout(() => loader.remove(), 600);
  }, 1500);
});

// ==============================
// FITUR 6: TYPING ANIMATION
// ==============================

const heroTitle = document.querySelector('.hero__title');

heroTitle.innerHTML = `Hi, saya <br><span class="highlight typing-text"></span><span class="typing-cursor">|</span>`;
const typingEl = document.querySelector('.typing-text');

const namaLengkap = 'mawaddah fadilah';
let charIdx = 0;

function typeNama() {
  if (charIdx <= namaLengkap.length) {
    typingEl.textContent = namaLengkap.substring(0, charIdx);
    charIdx++;
    setTimeout(typeNama, 100);
  }
}

// Mulai ngetik setelah loading screen selesai
setTimeout(typeNama, 1800);

// ==============================
// FITUR 7: BACK TO TOP
// ==============================

const backToTop = document.createElement('button');
backToTop.id = 'back-to-top';
backToTop.innerHTML = '⬆';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.style.opacity = '1';
    backToTop.style.pointerEvents = 'auto';
  } else {
    backToTop.style.opacity = '0';
    backToTop.style.pointerEvents = 'none';
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
