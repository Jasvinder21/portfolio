/* ============================================================================
   script.js
   Portfolio site — Jasvinder Singh | AI & Data Science Engineer
   Extracted from the inline <script> block for GitHub / Render deployment.
   Served by Flask via: {{ url_for('static', filename='js/script.js') }}
   This file is loaded at the bottom of <body>, so the DOM elements below
   already exist by the time this code runs (no extra wrapper needed).
   ============================================================================ */

/* ----------------------------------------------------------------------------
   1. NAVBAR — scroll shadow, mobile menu toggle
   ---------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  
  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('mobile-open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      navLinks.classList.remove('mobile-open');
    }
  });

/* ----------------------------------------------------------------------------
   2. DARK / LIGHT THEME TOGGLE
   ---------------------------------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
  });

/* ----------------------------------------------------------------------------
   3. SCROLL-REVEAL ANIMATIONS (IntersectionObserver)
   ---------------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });
  revealEls.forEach(el => observer.observe(el));


/* ----------------------------------------------------------------------------
   2. SCROLL-REVEAL ANIMATIONS
   ---------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------
   3. PROJECTS CAROUSEL (slider + progress HUD)
   ---------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------
   4. PROJECTS CAROUSEL (slider + progress HUD)
   ---------------------------------------------------------------------------- */
  /* SLIDER TRACK HUD CONTROLLER */
  const track = document.getElementById('projectTrack');
  const thumb = document.getElementById('scrollIndicatorThumb');
  const leftBtn = document.getElementById('slideLeftBtn');
  const rightBtn = document.getElementById('slideRightBtn');

  function updateScrollHUD() {
    if(!track || !thumb) return;
    const cards = document.querySelectorAll('.project-slide-card');
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    const maxScroll = track.scrollWidth - track.clientWidth;
    
    cards.forEach(card => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distanceFromCenter = cardCenter - trackCenter;
      const normalizedDistance = distanceFromCenter / (track.clientWidth / 2);
      
      const rotationAngle = Math.max(-25, Math.min(25, normalizedDistance * -20));
      const targetScale = Math.max(0.85, 1 - Math.abs(normalizedDistance) * 0.12);
      
      card.style.transform = `scale(${targetScale}) rotateY(${rotationAngle}deg)`;
    });

    if (maxScroll <= 0) return;
    const percentage = (track.scrollLeft / maxScroll) * 100;
    thumb.style.left = `${percentage * 0.833}%`;
  }

  if(track) {
    track.addEventListener('scroll', updateScrollHUD);
    window.addEventListener('resize', updateScrollHUD);
    leftBtn.addEventListener('click', () => track.scrollBy({ left: -300, behavior: 'smooth' }));
    rightBtn.addEventListener('click', () => track.scrollBy({ left: 300, behavior: 'smooth' }));
    setTimeout(updateScrollHUD, 300);
  }

  /* =====================================================================
     INFOSYS CERTIFICATES SLIDER MODAL CONTROLLER
     Grabs all the elements that belong to the modal (the overlay itself,
     the card that opens it, the close button, the scroll track, the
     progress thumb, and the two arrow buttons), then wires up:
       1) clicking the "Infosys Full-Stack Suite" card -> opens the modal
       2) clicking the X / clicking outside the modal -> closes it
       3) scrolling the strip / clicking the arrows -> moves the slider
          and updates the progress bar + the little 3D tilt effect,
          exactly like the Projects carousel above.
     All the variable names here are prefixed with "c" (cModal, cTrack...)
     so they never collide with the Projects slider variables above
     (track, thumb, leftBtn, rightBtn).
     ===================================================================== */
  const cModal      = document.getElementById('certSliderModal');   // the full-screen overlay
  const cCardTrigger = document.getElementById('infosysSuiteCard'); // the card you click to open it
  const cCloseBtn    = document.getElementById('closeCertModalBtn');// the "X" button
  const cTrack       = document.getElementById('certTrack');        // the horizontally-scrolling strip
  const cThumb       = document.getElementById('certScrollIndicatorThumb'); // progress bar fill
  const cLeftBtn     = document.getElementById('certSlideLeftBtn'); // left arrow
  const cRightBtn    = document.getElementById('certSlideRightBtn');// right arrow

  // Keeps the progress bar + 3D tilt/scale effect on each cert card
  // in sync with how far the user has scrolled the strip.
  function updateCertScrollHUD() {
    if(!cTrack || !cThumb) return;
    const cards = cTrack.querySelectorAll('.project-slide-card');
    const trackCenter = cTrack.scrollLeft + cTrack.clientWidth / 2;
    const maxScroll = cTrack.scrollWidth - cTrack.clientWidth;

    cards.forEach(card => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distanceFromCenter = cardCenter - trackCenter;
      const normalizedDistance = distanceFromCenter / (cTrack.clientWidth / 2);

      const rotationAngle = Math.max(-25, Math.min(25, normalizedDistance * -20));
      const targetScale = Math.max(0.85, 1 - Math.abs(normalizedDistance) * 0.12);

      card.style.transform = `scale(${targetScale}) rotateY(${rotationAngle}deg)`;
    });

    if (maxScroll <= 0) return;
    const percentage = (cTrack.scrollLeft / maxScroll) * 100;
    // 0.909 = 100 / 11, because there are 11 certificate cards in this track
    cThumb.style.left = `${percentage * 0.909}%`; // Configured perfectly across 11 layout nodes
  }

  // Clicking the "Infosys Full-Stack Suite" card opens the modal,
  // locks page scrolling (so only the modal's own strip scrolls),
  // and refreshes the HUD once the modal is visible/measurable.
  if(cCardTrigger) {
    cCardTrigger.addEventListener('click', () => {
      cModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(updateCertScrollHUD, 100);
    });
  }

  // Shared close routine: hides the modal and restores page scrolling.
  function closeCertificateSliderView() {
    cModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Close via the "X" button...
  if(cCloseBtn) cCloseBtn.addEventListener('click', closeCertificateSliderView);

  // ...or by clicking on the dark backdrop outside the modal content.
  if(cModal) {
    cModal.addEventListener('click', (e) => {
      if(e.target === cModal) closeCertificateSliderView();
    });
  }

  // Wire up scrolling (mouse drag / trackpad / touch) and the arrow buttons.
  if(cTrack) {
    cTrack.addEventListener('scroll', updateCertScrollHUD);
    window.addEventListener('resize', updateCertScrollHUD);
    cLeftBtn.addEventListener('click', () => cTrack.scrollBy({ left: -320, behavior: 'smooth' }));
    cRightBtn.addEventListener('click', () => cTrack.scrollBy({ left: 320, behavior: 'smooth' }));
  }

/* ----------------------------------------------------------------------------
   6. HERO TYPING EFFECT (rotating job-title console text)
   ---------------------------------------------------------------------------- */
  /* CUSTOM CONSOLE COMMAND DRIVER TYPING CONTROLLER */
  document.addEventListener("DOMContentLoaded", () => {
    const words = [
      "AI/ML_Enthusiast()", 
      "Data_Scientist()", 
      "AI_Engineer()", 
      "Gen_AI_Developer()", 
      "Data_Analyst()", 
      "Business_Analyst()"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const targetElement = document.getElementById("typedFrame");

    function typeLoop() {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        targetElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        targetElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentWord.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
      }

      setTimeout(typeLoop, speed);
    }

    if (targetElement) typeLoop();
  });
