const startSection = document.getElementById("start-section");
const startBtn = document.getElementById("start-btn");
const quizBox = document.getElementById("quiz-box");
const TimerEl = document.getElementById("timer");
const skipBtn = document.getElementById("skip-btn");
const questionTime = document.getElementById("question-timer");
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const resultBox = document.getElementById("result-box");
const quizScores = document.getElementById("score");
const restartQuiz = document.getElementById("restart-quiz");

// questions
let questions = [
  {
    question: "What is the capital of France",
    answers: ["Berlin", "Paris", "Rome", "Madrid"],
    correct: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Venus", "Earth", "Mars", "Jupiter"],
    correct: "Mars",
  },
  {
    question: "What is the chemical symbol for Water?",
    answers: ["O2", "H20", "H₂O", "HO2"],
    correct: "H₂O",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: [
      "William Shakespeare",
      "Charles Dickens",
      "Leo Tolstoy",
      "Mark Twain",
    ],
    correct: "William Shakespeare",
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    correct: "Pacific Ocean",
  },
  {
    question: "Which language is primarily used for Android app development?",
    answers: ["Swift", "Java", "Python", "C#"],
    correct: "Java",
  },
  {
    question: "What year did the internet become publicly available?",
    answers: ["1983", "1991", "2000", "1975"],
    correct: "1991",
  },
  {
    question: "Which element has the atomic number 1?",
    answers: ["Helium", "Hydrogen", "Oxygen", "Carbon"],
    correct: "Hydrogen",
  },
  {
    question: "What is the powerhouse of the cell?",
    answers: ["Nucleus", "Mitochondria", "Ribosome", "Golgi Apparatus"],
    correct: "Mitochondria",
  },
  {
    question: "In which country is the Great Pyramid of Giza located?",
    answers: ["Egypt", "Mexico", "Peru", "Sudan"],
    correct: "Egypt",
  },
  {
    question: "What city is known as The Eternal City?",
    answers: ["Egypt", "Mexico", "Peru", "Rome"],
    correct: "Rome",
  },
  {
    question: "What is the largest spanish-speaking city in the world?",
    answers: ["New York City", "Mexico City", "Lagos City", "Madrid City"],
    correct: "Mexico City",
  },
  {
    question: "Which country has the highest life expectancy?",
    answers: ["Egypt", "Mexico", "Hong Kong", "Sudan"],
    correct: "Hong Kong",
  },
  {
    question: "What is the 4th letter of the Greek alphabet?",
    answers: ["Alpha", "Bravo", "Delta", "Oscar"],
    correct: "Delta",
  },
];
// variables
const QUESTION_MARKS = 5;
const QUIZ_TIME_SECONDS = 120;
const QUESTION_TIME_SECONDS = 30;

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = QUIZ_TIME_SECONDS;
let questionTimeLeft = QUESTION_TIME_SECONDS;
let timerInterval = null;
let questionTimerInterval = null;
let shuffledQuestions = [];

function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

startBtn.onclick = () => {
  shuffledQuestions = shuffleArray([...questions]);
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = QUIZ_TIME_SECONDS;
  questionTimeLeft = QUESTION_TIME_SECONDS;
  questionTime.textContent = formatTime(questionTimeLeft);
  TimerEl.textContent = formatTime(timeLeft);

  startSection.classList.add("hidden");
  quizBox.classList.remove("hidden");
  startTimer();
  showQuestion();
};

skipBtn.onclick = () => {
  nextQuestion();
};

function showQuestion() {
  resetAnswer();

  const Q = shuffledQuestions[currentQuestionIndex];
  if (!Q) return endQuiz();

  questionText.textContent = Q.question;

  Q.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.className =
      "px-4 py-2 bg-white text-black rounded hover:bg-gray-300 cursor-pointer";
    btn.onclick = () => selectAnswer(answer, Q.correct);
    answerButtons.appendChild(btn);
  });

  startQuestionTimer();
}

function resetAnswer() {
  answerButtons.innerHTML = "";
}

function selectAnswer(selected, correct) {
  if (selected === correct) {
    score += QUESTION_MARKS;
  }
  nextQuestion();
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    TimerEl.textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

function startQuestionTimer() {
  clearInterval(questionTimerInterval);
  questionTimeLeft = QUESTION_TIME_SECONDS;
  questionTime.textContent = formatTime(questionTimeLeft);

  questionTimerInterval = setInterval(() => {
    questionTimeLeft--;
    questionTime.textContent = formatTime(questionTimeLeft);
    if (questionTimeLeft <= 0) {
      clearInterval(questionTimerInterval);
      nextQuestion();
    }
  }, 1000);
}

// Format seconds into mm:ss
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function endQuiz() {
  clearInterval(timerInterval);
  clearInterval(questionTimerInterval);
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  quizScores.textContent = ` ${score}`;
}

restartQuiz.onclick = () => {
  // Reset all the quiz state
  shuffledQuestions = shuffleArray([...questions]);
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = QUIZ_TIME_SECONDS;
  TimerEl.textContent = formatTime(timeLeft);

  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");

  startTimer();
  showQuestion();
};
