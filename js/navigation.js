/* ===================================================
   NAVIGATION: Скролл-эффект хедера + мобильное меню
   =================================================== */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    /* ---------- Скролл-эффект ---------- */
    function onScroll() {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Инициализация при загрузке

    /* ---------- Мобильное меню ---------- */
    var mobileToggle = document.querySelector('.mobile-toggle');
    var navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
      mobileToggle.addEventListener('click', function() {
        navLinks.classList.toggle('open');
        var spans = mobileToggle.querySelectorAll('span');
        if (navLinks.classList.contains('open')) {
          spans[0].style.transform = 'rotate(45deg) translateY(7px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
        } else {
          resetBurger(spans);
        }
      });

      // Закрыть меню при клике на ссылку
      navLinks.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
          navLinks.classList.remove('open');
          var spans = mobileToggle.querySelectorAll('span');
          resetBurger(spans);
        });
      });
    }

    function resetBurger(spans) {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
})();
