/* ===================================================
   EASTER-EGG: Пасхалка — коза, корова, конь + конфетти
   =================================================== */

(function() {
  'use strict';
  

  document.addEventListener('DOMContentLoaded', function() {

    /* ---------- Состояние найденных животных ---------- */
    var foundAnimals = { horse: false, cow: false, goat: false };
    var allFound = false;

    var animalEls = {
      horse: document.getElementById('easter-horse-wrap'),
      cow: document.getElementById('easter-cow-wrap'),
      goat: document.getElementById('easter-goat-wrap')
    };

    /* ---------- Проверка: все ли найдены? ---------- */
    function checkAllFound() {
      if (foundAnimals.horse && foundAnimals.cow && foundAnimals.goat && !allFound) {
        allFound = true;
        setTimeout(showEasterModal, 400);
      }
    }

    /* ---------- Обработчики кликов на животных ---------- */
    Object.keys(animalEls).forEach(function(key) {
      var el = animalEls[key];
      if (el) {
        el.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (!foundAnimals[key]) {
            foundAnimals[key] = true;
            el.classList.add('found');
            var label = el.querySelector('.label');
            if (label) label.textContent = 'Найдено! ✓';
            checkAllFound();
          }
        });
      }
    });

    /* ---------- Показ модального окна ---------- */
    function showEasterModal() {
      var overlay = document.getElementById('easter-modal');
      if (overlay) {
        overlay.classList.add('show');
        launchConfetti();
      }
    }

    /* ---------- Закрытие модалки ---------- */
    var modalClose = document.querySelector('.easter-modal-close');
    var modalOverlay = document.getElementById('easter-modal');

    if (modalClose) {
      modalClose.addEventListener('click', function() {
        modalOverlay.classList.remove('show');
      });
    }

    if (modalOverlay) {
      modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
          modalOverlay.classList.remove('show');
        }
      });
    }

    /* ---------- Конфетти ---------- */
    function launchConfetti() {
      var container = document.createElement('div');
      container.className = 'confetti-container';
      document.body.appendChild(container);

      var colors = ['#1F5C63', '#C97A3D', '#D98E4F', '#2C6E75', '#E8B877', '#fff'];

      for (var i = 0; i < 80; i++) {
        var confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.animationDuration = Math.random() * 2 + 1.5 + 's';
        confetti.style.animationDelay = Math.random() * 0.8 + 's';
        container.appendChild(confetti);
      }

      setTimeout(function() { container.remove(); }, 4000);
    }
  });
})();
