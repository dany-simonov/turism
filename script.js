/* ===================================================
   ЦИФРОВОЙ НОМАД: ИССЫК-КУЛЬСКОЕ КОЛЬЦО — СКРИПТ
   Scroll-анимации, табы дней, навигация, пасхалка
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Навигация: скролл-эффект ---------- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2. Мобильное меню ---------- */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = mobileToggle.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translateY(7px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Закрыть меню при клике на ссылку
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  /* ---------- 3. Scroll-анимации (fade-in) ---------- */
  const fadeEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => observer.observe(el));

  /* ---------- 4. Табы «День за днём» ---------- */
  const tabs = document.querySelectorAll('.day-tab');
  const contents = document.querySelectorAll('.day-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const day = tab.dataset.day;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      contents.forEach(c => {
        c.classList.remove('active');
        if (c.dataset.day === day) {
          c.classList.add('active');
        }
      });
    });
  });

  /* ---------- 5. ПАСХАЛКА: Коза, Корова, Конь ---------- */
  const foundAnimals = { horse: false, cow: false, goat: false };
  let allFound = false;

  const animalEls = {
    horse: document.getElementById('easter-horse'),
    cow: document.getElementById('easter-cow'),
    goat: document.getElementById('easter-goat')
  };

  function checkAllFound() {
    if (foundAnimals.horse && foundAnimals.cow && foundAnimals.goat && !allFound) {
      allFound = true;
      setTimeout(showEasterModal, 400);
    }
  }

  Object.keys(animalEls).forEach(key => {
    const el = animalEls[key];
    if (el) {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!foundAnimals[key]) {
          foundAnimals[key] = true;
          el.classList.add('found');
          el.title = 'Найдено! ✓';
          checkAllFound();
        }
      });
    }
  });

  function showEasterModal() {
    const overlay = document.getElementById('easter-modal');
    if (overlay) {
      overlay.classList.add('show');
      launchConfetti();
    }
  }

  // Закрытие модалки
  const modalClose = document.querySelector('.easter-modal-close');
  const modalOverlay = document.getElementById('easter-modal');
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('show');
    });
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('show');
      }
    });
  }

  /* ---------- 6. Конфетти ---------- */
  function launchConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);

    const colors = ['#1F5C63', '#C97A3D', '#D98E4F', '#2C6E75', '#E8B877', '#fff'];
    for (let i = 0; i < 80; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = Math.random() * 10 + 5 + 'px';
      confetti.style.height = Math.random() * 10 + 5 + 'px';
      confetti.style.animationDuration = Math.random() * 2 + 1.5 + 's';
      confetti.style.animationDelay = Math.random() * 0.8 + 's';
      container.appendChild(confetti);
    }

    setTimeout(() => container.remove(), 4000);
  }

  /* ---------- 7. Плавный скролл для якорных ссылок ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = header.offsetHeight + 20;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

});
