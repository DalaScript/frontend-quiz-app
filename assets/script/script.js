let data;
let btns;

let currentSubject;
let currentQuestionIndex = 0;
let score = 0;

let selectedAnswer = null;

const subjectContainer = document.getElementById("subject-container");
const subjectPage = document.getElementById("start-menu__subjects-container");

const startMenu = document.getElementById("start-menu");

const quizPage = document.getElementById("quiz-page");
const questionCount = document.getElementById('quiz-page__questions-count');
const questionContainer = document.getElementById("quiz-page__question");
const progressBar = document.getElementById("quiz-page__progress-bar");
const answersContainer = document.getElementById("quiz-page__answers-container");
const submitBtn = document.getElementById("quiz-page__submit-btn");
const nextQuestionBtn = document.getElementById("quiz-page__next-question-btn");
const errorEl = document.querySelector(".quiz-page__error");

const scorePage = document.getElementById('score-page');
const finalScore = scorePage.querySelector('.score-page__score');
const playAgainBtn = scorePage.querySelector('.score-page__btn');
const scorePageSubjet = document.getElementById('score-page__subject');

fetch('./assets/data/data.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData.quizzes;

        createBtns(data);
    })
    .catch(err => console.error(`Error fetching data: ${err}`));

const createBtns = (data) => {
    data.forEach(btn => {
        subjectPage.innerHTML += `
            <button class="start-menu__subject" data-subject="${btn.title}">
                <span class="start-menu__img-box start-menu__img-box--${btn.title.toLowerCase()}">
                    <img class="start-menu__img" src="${btn.icon}" alt="${btn.title.toLowerCase()} icon">
                </span>
                ${btn.title}
            </button>
        `;
    });

    startQuiz();
};

const startQuiz = () => {
    let subjects;
    btns = document.querySelectorAll(".start-menu__subject");

    btns.forEach(btn => {
        btn.addEventListener("click", () => {
            const selectedSubject = btn.getAttribute('data-subject');
            currentSubject = data.find(s => s.title === selectedSubject);

            subjectContainer.innerHTML = `
                <span class="score-page__img-box score-page__img-box--${currentSubject.title.toLowerCase()}">
                    <img class="score-page__img" src="${currentSubject.icon}" width="28.5" height="28.5" alt="html icon">
                </span>
                ${currentSubject.title}
            `;

            startMenu.classList.remove("start-menu--active");
            quizPage.classList.add("quiz-page--active");

            loadQuestion();
        });
    });
};

const loadQuestion = () => {
    const questionData = currentSubject.questions[currentQuestionIndex];

    questionCount.textContent = `Question ${currentQuestionIndex + 1} of ${currentSubject.questions.length}`;

    questionContainer.textContent = questionData.question;
    answersContainer.innerHTML = '';
    selectedAnswer = null;

    const answersAlphabet = ["A", "B", "C", "D"];
    let answersCount = 0;
    questionData.options.forEach(option => {
        const btn = document.createElement('button');
        btn.classList.add('quiz-page__answer-btn');

        const btnAnswer = document.createElement('span');
        btnAnswer.textContent = option;
        btnAnswer.classList.add("quiz-page__answer-option");

        const btnAlphabet = document.createElement('span');
        btnAlphabet.textContent = `${answersAlphabet[answersCount]}`;
        btnAlphabet.classList.add("quiz-page__answer-box");

        btn.appendChild(btnAlphabet);
        btn.appendChild(btnAnswer);

        answersCount++;

        btn.addEventListener('click', () => {
            document.querySelectorAll('.quiz-page__answer-btn').forEach(answerBtn => answerBtn.classList.remove("quiz-page__answer-btn--active"));

            btn.classList.add("quiz-page__answer-btn--active");
            selectedAnswer = option;

            if(errorEl.classList.contains("quiz-page__error--active")) {
                errorEl.classList.remove("quiz-page__error--active");
            }
        });

        answersContainer.appendChild(btn);
    });

    updateProgressBar();
};

const updateProgressBar = () => {
    const progress = (currentQuestionIndex / currentSubject.questions.length) * 100;
    progressBar.querySelector("div").style.width = `${progress}%`;
};

submitBtn.addEventListener('click', () => {
    if (selectedAnswer) {
        const correctAnswer = currentSubject.questions[currentQuestionIndex].answer;
        const selectedBtn = document.querySelector(".quiz-page__answer-btn--active");

        document.querySelectorAll('.quiz-page__answer-btn').forEach(btn => {
            btn.disabled = true;
        });

        if (selectedAnswer === correctAnswer) {
            selectedBtn.classList.remove("quiz-page__answer-btn--active");
            selectedBtn.classList.add('quiz-page__answer-btn--correct');
            score++;
        } else {
            selectedBtn.classList.remove("quiz-page__answer-btn--active");
            selectedBtn.classList.add("quiz-page__answer-btn--wrong");

            const correctBtn = Array.from(answersContainer.children).find((btn) => {
                let answer = btn.querySelector('.quiz-page__answer-option').innerText;
                return answer === correctAnswer;
            });

            correctBtn.classList.add('quiz-page__answer-btn--correct-icon');
        }

        submitBtn.classList.remove('quiz-page__submit-btn--active');
        nextQuestionBtn.classList.add('quiz-page__next-question-btn--active');
    } else {
        errorEl.classList.add("quiz-page__error--active");
    }
});

nextQuestionBtn.addEventListener('click', () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < currentSubject.questions.length) {
        loadQuestion();
        nextQuestionBtn.classList.remove('quiz-page__next-question-btn--active');
        submitBtn.classList.add('quiz-page__submit-btn--active');
    } else {
        showScore();
    }
});

playAgainBtn.addEventListener('click', () => {
    resetQuiz();
    scorePage.classList.remove('score-page--active');
    startMenu.classList.add("start-menu--active");
});

const showScore = () => {
    quizPage.classList.remove('quiz-page--active');
    scorePage.classList.add('score-page--active');

    scorePageSubjet.innerHTML = `
        <span class="score-page__img-box score-page__img-box--${currentSubject.title.toLowerCase()}">
            <img class="score-page__img" src="${currentSubject.icon}" width="28.5" height="28.5" alt="html icon">
        </span>
        ${currentSubject.title}
    `;
    finalScore.textContent = score;

};

const resetQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    progressBar.querySelector("div").style.width = '0%';
    submitBtn.classList.add('quiz-page__submit-btn--active');
    nextQuestionBtn.classList.remove('quiz-page__next-question-btn--active');
};