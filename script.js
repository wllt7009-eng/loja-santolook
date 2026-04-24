// Lightweight JS for interactions and animations (pure JS)
document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Nav toggle (mobile)
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  navToggle && navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  // Header background on scroll
  const header = document.getElementById('header');
  const switchHeader = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
      header.classList.remove('transparent');
    } else {
      header.classList.remove('scrolled');
      header.classList.add('transparent');
    }
  };
  switchHeader();
  window.addEventListener('scroll', switchHeader, { passive: true });

  // Smooth scroll for anchor links (improved control)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 16; // small offset for header breathing
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Reveal on scroll using IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  reveals.forEach(el => observer.observe(el));

  // Optional: lazy-loading enhancement for images (swap srcset if you create webp variations)
  // Example: if you provide data-srcset attributes, this will set srcset when image is near viewport
  const images = document.querySelectorAll('img[loading="lazy"]');
  const imgObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.srcset) img.srcset = img.dataset.srcset;
        // If using data-src for lower-res placeholders:
        if (img.dataset.src) img.src = img.dataset.src;
        obs.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  images.forEach(img => imgObserver.observe(img));

  // Accessibility: close mobile nav on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !navToggle.contains(e.target) && nav.classList.contains('open')) {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Optional product caption reveal on touch (for devices that don't have hover)
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('touchstart', () => {
      card.classList.toggle('touched');
    }, { passive: true });
  });

  // Small performance tip: preconnect to fonts
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = 'https://fonts.gstatic.com';
  document.head.appendChild(link);
});
