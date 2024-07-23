const startBtn = document.getElementById('start-btn');
const preloader = document.getElementById('preloader');
const status = document.querySelector('.status');
const game = document.querySelector('.gameBody');
const rules = document.getElementById('rules');
const returnToGame = document.getElementById('returnToGame');
const cardWrap = document.querySelector('.cardWrap');
const cardRules = document.querySelector('.cardRules');
let cards = document.querySelectorAll('.card');
let time = document.querySelectorAll('.timer');
let banner = document.querySelector('.banner');
let restartBtn = document.getElementById('restart-btn');

let colors = ['red', 'blue', 'green', 'yellow', 'pink', 'purple'];
// duplicate color array
let duplicatedColors = colors.concat(colors);
let clickedtile = null;
let count = 0;
let timer = null;
let timeLeft;

function startTimer() {
  let seconds = 120; // 2 minutes = 120 seconds
  timer = setInterval(() => {
    seconds--;
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    let h = '00';
    let m = minutes < 10 ? '0' + minutes : minutes;
    let s = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    time.forEach((time) => {
      time.textContent = `${h}:${m}:${s}`;
    });

    if (seconds === 10) {
      banner.style.display = 'block';
      banner.innerHTML = 'Hurry up! 10 secs left';
    }
    if (seconds === 6) {
      banner.style.display = 'none';
    }
    if (seconds === 0) {
      clearInterval(timer);
      timeLeft = seconds;
      // end the game is countdown is complete
      endGame();
    }
  }, 1000);
}
function stopTimer() {
  clearInterval(timer);
  timer = false;
}
function shuffleArray(array) {
    // Fisher-Yates Shuffle Algorithm
    // Iterate through the duplicated color array, generate a random number and get the position of the color in the array using the randonmly generated number. Then swap the positions of the two colors.
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
  
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  let shuffledColors;
  function shuffleColors() {
    
    shuffledColors = shuffleArray(duplicatedColors);
    console.log(shuffledColors);
   
    cards.forEach((card, index) => {
      card.setAttribute('data-color', shuffledColors[index]);
    });
  }
  // start game
  startBtn.addEventListener('click', () => {
    preloader.style.display = 'none';
    game.style.display = 'flex';
    shuffleColors();
    startTimer();
  });
  
  // restart game
  restartBtn.addEventListener('click', () => {
    location.reload();
    
  });
  console.log(count);
  console.log(timeLeft);
  
  // navigate to back of game card to view rules
  rules.addEventListener('click', () => {
    cardWrap.style.display = 'none';
    cardRules.style.display = 'block';
  });
  // flip card back to see game
  returnToGame.addEventListener('click', () => {
    cardWrap.style.display = 'block';
    cardRules.style.display = 'none';
  });
  
  cards.forEach((card, index) => {
    card.addEventListener(
      'click',
  
      function onTileClicked(e) {
        // set the current target for the event.
        let clicked = e.currentTarget;
  console.log(clicked)
        card.style.backgroundColor = shuffledColors[index];
  
        // if two tiles match or contains a disabled class, stop code
        if (clicked === clickedtile || clicked.className.includes('disabled')) {
          clickedtile = null;
          return;
        };
      
