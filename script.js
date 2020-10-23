let startButton = document.getElementById('start-btn');
let nextButton = document.getElementById('next-btn');
let questionContainerElement = document.getElementById('question-container');
let questionElement = document.getElementById('question');
let answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.floor());
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

let questions = [
  {
    question: ' Who released "Nevermind" in 1991?',
    answers: [
      { text: 'Nirvana', correct: true },
      { text: 'AC/DC', correct: false },
      { text: 'Foo Fighter', correct: false },
      { text: 'Creed', correct: false },
    ],
  },
  {
    question:
      'Hopefully this opener wont test you too much. Which act released "Back In Black" in 1980?',
    answers: [
      { text: 'Avenged Sevenfold', correct: false },
      { text: 'Dream Teather', correct: false },
      { text: 'Slipknot', correct: false },
      { text: 'AC/DC', correct: true },
    ],
  },
  {
    question:
      'What is the name of the band that constructed the mega 70s hit "Bohemian Rhapsody"?',
    answers: [
      { text: 'Abba', correct: false },
      { text: 'Queen', correct: true },
      { text: 'Metallica', correct: false },
      { text: 'Guns and Roses', correct: false },
    ],
  },
  {
    question: 'Ronny James Dio (RIP) was never a member of which band?',
    answers: [
      { text: 'System of a Down', correct: false },
      { text: 'Deep Purple', correct: true },
      { text: 'Red Hot Chili Peppers', correct: false },
      { text: 'A7X', correct: false },
    ],
  },
  {
    question: 'Which band had Noel Redding on bass?',
    answers: [
      { text: 'Metallica', correct: false },
      { text: 'The Jimi Hendrix Experience', correct: true },
      { text: 'Tom Morello', correct: false },
      { text: 'Rage Againts the Machine', correct: false },
    ],
  },
];
