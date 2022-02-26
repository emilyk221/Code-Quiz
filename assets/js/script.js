let timerEl = document.getElementById("timer");

// countdown timer for quiz
function countdown() {
  let timeLeft = 75;

  let timeInterval = setInterval(function() {
    if (timeLeft >= 1) {
      timerEl.textContent = "Time: " + timeLeft;
      timeLeft--;
    }
    // // stop timer when last question answered and display time left
    // else if () {
    //   clearInterval(timeInterval);
    //   timerEl.textContent = "Time: " + timeLeft;
    // }
    else {
      timerEl.textContent = "Time: 0";
      // call function to end quiz
    }
  }, 1000);
}

countdown();