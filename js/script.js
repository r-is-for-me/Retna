const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalDescription = document.getElementById('modalDescription');
const modalCopy = document.getElementById('modalCopy');
const modalImage = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');
const yearNode = document.getElementById('year');

const HERO_SLIDESHOW_ENABLED = true;
const HERO_SLIDE_INTERVAL = 7000;
const hero = document.querySelector('.hero');
const heroSlides = Array.from(document.querySelectorAll('.hero-background-slide'));
const heroMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

if (hero && heroSlides.length > 1) {
  let activeSlide = heroSlides.findIndex((slide) => slide.classList.contains('is-active'));
  let slideshowTimer;

  if (activeSlide < 0) activeSlide = 0;

  const stopSlideshow = () => {
    window.clearInterval(slideshowTimer);
    slideshowTimer = undefined;
    hero.classList.remove('is-slideshow-active');
  };

  const showNextSlide = () => {
    const nextSlideIndex = (activeSlide + 1) % heroSlides.length;
    const nextSlide = heroSlides[nextSlideIndex];

    if (!nextSlide.complete || nextSlide.naturalWidth === 0) {
      if (nextSlide.complete) {
        console.error('Hero slideshow image failed to load:', nextSlide.src);
      }
      return;
    }

    heroSlides[activeSlide].classList.remove('is-active');
    nextSlide.classList.add('is-active');
    activeSlide = nextSlideIndex;
  };

  const syncSlideshowMotion = () => {
    stopSlideshow();

    if (!HERO_SLIDESHOW_ENABLED || heroMotionPreference.matches) return;

    hero.classList.add('is-slideshow-active');
    slideshowTimer = window.setInterval(showNextSlide, HERO_SLIDE_INTERVAL);
  };

  syncSlideshowMotion();

  if (typeof heroMotionPreference.addEventListener === 'function') {
    heroMotionPreference.addEventListener('change', syncSlideshowMotion);
  } else {
    heroMotionPreference.addListener(syncSlideshowMotion);
  }
}

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('is-open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

function openProjectModal(card) {
  if (!modal) return;

  const title = card.dataset.title || 'Project';
  const category = card.dataset.category || 'Project';
  const description = card.dataset.description || title;
  const copy = card.dataset.copy || 'Project description coming soon.';
  const image = card.dataset.image || '';

  modalTitle.textContent = title;
  modalCategory.textContent = category;
  modalDescription.textContent = description;
  modalCopy.textContent = copy;
  modalImage.src = image;
  modalImage.alt = `${title} project preview`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeProjectModal() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

projectCards.forEach((card) => {
  const activateCard = () => openProjectModal(card);

  card.addEventListener('click', activateCard);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      activateCard();
    }
  });
});

if (modalClose) {
  modalClose.addEventListener('click', closeProjectModal);
}

if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target && event.target.matches('[data-close="true"]')) {
      closeProjectModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('open')) {
      closeProjectModal();
    }
  });
}
