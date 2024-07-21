const startBtn = document.getElementById('start-btn');
const preloader = document.getElementById('preloader');
const game = document.querySelector('.gameBody');


let time = document.querySelectorAll('.timer');




let timer = null;
let timeLeft;



// start game
startBtn.addEventListener('click', () => {
  preloader.style.display = 'none';
  game.style.display = 'flex';
  startTimer();
});



function startTimer() {
  let seconds = 300; // 5 minutes = 300 seconds
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
      console.log('Hurry up 10 secs left');
    }
    if (seconds === 0) {
      clearInterval(timer);

      timeLeft = seconds;
      endGame();
    }
  }, 1000);
}