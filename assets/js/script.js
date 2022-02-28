let timerEl = document.querySelector("#timer");
let startButtonEl = document.querySelector("#start");
let questionContainerEl = document.querySelector(".container");
let optContainerEl = document.createElement("div");
let ansContainerEl = document.createElement("div");
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
  // start timer
  countdown();

  // hide instructions and start button
  let instructions = document.querySelector("#main");
  instructions.textContent = "";
  startButtonEl.remove();

  optContainerEl.className = "answer-options";
  questionContainerEl.appendChild(optContainerEl);
  
  // start asking questions
  askQuestions();
}

let askQuestions = function() {
  let ansOptions = [];
  if (questions[currentQuestion] === undefined) {
    //endQuiz();
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
      if (buttonExists) {
        let optionEl = document.getElementById("btn" + i);
        optionEl.textContent = ansOptions[i];
        optionEl.setAttribute("option", ansOptions[i]);
      }
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

  if (targetEl.matches("button")) {
    let chosenAns = targetEl.getAttribute("option");
    // if button clicked equals answer, display 'correct!'
    if (chosenAns === questions[currentQuestion].answer) {
      ansContainerEl.textContent = "Correct!";
    }
    // if button clicked doesn't equal answer, display 'wrong!'
    else {
      ansContainerEl.textContent = "Wrong!";
      // // if incorrect, deduct 10 seconds from timer
      // let score = timerEl.getAttribute("score");
      // timerEl.setAttribute("score", score - 10);
    }
  }

  ansContainerEl.className = "feedback";
  questionContainerEl.appendChild(ansContainerEl);

  // move to next question in array and ask it
  currentQuestion++;
  askQuestions();
}

// at end of questions cycle, display 'All Done!' page and form to submit initials
let endQuiz = function() {
  // display end of quiz title
  optContainerEl.remove();
  let titleEl = document.querySelector(".title");
  titleEl.textContent = "All Done!";
  titleEl.style.textAlign = "left";

  // display final score
  let scoreEl = document.querySelector("#main");
  let score = timerEl.getAttribute("score");
  scoreEl.textContent = "Your final score is " + score;
  scoreEl.style.textAlign = "left";

  // display text entry box for initials and submit button
  let formEl = document.createElement("div");
  formEl.className = "form";
  questionContainerEl.appendChild(formEl);

  let formTextEl = document.createElement("label");
  formTextEl.textContent = "Enter initials: ";
  formEl.appendChild(formTextEl);

  let formBoxEl = document.createElement("input");
  formBoxEl.innerHTML = "<input type='text' />";
  formEl.appendChild(formBoxEl);

  let submitBtnEl = document.createElement("button");
  submitBtnEl.textContent = "Submit";
  submitBtnEl.className = "button";
  submitBtnEl.id = "submit";
  formEl.appendChild(submitBtnEl);
} 

// countdown timer for quiz
let countdown = function() {
  let timeLeft = 75;

  let timeInterval = setInterval(function() {
    // if there are no more questions in the array, stop the timer
    if (questions[currentQuestion] === undefined && timeLeft >= 1) {
      //timeLeft = timerEl.getAttribute("score");
      timerEl.setAttribute("score", timeLeft);
      clearInterval(timeInterval);
      endQuiz();
    }
    if (timeLeft >= 1) {
      //timeLeft = timerEl.getAttribute("score");
      timerEl.setAttribute("score", timeLeft);
      timerEl.textContent = "Time: " + timeLeft;
      timeLeft--;
    }
    else {
      timerEl.textContent = "Time: 0";
      timerEl.setAttribute("score", 0);
      clearInterval(timeInterval);
      // call function to end quiz
      endQuiz();
    }
  }, 1000);
}

startButtonEl.addEventListener("click", startQuiz);
optContainerEl.addEventListener("click", checkAnswer);