/* ============================================================
   PRANAAM – A VEG TREAT | JavaScript
   ============================================================ */

/* ---------- NAVBAR ---------- */
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

/* ---------- SMOOTH SCROLL for anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---------- SCROLL REVEAL (IntersectionObserver) ---------- */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings slightly
      const siblings = Array.from(entry.target.parentElement.children);
      const index = siblings.indexOf(entry.target);
      const baseDelay = index * 80;
      entry.target.style.transitionDelay = `${baseDelay}ms`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => observer.observe(el));

/* ---------- ACTIVE NAV LINK (scroll spy) ---------- */
const sections    = document.querySelectorAll('section[id]');
const navLinkEls  = document.querySelectorAll('.nav-link');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(sec => spyObserver.observe(sec));

/* ---------- MENU TABS (future enhancement) ---------- */
// Menu cards already shown with hover effects

/* ---------- BOOKING FORM ---------- */
function handleBooking(e) {
  e.preventDefault();
  const name  = document.getElementById('guestName').value.trim();
  const phone = document.getElementById('guestPhone').value.trim();
  const date  = document.getElementById('bookDate').value;
  const count = document.getElementById('guestCount').value;

  if (!name || !phone || !date || !count) {
    showToast('Please fill all fields to reserve your table! 🙏', 'error');
    return;
  }

  // Simulate booking (in real scenario, this would POST to a backend)
  showToast(`Thanks, ${name}! Your table is reserved for ${count} guests on ${formatDate(date)}. 🎉`);
  e.target.reset();
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

/* ---------- TOAST NOTIFICATION ---------- */
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.style.background = type === 'error' ? '#c0392b' : '';
  toast.classList.add('show');
  setTimeout(() => { toast.classList.remove('show'); }, 4000);
}

/* ---------- NAVBAR ACTIVE LINK STYLE ---------- */
const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    color: var(--saffron) !important;
    font-weight: 600;
  }
  .navbar.scrolled .nav-link.active {
    color: var(--saffron) !important;
  }
`;
document.head.appendChild(style);

/* ---------- GALLERY LIGHTBOX (simple) ---------- */
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const lb  = document.createElement('div');
    lb.style.cssText = `
      position: fixed; inset: 0; z-index: 9999;
      background: rgba(0,0,0,0.92); display: flex;
      align-items: center; justify-content: center;
      cursor: pointer; animation: fadeIn 0.3s ease;
    `;
    const lbImg = document.createElement('img');
    lbImg.src   = img.src;
    lbImg.alt   = img.alt;
    lbImg.style.cssText = `
      max-width: 90vw; max-height: 90vh;
      border-radius: 16px;
      box-shadow: 0 24px 80px rgba(0,0,0,0.6);
      object-fit: contain;
    `;
    lb.appendChild(lbImg);

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
      position: absolute; top: 24px; right: 32px;
      background: rgba(255,255,255,0.15); border: none;
      color: #fff; font-size: 1.4rem; width: 44px; height: 44px;
      border-radius: 50%; cursor: pointer; backdrop-filter: blur(6px);
      transition: background 0.2s;
    `;
    closeBtn.onmouseenter = () => closeBtn.style.background = 'rgba(255,255,255,0.3)';
    closeBtn.onmouseleave = () => closeBtn.style.background = 'rgba(255,255,255,0.15)';
    lb.appendChild(closeBtn);

    document.body.appendChild(lb);
    document.body.style.overflow = 'hidden';

    const close = () => {
      lb.remove();
      document.body.style.overflow = '';
    };
    lb.addEventListener('click', (e) => { if (e.target === lb || e.target === closeBtn) close(); });
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
    });
  });
});

/* ---------- HERO PARALLAX ---------- */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroBg = document.querySelector('.hero-bg-img');
  if (heroBg && scrolled < window.innerHeight) {
    heroBg.style.transform = `scale(1) translateY(${scrolled * 0.3}px)`;
  }
}, { passive: true });

/* ---------- FLOATING WHATSAPP BUTTON ---------- */
const waBtn = document.createElement('a');
waBtn.href = 'https://wa.me/918149686021?text=Hi%2C%20I%27d%20like%20to%20make%20a%20reservation%20at%20Pranaam!';
waBtn.target = '_blank';
waBtn.rel = 'noopener noreferrer';
waBtn.id = 'whatsappFloat';
waBtn.setAttribute('aria-label', 'Chat on WhatsApp');
waBtn.innerHTML = `
  <svg viewBox="0 0 24 24" fill="white" width="30" height="30">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
`;
waBtn.style.cssText = `
  position: fixed; bottom: 28px; left: 28px; z-index: 999;
  width: 56px; height: 56px; border-radius: 50%;
  background: #25D366; display: flex; align-items: center;
  justify-content: center; box-shadow: 0 4px 20px rgba(37,211,102,0.5);
  transition: transform 0.3s, box-shadow 0.3s;
`;
waBtn.onmouseenter = () => {
  waBtn.style.transform = 'scale(1.12)';
  waBtn.style.boxShadow = '0 8px 30px rgba(37,211,102,0.6)';
};
waBtn.onmouseleave = () => {
  waBtn.style.transform = 'scale(1)';
  waBtn.style.boxShadow = '0 4px 20px rgba(37,211,102,0.5)';
};
document.body.appendChild(waBtn);

/* ---------- fadeIn keyframe ---------- */
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }`;
document.head.appendChild(fadeStyle);

/* ---------- SET MIN DATE for booking ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('bookDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }
});
