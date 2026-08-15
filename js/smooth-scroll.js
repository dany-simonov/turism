/* ===================================================
   SMOOTH-SCROLL: Плавный скролл для якорных ссылок
   =================================================== */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    var header = document.querySelector('.site-header');

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var href = this.getAttribute('href');
        if (href === '#') return;

        var target = document.querySelector(href);
        if (target) {
          var offset = header ? header.offsetHeight + 20 : 80;
          var targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
      });
    });
  });
})();
