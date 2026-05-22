// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const icon = hamburger.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const icon = hamburger.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
    if (navLink) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-links a').forEach(a => a.style.color = '');
        navLink.style.color = '#6c63ff';
      }
    }
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply initial styles and observe elements
const animatedElements = document.querySelectorAll(
  '.info-card, .skill-category, .project-card, .about-text, .contact-info, .contact-form'
);

animatedElements.forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  observer.observe(el);
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Simulate sending
  setTimeout(() => {
    formSuccess.classList.add('show');
    contactForm.reset();
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled = false;
    setTimeout(() => formSuccess.classList.remove('show'), 4000);
  }, 1200);
});

// ===== TYPING EFFECT FOR HERO TITLE =====
const titles = ['Full Stack Web Developer', 'UI/UX Designer', 'React Developer', 'Problem Solver'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const titleEl = document.querySelector('.hero-title');

function typeEffect() {
  const current = titles[titleIndex];
  if (isDeleting) {
    titleEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    titleEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typeEffect, 2000);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
  }

  setTimeout(typeEffect, isDeleting ? 60 : 100);
}

// Start typing effect after a short delay
setTimeout(typeEffect, 1000);

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== CUSTOM CURSOR =====
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

// Smooth ring follow
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Hover glow on interactive elements
const hoverTargets = document.querySelectorAll('a, button, .info-card, .skill-item, .pd-feature, .proj-preview-card, .magnetic-btn');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
});

// Click pulse
window.addEventListener('mousedown', () => cursorDot.classList.add('clicking'));
window.addEventListener('mouseup',   () => cursorDot.classList.remove('clicking'));

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  cursorDot.style.opacity  = '0';
  cursorRing.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursorDot.style.opacity  = '1';
  cursorRing.style.opacity = '1';
});

// ===== MAGNETIC BUTTON =====
const magneticBtn = document.getElementById('openModalBtn');

if (magneticBtn) {
  magneticBtn.addEventListener('mousemove', (e) => {
    const rect   = magneticBtn.getBoundingClientRect();
    const cx     = rect.left + rect.width  / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = (e.clientX - cx) * 0.35;
    const dy     = (e.clientY - cy) * 0.35;
    magneticBtn.style.transform = `translate(${dx}px, ${dy}px)`;
  });

  magneticBtn.addEventListener('mouseleave', () => {
    magneticBtn.style.transform = 'translate(0, 0)';
    magneticBtn.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    cursorRing.classList.remove('hovering');
  });

  magneticBtn.addEventListener('mouseenter', () => {
    magneticBtn.style.transition = 'transform 0.1s ease';
    cursorRing.classList.add('hovering');
  });
}

// ===== MODAL =====
const modalOverlay = document.getElementById('projectModal');
const modalClose   = document.getElementById('modalClose');
let autoCollapseTimer = null;

function openModal() {
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  // Auto-collapse after 60 seconds of inactivity
  resetAutoCollapse();
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
  clearTimeout(autoCollapseTimer);
}

function resetAutoCollapse() {
  clearTimeout(autoCollapseTimer);
  autoCollapseTimer = setTimeout(closeModal, 60000);
}

// Open on button click
if (magneticBtn) {
  magneticBtn.addEventListener('click', openModal);
}

// Close on X button
if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

// Close on overlay click (outside modal box)
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Reset auto-collapse timer on scroll inside modal
document.getElementById('modalBox')?.addEventListener('scroll', resetAutoCollapse);
