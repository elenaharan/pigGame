'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const rollDiceButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');
const newGameButton = document.querySelector('.btn--new');
const diceImage = document.querySelector('.dice');
const scorePlayer0 = document.getElementById('score--0');
const scorePlayer1 = document.getElementById('score--1');

let currentScore, activePlayer, scores, playing;

const init = function () {
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  scorePlayer0.textContent = 0;
  scorePlayer1.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  activePlayer = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceImage.classList.add('hidden');
  currentScore = 0;
  scores = [0, 0];
  playing = true;
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

rollDiceButton.addEventListener('click', function () {
  if (playing) {
    const diceCount = Math.trunc(Math.random() * 6 + 1);
    diceImage.classList.remove('hidden');
    diceImage.src = `dice-${diceCount}.png`;

    if (diceCount !== 1) {
      currentScore += diceCount;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdButton.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceImage.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('.player--active');
      document.getElementById(`current--${activePlayer}`).textContent = 0;
    } else {
      switchPlayer();
    }
  }
});

newGameButton.addEventListener('click', init);
