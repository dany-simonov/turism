/* ===================================================
   DAYS-TABS: Переключение табов «День за днём»
   =================================================== */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    var tabs = document.querySelectorAll('.day-tab');
    var contents = document.querySelectorAll('.day-content');
    if (!tabs.length) return;

    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        var day = tab.dataset.day;

        // Деактивируем все табы
        tabs.forEach(function(t) { t.classList.remove('active'); });
        tab.classList.add('active');

        // Переключаем контент
        contents.forEach(function(c) {
          c.classList.remove('active');
          if (c.dataset.day === day) {
            c.classList.add('active');
          }
        });
      });
    });
  });
})();
