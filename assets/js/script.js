let timerEl = document.querySelector("#timer");
let startButtonEl = document.querySelector("#start");
let currentQuestion = 0;

// an array of questions, answers, and answer options
let questions = [
  {
    id: 0,
    question: "Commonly used data types do NOT include:",
    option1: "1. strings",
    option2: "2. boolean",
    option3: "3. alerts",
    option4: "4. numbers",
    answer: "3. alerts"
  },
  {
    id: 1,
    question: "The condition in an if / else statement is enclosed with ________.",
    option1: "1. quotes",
    option2: "2. curly brackets",
    option3: "3. parenthesis",
    option4: "4. square brackets",
    answer: "3. parenthesis"
  },
  {
    id: 2,
    question: "Arrays in JavaScript can be used to store _________.",
    option1: "1. numbers and strings",
    option2: "2. other arrays",
    option3: "3. booleans",
    option4: "4. all of the above",
    answer: "4. all of the above"
  },
  {
    id: 3,
    question: "String values must be enclosed within _______ when being assigned to variables.",
    option1: "1. commas",
    option2: "2. curly brackets",
    option3: "3. quotes",
    option4: "4. parenthesis",
    answer: "3. quotes"
  },
  {
    id: 4,
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    option1: "1. JavaScript",
    option2: "2. terminal/bash",
    option3: "3. for loops",
    option4: "4. console.log",
    answer: "4. console.log"
  }
]

// FUNCTIONS

let startQuiz = function() {
  countdown();
  // display first question and answer option buttons
  // wait for click
  // display feedback
  // display next question/answer option buttons combo
}

let displayFeedback = function() {
  // if button clicked equals answer, display 'correct!'
  // if button clicked doesn't equal answer, display 'wrong!'
  // if incorrect, deduct 10 seconds from timer
}

// countdown timer for quiz
let countdown = function() {
  let timeLeft = 75;

  let timeInterval = setInterval(function() {
    // if there are no more questions in the array, stop the timer
    if (questions[currentQuestion] === undefined) {
      clearInterval(timeInterval);
    }
    if (timeLeft >= 1) {
      timerEl.textContent = "Time: " + timeLeft;
      timeLeft--;
    }
    else {
      timerEl.textContent = "Time: 0";
      // call function to end quiz
    }
  }, 1000);
}

startButtonEl.addEventListener("click", startQuiz);