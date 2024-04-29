const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Islamabad"],
    answer: "Paris",
  },
  {
    question: "What is largest planet in our solar system?",
    options: ["Brazil", "Germeny", "France", "Argentina"],
    answer: "France",
  },
  {
    question: "Which country won the FIFA world cup in 2018?",
    options: ["Paris", "Berlin", "Madrid", "Islamabad"],
    answer: "Paris",
  },
  {
    question: "What is the tallest mountain in the world?",
    options: ["Mount Everest", "K2", "Kangchenjunga", "Makalu"],
    answer: "Mount Everest",
  },
  {
    question: "Which is the largest ocean on Earth?",
    options: [
      "Pacific Ocean",
      "Indian Ocean",
      "Atlantic Ocean",
      "Arctic Ocean",
    ],
    answer: "Pacific Ocean",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Cu", "Fe"],
    answer: "Au",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Pablo Picasso",
      "Vincent van Gogh",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    answer: "Leonardo da Vinci",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Mercury", "Uranus"],
    answer: "Mars",
  },
  {
    question: "What is the largest species of shark?",
    options: [
      "Great White Shark",
      "Whale Shark",
      "Tiger Shark",
      "Hammerhead Shark",
    ],
    answer: "Whale Shark",
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    options: ["Lion", "Tiger", "Elephant", "Giraffe"],
    answer: "Lion",
  },
];

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");
const showAnswerButton = document.getElementById("showAnswer");

let currQuestions = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0 i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


function displayQuestion() {
  const questionData = quizData[currQuestions];
  const questionElement = document.createElement("div");
  questionElement.className = "question";
  questionElement.innerHTML = questionData.question;
  const optionElement = document.createElement("div");
  optionElement.className = "options";

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions; i++) {
    const option = document.createElement("label");
    option.className = "option";
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz";
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);
    option.appendChild(radio);
    option.appendChild(optionText);
    optionElement.appendChild(option);
  }

  quizContainer.innerHTML = "";
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionElement);

}

function checkAnswer() {
  const selectedOption = document.querySelector("input[name = 'quiz']:checked");
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currQuestions].answer) {
      score++;
    }
    else {
      incorrectAnswers.push({
        question: quizData[currQuestions].question,
        incorrectAnswers: answer,
        correctAnswer: quizData[currQuestions].answer,
      });
    }
    currQuestions++;
    selectedOption.checked = false;
    if (currQuestions < quizData.length) {
      displayQuestion();
    }
    else {
      displayResult();
    }
  }
}

function displayResult(){
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "inline-block";
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz(){
  currQuestions = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = "block";
  submitButton.style.display = "inline-block";
  retryButton.style.display = "none";
  showAnswerButton.style.display = "none";
  resultContainer.innerHTML = "";
  displayQuestion();
}

function showAnswer(){
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "none";

   let incorrectAnswersHtml = "";
   for(let i=0 ;i<incorrectAnswers.length; i++){
incorrectAnswersHtml +=`
<p>
<strong>Question : </strong> ${incorrectAnswers[i].question}<br>
<strong>Your Answer : </strong> ${incorrectAnswers[i].incorrectAnswers}<br>
<strong>Correct Answer : </strong> ${incorrectAnswers[i].correctAnswer}<br>
</p>
`;
   }
}

resultContainer.innerHTML = `
<p>You scored ${score} out of ${quizData.length}!</p>
<p>Incorrect Answers : </p>
${incorrectAnswers}
`;

submitButton.addEventListener("click" , checkAnswer);
retryButton.addEventListener("click" , retryQuiz);
showAnswerButton.addEventListener("click" , showAnswer);

displayQuestion();