const BASE_URL = "https://opentdb.com/api.php?";

const fetchQuizQuestions = async (query) => {
  const queryParams = [];
  if (query.type !== "") queryParams.push(`type=${query.type}`);

  if (query.category !== "") queryParams.push(`category=${query.category}`);

  if (query.difficulty !== "")
    queryParams.push(`difficulty=${query.difficulty}`);

  if (query.amount) queryParams.push(`amount=${query.amount}`);

  const url = `${BASE_URL}${queryParams.join("&")}`;
  const response = await fetch(url);
  if (!response.ok)
    throw {
      message: "Failed to fetch data from server of questions",
      status: res.status,
      statusText: res.statusText,
    };
  const data = await response.json();
  if (
    data === undefined ||
    data.results === undefined ||
    data.results.length === 0
  )
    throw {
      message: "No questions found for given criteria",
      status: res.status,
      statusText: res.statusText,
    };
  console.log(data);
  return data.results.map((item) => ({
    question: item.question,
    answer: item.correct_answer,
    options: [...item.incorrect_answers, item.correct_answer].sort(
      () => Math.random() - 0.5
    ),
  }));
};

const parseQueryParams = (url) => {
  const queryParams = {};
  const queryString = url.split("?")[1];
  if (queryString) {
    const pairs = queryString.split("&");
    pairs.forEach((pair) => {
      const [key, value] = pair.split("=");
      queryParams[key] = decodeURIComponent(value);
    });
  }
  return queryParams;
};

const currentUrl = window.location.href;
const queryParams = parseQueryParams(currentUrl);
const category = queryParams["category"] || "";
const difficulty = queryParams["difficulty"] || "";
const type = queryParams["type"] || "";
const amount = queryParams["amount"] || "";

const query = {
  category,
  difficulty,
  type,
  amount,
};

let quizData = [];

const fetchQuizData = async () => {
  try {
    quizData = await fetchQuizQuestions(query);
    console.log(quizData);
  } catch (error) {
    console.log(error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  fetchQuizData();

  const quizContainer = document.getElementById("quiz");
  const resultContainer = document.getElementById("result");
  const submitButton = document.getElementById("submit");
  const retryButton = document.getElementById("retry");
  const showAnswerButton = document.getElementById("showAnswer");

  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function displayQuestion() {
    if(quizData.length === 0) return setTimeout(displayQuestion, 1000);
    const questionData = quizData[currentQuestion];

    console.log(questionData);

    const questionElement = document.createElement("div");
    questionElement.className = "question";
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement("div");
    optionsElement.className = "options";

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement("label");
      option.className = "option";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.value = shuffledOptions[i];

      const optionText = document.createTextNode(shuffledOptions[i]);

      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = "";
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }

  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }

  function displayResult() {
    quizContainer.style.display = "none";
    submitButton.style.display = "none";
    retryButton.style.display = "inline-block";
    showAnswerButton.style.display = "inline-block";
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }

  function retryQuiz() {
    // currentQuestion = 0;
    // score = 0;
    // incorrectAnswers = [];
    // quizContainer.style.display = "block";
    // submitButton.style.display = "inline-block";
    // retryButton.style.display = "none";
    // showAnswerButton.style.display = "none";
    // resultContainer.innerHTML = "";
    // displayQuestion();
    window.location.href = "index.html"
  }

  function showAnswer() {
    quizContainer.style.display = "none";
    submitButton.style.display = "none";
    retryButton.style.display = "inline-block";
    showAnswerButton.style.display = "none";

    let incorrectAnswersHtml = "";
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }

    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }

  submitButton.addEventListener("click", checkAnswer);
  retryButton.addEventListener("click", retryQuiz);
  showAnswerButton.addEventListener("click", showAnswer);

  displayQuestion();
});
