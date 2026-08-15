/* ===================================================
   GAMES: Скрипты 3 мини-игр + Виджет-переключатель
   =================================================== */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initGamesWidget();
    initMemoryGame();
    initRouteGame();
    initQuizGame();
  });

  /* ===================================================
     0. ВИДЖЕТ-ПЕРЕКЛЮЧАТЕЛЬ ИГР
     =================================================== */
  function initGamesWidget() {
    const tabBtns = document.querySelectorAll('.game-tab-btn');
    const gameBlocks = document.querySelectorAll('.game-block');

    if (!tabBtns.length || !gameBlocks.length) return;

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const gameId = btn.dataset.game;

        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        gameBlocks.forEach(block => {
          block.classList.remove('active');
          if (block.id === `game-block-${gameId}`) {
            block.classList.add('active');
          }
        });
      });
    });
  }

  /* ===================================================
     1. МИНИ-ИГРА: «НАЙДИ ПАРУ» (Memory Game)
     =================================================== */
  function initMemoryGame() {
    const grid = document.getElementById('memory-grid');
    const movesEl = document.getElementById('memory-moves');
    const timerEl = document.getElementById('memory-timer');
    const restartBtn = document.getElementById('memory-restart');
    const resultEl = document.getElementById('memory-result');
    const scoreText = document.getElementById('memory-score-text');

    if (!grid) return;

    const items = ['🏔️', '⛺', '🐎', '🌊', '🌲', '🦅'];
    let cards = [...items, ...items];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let timer = 0;
    let timerInterval = null;
    let isBusy = false;

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function startTimer() {
      stopTimer();
      timer = 0;
      timerEl.textContent = '00:00';
      timerInterval = setInterval(() => {
        timer++;
        const mins = String(Math.floor(timer / 60)).padStart(2, '0');
        const secs = String(timer % 60).padStart(2, '0');
        timerEl.textContent = `${mins}:${secs}`;
      }, 1000);
    }

    function stopTimer() {
      if (timerInterval) clearInterval(timerInterval);
    }

    function resetGame() {
      stopTimer();
      grid.innerHTML = '';
      moves = 0;
      matchedPairs = 0;
      movesEl.textContent = '0';
      timerEl.textContent = '00:00';
      resultEl.classList.remove('show');
      flippedCards = [];
      isBusy = false;

      cards = shuffle([...items, ...items]);

      cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.symbol = symbol;
        card.dataset.index = index;

        card.innerHTML = `
          <div class="memory-card-inner">
            <div class="memory-card-front">?</div>
            <div class="memory-card-back">${symbol}</div>
          </div>
        `;

        card.addEventListener('click', () => onCardClick(card));
        grid.appendChild(card);
      });
    }

    function onCardClick(card) {
      if (isBusy || card.classList.contains('flipped') || card.classList.contains('matched')) return;

      if (moves === 0 && timer === 0) {
        startTimer();
      }

      card.classList.add('flipped');
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        moves++;
        movesEl.textContent = moves;
        checkMatch();
      }
    }

    function checkMatch() {
      isBusy = true;
      const [c1, c2] = flippedCards;
      const isMatch = c1.dataset.symbol === c2.dataset.symbol;

      if (isMatch) {
        c1.classList.add('matched');
        c2.classList.add('matched');
        matchedPairs++;
        flippedCards = [];
        isBusy = false;

        if (matchedPairs === items.length) {
          stopTimer();
          showVictory();
        }
      } else {
        setTimeout(() => {
          c1.classList.remove('flipped');
          c2.classList.remove('flipped');
          flippedCards = [];
          isBusy = false;
        }, 900);
      }
    }

    function showVictory() {
      scoreText.textContent = `Вы нашли все пары за ${moves} ходов и ${timerEl.textContent}!`;
      resultEl.classList.add('show');
    }

    if (restartBtn) restartBtn.addEventListener('click', resetGame);

    resetGame();
  }

  /* ===================================================
     2. МИНИ-ИГРА: «СОБЕРИ МАРШРУТ» (Route Builder)
     =================================================== */
  function initRouteGame() {
    const pool = document.getElementById('route-pool');
    const seq = document.getElementById('route-seq');
    const restartBtn = document.getElementById('route-restart');
    const resultEl = document.getElementById('route-result');
    const textEl = document.getElementById('route-result-text');

    if (!pool || !seq) return;

    const correctOrder = [
      'Бишкек',
      'Башня Бурана',
      'Чон-Кемин',
      'Боконбаево',
      'Каньон Сказка',
      'Барскоон',
      'Каракол',
      'Ак-Суу',
      'Чолпон-Ата',
      'Боомское ущелье'
    ];

    let currentIndex = 0;

    function resetGame() {
      pool.innerHTML = '';
      seq.innerHTML = '<span style="font-size: 0.85rem; color: var(--text-muted);">Кликайте по точкам по порядку кольца</span>';
      resultEl.classList.remove('show');
      currentIndex = 0;

      const shuffled = [...correctOrder].sort(() => Math.random() - 0.5);

      shuffled.forEach(name => {
        const chip = document.createElement('button');
        chip.className = 'route-game-chip';
        chip.textContent = name;
        chip.dataset.name = name;
        chip.addEventListener('click', () => onChipClick(chip, name));
        pool.appendChild(chip);
      });
    }

    function onChipClick(chip, name) {
      if (currentIndex === 0) {
        seq.innerHTML = '';
      }

      if (name === correctOrder[currentIndex]) {
        chip.classList.add('correct');

        if (currentIndex > 0) {
          const arrow = document.createElement('span');
          arrow.className = 'route-game-arrow';
          arrow.textContent = '➔';
          seq.appendChild(arrow);
        }

        const placed = document.createElement('div');
        placed.className = 'route-game-placed';
        placed.innerHTML = `<span class="num">${currentIndex + 1}</span> ${name}`;
        seq.appendChild(placed);

        currentIndex++;

        if (currentIndex === correctOrder.length) {
          textEl.textContent = 'Потрясающе! Вы безупречно собрали кольцевой маршрут вокруг Иссык-Куля!';
          resultEl.classList.add('show');
        }
      } else {
        chip.classList.add('wrong');
        setTimeout(() => chip.classList.remove('wrong'), 500);
      }
    }

    if (restartBtn) restartBtn.addEventListener('click', resetGame);

    resetGame();
  }

  /* ===================================================
     3. МИНИ-ИГРА: «ГОРНЫЙ КВИЗ» (Quiz)
     =================================================== */
  function initQuizGame() {
    const card = document.getElementById('quiz-card');
    const restartBtn = document.getElementById('quiz-restart');

    if (!card) return;

    const questions = [
      {
        q: 'На какой примерно высоте над уровнем моря расположено озеро Иссык-Куль?',
        options: ['~800 метров', '~1608 метров', '~2500 метров', '~3100 метров'],
        correct: 1
      },
      {
        q: 'Какое блюдо является знаменитым гастрономическим символом города Каракол?',
        options: ['Бешбармак', 'Ашлян-фу', 'Самсы в тандыре', 'Лагман'],
        correct: 1
      },
      {
        q: 'Кто из знаменитых людей проходил реабилитацию после полёта в санатории в Тамге?',
        options: ['Юрий Гагарин', 'Лев Толстой', 'Николай Пржевальский', 'Чингиз Айтматов'],
        correct: 0
      },
      {
        q: 'Как кочевники называют Полярную звезду, используемую для ориентации в горах?',
        options: ['Жети Каракчы', 'Алтын Казык (Золотой кол)', 'Чолпон', 'Тянь-Шань'],
        correct: 1
      },
      {
        q: 'В чём особенность уникального памятного сертификата экотура?',
        options: ['Он сделан из чистого шёлка', 'В крафтовую бумагу впрессованы семена цветов', 'Он даёт бесплатный проезд', 'Он позолочен'],
        correct: 1
      }
    ];

    let currentQ = 0;
    let score = 0;

    function renderQuestion() {
      if (currentQ >= questions.length) {
        showResult();
        return;
      }

      const qData = questions[currentQ];

      card.innerHTML = `
        <div class="quiz-progress">
          ${questions.map((_, i) => `
            <div class="quiz-dot ${i === currentQ ? 'active' : ''} ${i < currentQ ? 'answered' : ''}"></div>
          `).join('')}
        </div>
        <div class="quiz-question-text">${qData.q}</div>
        <div class="quiz-options">
          ${qData.options.map((opt, i) => `
            <button class="quiz-option" data-index="${i}">${opt}</button>
          `).join('')}
        </div>
      `;

      card.querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', () => onOptionClick(btn, parseInt(btn.dataset.index)));
      });
    }

    function onOptionClick(btn, index) {
      const qData = questions[currentQ];
      const allBtns = card.querySelectorAll('.quiz-option');

      allBtns.forEach(b => b.style.pointerEvents = 'none');

      if (index === qData.correct) {
        btn.classList.add('selected-correct');
        score++;
      } else {
        btn.classList.add('selected-wrong');
        if (allBtns[qData.correct]) {
          allBtns[qData.correct].classList.add('highlight-correct');
        }
      }

      setTimeout(() => {
        currentQ++;
        renderQuestion();
      }, 1200);
    }

    function showResult() {
      const resultEl = document.getElementById('quiz-result');
      const textEl = document.getElementById('quiz-result-text');
      card.style.display = 'none';

      textEl.textContent = `Вы ответили правильно на ${score} из ${questions.length} вопросов! ${score >= 4 ? 'Отличный результат, знаток Тянь-Шаня!' : 'Хорошая попытка! Прочитайте описание тура и попробуйте снова.'}`;
      resultEl.classList.add('show');
    }

    function resetGame() {
      currentQ = 0;
      score = 0;
      card.style.display = 'block';
      const resultEl = document.getElementById('quiz-result');
      resultEl.classList.remove('show');
      renderQuestion();
    }

    if (restartBtn) restartBtn.addEventListener('click', resetGame);

    resetGame();
  }

})();
