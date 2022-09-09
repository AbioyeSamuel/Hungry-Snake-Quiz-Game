const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");

const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const wrong = document.getElementById("wrong");
const answerButtonsElement = document.getElementById("answer-buttons");
const letMePass = document.getElementById("gate-opens");
const snake = document.getElementById("snake-man");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

//  Start Game function
function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
  var oneMinutes = 60 * 1;
      display = document.getElementById("time");
  startTimer(oneMinutes, display);
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  answerButtonsElement.classList.remove("hide");

}

//  Displays questions when the start button is clicked
function showQuestion(question) {
  questionElement.innerText = question.question;
  questionElement.style.fontWeight = "bold";
  question.answer.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);;
    answerButtonsElement.appendChild(button);
  })
}

// reset the state of each question when nexted
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

// triggers on button click -  performs answer and button verification
function selectAnswer(e, button) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  answerButtonsElement.classList.add("hide");
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.classList.remove("hide");
    startButton.innerText = "Restart";
    startButton.addEventListener("click", restart);
    openGate();
    questionElement.innerText = "GameOver! Play Again";
    startButton.classList.remove("hide");
  }
}

// Status update
function setStatusClass(element, correct) {
  var lastElement = document.getElementById("bod").lastElementChild;
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
    addToSnake(correct);
  } else {
    element.classList.add("wrong");
    lastElement.remove();
    questionElement.innerText = "Wrong!";
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

// Increase snake by 1m if correct
function addToSnake(correct) {
  var img = document.createElement("img");
  img.src = "body.jpg";
  var src = document.getElementById("bod");
  if (correct) {
    src.appendChild(img);
    questionElement.innerText = "Correct!";
  }
}

// Open gate function to be initiated when snake is 10 m long
function openGate(open) {
  var q1 = Number(questions[0].answer[1].correct);
  var q2 = Number(questions[1].answer[0].correct);
  var q3 = Number(questions[2].answer[0].correct);
  var q4 = Number(questions[3].answer[1].correct);
  var q5 = Number(questions[4].answer[0].correct);
  var q6 = Number(questions[5].answer[0].correct);
  var q7 = Number(questions[6].answer[1].correct);
  var q8 = Number(questions[7].answer[0].correct);
  var q9 = Number(questions[8].answer[1].correct);
  var q10 = Number(questions[9].answer[1].correct);

  var total = q1 + q2 + q3 + q4 + q5 + q6 + q7 + q8 + q9 + q10;
  var condition = questions.length;

  if (total == condition) {
    letMePass.innerText = "OPENED!";
    letMePass.style.color = "white";
    snake.innerText = "Mr Snakey : Thanks for answering correctly, I'm gonna go eat some snack";
  } else {
    letMePass.innerText = "CLOSED!";
    snake.innerText = "Mr Snakey : You got some answers wrong. Kindly try again, so that I'll eat!";
  }
}

// restart function
function restart() {
  window.location.reload();
}

// set Timer
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var x = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
            clearInterval(x)
            snake.innerHTML = "<p><strong>Time Out! Prepare Well</strong></p>";
            questionContainerElement.classList.add("hide");
            questionElement.classList.add("hide");
            answerButtonsElement.classList.add("hide");
            startButton.classList.remove("hide");
            startButton.innerText = "Restart";
            startButton.addEventListener("click", restart);
            nextButton.classList.add("hide");
            // setTimeout(restart, 5000);
        }
    }, 1000);
}




// Question bank array
const questions = [{
    question: "Question: If 2x - 321 = 7, find the value of x.",
    answer: [{
        text: "154",
        correct: false
      },
      {
        text: "164",
        correct: true
      }
    ]
  },
  {
    question: "Question: Find the average of the following numbers : 2, 7, 8, 2",
    answer: [{
        text: "9.5",
        correct: true
      },
      {
        text: "10",
        correct: false
      }
    ]
  },
  {
    question: "Question: It takes 5 men 4 days do dig a well, how many days will it take 4 men if they work at the same rate?",
    answer: [{
        text: "5",
        correct: true
      },
      {
        text: "4",
        correct: false
      }
    ]
  },
  {
    question: "Question: A tuber of yam cost 1.5 indian rupees. Calculate the cost of 5 tubers.",
    answer: [{
        text: "9",
        correct: false
      },
      {
        text: "7.5",
        correct: true
      }
    ]
  },
  {
    question: "Question: If (5x - 3)/2 = 11 , Find the value of x?",
    answer: [{
        text: "5",
        correct: true
      },
      {
        text: "4",
        correct: false
      }
    ]
  },
  {
    question: "Question: What is 5% discount of 5000?",
    answer: [{
        text: "10",
        correct: true
      },
      {
        text: "5",
        correct: false
      }
    ]
  },
  {
    question: "Question: The largest carnivore in the world is?",
    answer: [{
        text: "Bengal Tiger",
        correct: false
      },
      {
        text: "Polar Bear",
        correct: true
      }
    ]
  },
  {
    question: "Question: Solve for x in (2( 2x + 2(3) ) - 8) = 0",
    answer: [{
        text: "-1",
        correct: true
      },
      {
        text: "1",
        correct: false
      }
    ]
  },
  {
    question: "Question: In history, the largest shark to ever exist is named?",
    answer: [{
        text: "Carcharodon",
        correct: false
      },
      {
        text: "Megalodon",
        correct: true
      }
    ]
  },
  {
    question: "Question: Is my hungry-snake game simple and will you hire me?",
    answer: [{
        text: "No",
        correct: false
      },
      {
        text: "Yes",
        correct: true
      }
    ]
  }
]
// Project Completed
