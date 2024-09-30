let data;
let btns;

let currentSubject;
let currentQuestionIndex = 0;
let score = 0;

const startMenu = document.getElementById("start-menu");
const quizPage = document.getElementById("quiz-page");

const subjectContainer = document.getElementById("subject-container");

const subjectPage = document.getElementById("start-menu__subjects-container");

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
        console.log(btn.title.toLowerCase());
    });

    // console.log(data);
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

            startMenu.style.display = "none";
            quizPage.style.display = "block";
            console.log(currentSubject);
        });
    });
};

