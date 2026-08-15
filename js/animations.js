/* ===================================================
   ANIMATIONS: IntersectionObserver для fade-in элементов
   =================================================== */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    var fadeEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    if (!fadeEls.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeEls.forEach(function(el) {
      observer.observe(el);
    });
  });
})();
