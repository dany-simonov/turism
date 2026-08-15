/* ===================================================
   ROADMAP-SLIDER: Скрипт интерактивного слайдера маршрута
   =================================================== */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('roadmap-track');
    const prevBtn = document.getElementById('roadmap-prev');
    const nextBtn = document.getElementById('roadmap-next');
    const badge = document.getElementById('roadmap-step-badge');

    if (!track || !prevBtn || !nextBtn) return;

    const cards = track.querySelectorAll('.roadmap-card');
    if (!cards.length) return;

    let currentIndex = 0;

    function updateSlider() {
      // Подсветка активной карточки
      cards.forEach((card, idx) => {
        if (idx === currentIndex) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });

      // Прокрутка трека к текущей карточке
      const targetCard = cards[currentIndex];
      if (targetCard) {
        const trackRect = track.getBoundingClientRect();
        const cardRect = targetCard.getBoundingClientRect();
        const scrollOffset = cardRect.left - trackRect.left + track.scrollLeft - 20;

        track.scrollTo({
          left: scrollOffset,
          behavior: 'smooth'
        });
      }

      // Обновление состояния кнопок
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === cards.length - 1;

      // Обновление плашки
      if (badge && cards[currentIndex]) {
        const title = cards[currentIndex].querySelector('.roadmap-card-title').textContent;
        badge.innerHTML = `📍 Точка ${currentIndex + 1} из ${cards.length}: <strong>${title}</strong>`;
      }
    }

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentIndex < cards.length - 1) {
        currentIndex++;
        updateSlider();
      }
    });

    // Клик по любой карточке выбирает её
    cards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        currentIndex = idx;
        updateSlider();
      });
    });

    // Определение текущей карточки при ручном скролле
    let scrollTimeout;
    track.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const trackLeft = track.getBoundingClientRect().left;
        let minDiff = Infinity;
        let closestIdx = 0;

        cards.forEach((card, idx) => {
          const diff = Math.abs(card.getBoundingClientRect().left - trackLeft);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = idx;
          }
        });

        if (closestIdx !== currentIndex) {
          currentIndex = closestIdx;
          updateSlider();
        }
      }, 100);
    });

    updateSlider();
  });
})();
