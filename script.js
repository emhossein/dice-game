'use strict';

// Selecting elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Setting scores to 0
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEL.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

//rolling
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. display the dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    // 3. check for rolled 1: if true switch player if not add to current score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if score is >= 100
    if (scores[activePlayer] >= 100) {
      //finish
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEL.classList.add('hidden');
    } else {
      //switch
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

// ! just couldn't set player scores to 0 and its a little messy
// btnNew.addEventListener('click', function () {
//   if (playing) {
//     resetGame();
//     activePlayer = 0;
//     currentScore = 0;
//     diceEL.classList.add('hidden');
//   } else {
//     resetGame();
//     playing = true;
//     activePlayer = 0;
//     currentScore = 0;
//     diceEL.classList.add('hidden');
//   }
// });

// const resetGame = function () {
//     document.getElementById(`score--1`).textContent = 0;
//     document.getElementById(`score--0`).textContent = 0;
//     document.getElementById(`current--1`).textContent = 0;
//     document.getElementById(`current--0`).textContent = 0;
//     activePlayer = 0;
//     currentScore = 0;
//     diceEL.classList.add('hidden');
//

//     if (player1EL.classList.contains('player--active')) {
//       player1EL.classList.remove('player--active');
//       player0EL.classList.add('player--active');
//     } else if (
//       player0EL.classList.contains('player--winner') ||
//       player1EL.classList.contains('player--winner')
//     ) {
//       player1EL.classList.remove('player--winner');
//       player0EL.classList.remove('player--winner');
//       player0EL.classList.add('player--active');
//     }
//   };
