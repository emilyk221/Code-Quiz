// define elements
let timerEl = document.querySelector("#timer");
let startButtonEl = document.querySelector("#start");
let questionContainerEl = document.querySelector(".container");
let highScoresEl = document.querySelector("#high-scores");
let optContainerEl = document.createElement("div");
let ansContainerEl = document.createElement("div");
let formEl = document.querySelector(".form");
let formTextEl = document.querySelector("label");
let formBoxEl = document.querySelector("input");
let submitBtnEl = document.querySelector("#submit-btn");
let timeLeft = 75;
let currentQuestion = 0;
let highScores = [];

// an array of questions, answers, and answer options
let questions = [
  {
    question: "Commonly used data types do NOT include:",
    option1: "1. strings",
    option2: "2. boolean",
    option3: "3. alerts",
    option4: "4. numbers",
    answer: "3. alerts"
  },
  {
    question: "The condition in an if / else statement is enclosed with ________.",
    option1: "1. quotes",
    option2: "2. curly brackets",
    option3: "3. parenthesis",
    option4: "4. square brackets",
    answer: "3. parenthesis"
  },
  {
    question: "Arrays in JavaScript can be used to store _________.",
    option1: "1. numbers and strings",
    option2: "2. other arrays",
    option3: "3. booleans",
    option4: "4. all of the above",
    answer: "4. all of the above"
  },
  {
    question: "String values must be enclosed within _______ when being assigned to variables.",
    option1: "1. commas",
    option2: "2. curly brackets",
    option3: "3. quotes",
    option4: "4. parenthesis",
    answer: "3. quotes"
  },
  {
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
  // start timer
  countdown();

  // hide instructions and start button
  let instructions = document.querySelector("#main");
  instructions.textContent = "";
  startButtonEl.style.display = "none";

  optContainerEl.className = "answer-options";
  questionContainerEl.appendChild(optContainerEl);
  
  // start asking questions
  askQuestions();
}

let askQuestions = function() {
  let ansOptions = [];
  if (questions[currentQuestion] === undefined) {
    return false;
  }
  else {
    // display first/next question
    let questionEl = document.querySelector(".title");
    questionEl.textContent = questions[currentQuestion].question;
    questionEl.style.textAlign = "left";

    // create answer option buttons
    ansOptions = [questions[currentQuestion].option1, questions[currentQuestion].option2, questions[currentQuestion].option3, questions[currentQuestion].option4];

    for (let i = 0; i < ansOptions.length; i++) {
      let buttonExists = document.getElementById("btn" + i);

      // if answer option buttons already exist, change text content to match current question being asked
      if (buttonExists) {
        let optionEl = document.getElementById("btn" + i);
        optionEl.textContent = ansOptions[i];
        optionEl.setAttribute("option", ansOptions[i]);
      }

      //if answer option buttons don't exist, create them
      else {
        let optionEl = document.createElement("button");
        optionEl.textContent = ansOptions[i];
        optionEl.className = "button";
        optionEl.id = "btn" + i;
        optionEl.setAttribute("option", ansOptions[i]);
        optContainerEl.appendChild(optionEl);
      }
    }
  }
}

let checkAnswer = function(event) {
  // get target element from event
  let targetEl = event.target;

  if (targetEl.matches(".button")) {
    let chosenAns = targetEl.getAttribute("option");

    // if button clicked equals answer, display 'correct!'
    if (chosenAns === questions[currentQuestion].answer) {
      ansContainerEl.style.display = "flex";
      ansContainerEl.textContent = "Correct!";
      clearFeedback();
    }
    // if button clicked doesn't equal answer, display 'wrong!'
    else if (chosenAns !== questions[currentQuestion].answer) {
      ansContainerEl.style.display = "flex";
      ansContainerEl.textContent = "Wrong!";
      clearFeedback();
      // if wrong, deduct ten seconds from timer
      timeLeft -= 10;
      timerEl.textContent = "Time: " + timeLeft;
    }
    ansContainerEl.className = "feedback";
    questionContainerEl.appendChild(ansContainerEl);

    // move to next question in array and ask it
    currentQuestion++;
    askQuestions();
  }
}

// at end of questions cycle, display 'All Done!' page and form to submit initials
let endQuiz = function() {
  startButtonEl.style.display = "none";
  // display end of quiz title
  optContainerEl.style.display = "none";
  let titleEl = document.querySelector(".title");
  titleEl.textContent = "All Done!";
  titleEl.style.textAlign = "left";

  // display final score
  let scoreEl = document.querySelector("#main");
  let score = timerEl.getAttribute("score");
  scoreEl.textContent = "Your final score is " + score;
  scoreEl.style.textAlign = "left";

  // display text entry box for initials and submit button
  formEl.style.display = "flex";
}

let saveScore = function(event) {
  event.preventDefault();
  // get user submitted initials from input
  let initialsInput = document.querySelector("input[name='initials']").value;

  // get score from timeLeft on timer
  let scoreTime = timerEl.getAttribute("score");

  // create object of initials and score to be added to high score list and local storage
  let highScoresObj = {
    initials: initialsInput,
    score: scoreTime
  };

  highScores = localStorage.getItem("highScores");
  highScores = JSON.parse(highScores);
  // add new score object to high scores array
  highScores.push(highScoresObj);

  // store high scores array into local storage
  localStorage.setItem("highScores", JSON.stringify(highScores));

  // sort scores from high to low
  sortHighScores();
}

let displayHighScores = function() {
  // hide other elements
  let scoreEl = document.querySelector("#main");
  scoreEl.style.display = "none";
  startButtonEl.style.display = "none";
  formTextEl.style.display = "none";
  formBoxEl.style.display = "none";
  submitBtnEl.style.display = "none";
  ansContainerEl.style.display = "none";
  let headerEl = document.querySelector(".header");
  headerEl.style.display = "none";

  // display high scores title
  let titleEl = document.querySelector(".title");
  titleEl.textContent = "High Scores";
  titleEl.style.textAlign = "left";

  //display high scores table
  let scoresContainerEl = document.createElement("div");
  scoresContainerEl.className = "highscore";
  questionContainerEl.appendChild(scoresContainerEl);

  let scoresListEl = document.createElement("ul");
  scoresListEl.className = "highscore-table";
  scoresContainerEl.appendChild(scoresListEl);

  let highScores = localStorage.getItem("highScores");
  highScores = JSON.parse(highScores);

  for (i = 0; i < highScores.length; i++) {
    let scoreListItemEl = document.createElement("li");
    scoreListItemEl.textContent = (i + 1) + ". " + highScores[i].initials + " - " + highScores[i].score;
    scoreListItemEl.className = "score-list-item";
    scoresListEl.appendChild(scoreListItemEl);
  }

  // add back and clear buttons
  let buttonsContainerEl = document.createElement("div");
  buttonsContainerEl.className = "btn-container";
  scoresContainerEl.appendChild(buttonsContainerEl);

  let backBtnEl = document.createElement("button");
  backBtnEl.textContent = "Go back";
  backBtnEl.className = "button";
  backBtnEl.id = "go-back";
  buttonsContainerEl.appendChild(backBtnEl);

  let clearBtnEl = document.createElement("button");
  clearBtnEl.textContent = "Clear high scores";
  clearBtnEl.className = "button";
  clearBtnEl.id = "clear";
  buttonsContainerEl.appendChild(clearBtnEl);
}

let sortHighScores = function() {
  // get high scores from local storage
  let scoresArr = localStorage.getItem("highScores");
  if (!scoresArr) {
    return false;
  }

  // convert from string back to array
  scoresArr = JSON.parse(scoresArr);

  // sort array from local storage
  let newHighScores = scoresArr.sort((a, b) => {
    return b.score - a.score;
  });

  // only keep top five high scores
  if (newHighScores.length > 5) {
    newHighScores.pop();
  }

  localStorage.setItem("highScores", JSON.stringify(newHighScores));

  displayHighScores();
}

let buttonHandler = function(event) {
  // get target element from event
  let targetEl = event.target;

  // back button was clicked
  if (targetEl.matches("#go-back")) {
    location.reload();
  }
  // clear button was clicked
  else if (targetEl.matches("#clear")) {
    // hide scores table
    let scoreListEl = document.querySelector("ul");
    scoreListEl.style.display = "none";

    // clear high scores from local storage
    let scoresArr = localStorage.getItem("highScores");
    scoresArr = JSON.parse(scoresArr);
    scoresArr = [];
    localStorage.setItem("highScores", JSON.stringify(scoresArr));
  }
};

// hide feedback after displayed for 2 seconds
let clearFeedback = function() {
  setTimeout(function() {
    ansContainerEl.style.display = "none";
  }, 2000);
}

// countdown timer for quiz
let countdown = function() {
  let timeInterval = setInterval(function() {
    // if there are no more questions in the array, stop the timer
    if (questions[currentQuestion] === undefined && timeLeft >= 1) {
      timerEl.setAttribute("score", timeLeft);
      clearInterval(timeInterval);
      endQuiz();
    }
    // display time left
    if (timeLeft >= 1) {
      timerEl.setAttribute("score", timeLeft);
      timerEl.textContent = "Time: " + timeLeft;
      timeLeft--;
    }
    // if timer reaches 0, stop timer, display time of 0, and end quiz
    else {
      timerEl.textContent = "Time: 0";
      timerEl.setAttribute("score", 0);
      clearInterval(timeInterval);
      // call function to end quiz
      endQuiz();
    }
  }, 1000);
}

formEl.style.display = "none";

startButtonEl.addEventListener("click", startQuiz);
optContainerEl.addEventListener("click", checkAnswer);
submitBtnEl.addEventListener("click", saveScore);
questionContainerEl.addEventListener("click", buttonHandler);
highScoresEl.addEventListener("click", displayHighScores);