const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');
const numberOfQuestion = document.getElementById('number-of-question');
const numberOfAllQuestion = document.getElementById('number-of-all-questions');

const gameSd = new Audio();
gameSd.src = './assets/sound/game sound.mp3';
gameSd.loop = true;
gameSd.play();

const gameOverSd = new Audio();
gameOverSd.src = './assets/sound/game over.mp3';
gameOverSd.loop = false;

let indexOfQuestion;
let indexOfPage = 0;

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');
const nextSd = new Audio();
nextSd.src = './assets/sound/next questrion.mp3';
nextSd.loop = false;

let score = 0;

const correctAnswer = document.getElementById('correct-answer');
const numberOfAllQuestion2 = document.getElementById('number-of-all-questions-2');
const btnTryAgain = document.getElementById('btn-try-again');

const checkSd = new Audio();
checkSd.src = './assets/sound/check answer.mp3';
checkSd.loop = false;
const correctSd = new Audio();
correctSd.src = './assets/sound/correct answer.mp3';
correctSd.loop = false;
const wrongSd = new Audio();
wrongSd.src = './assets/sound/wrong answer.mp3';
wrongSd.loop = false;

const questions = [
    {
        question: 'Какая игрушка была первой, которую рекламировали по телевидению?',
        options: [
            'Барби',
            'Мистер Картофельная Голова',
            'Духовка с Легкой Выпечкой',
            'Ракетный Гонщик'
        ],
        rightAnswer: 1
    },
    {
        question: 'Как называются четыре Факультета Хогвартса?',
        options: [
            'Север, Восток, Запад и Юг',
            'Грифон, Ворон, Слон и Змея',
            'Гриффиндор, Пуффендуй, Когтевран и Слизерин',
            'Красный, Синий, Зеленый и Оранжевый'
        ],
        rightAnswer: 2
    },
    {
        question: 'Какого цвета была таблетка, которую принимает Нео в фильме “Матрица”?',
        options: [
            'Красный',
            'Синий',
            'Зеленый',
            'Желтый'
        ],
        rightAnswer: 0
    },
    {
        question: 'Сколько костей у акул?',
        options: [
            'Четыре',
            'Пять',
            'Десять',
            'Ноль'
        ],
        rightAnswer: 3
    },
    {
        question: 'Как долго длилась Столетняя война?',
        options: [
            '50 лет',
            '100 лет',
            '116 лет',
            '101 год'
        ],
        rightAnswer: 2
    },
    {
        question: 'Сколько градусов в белом вине?',
        options: [
            '9-12',
            '13-16',
            '17-19',
            '5 градусов обычно'
        ],
        rightAnswer: 0
    },
    {
        question: 'Как назывался батончик “Сникерс” до его смены названия в 1990 году?',
        options: [
            'Race',
            'Marathon',
            'Smile',
            'Sprint'
        ],
        rightAnswer: 1
    },
    {
        question: 'Где находится “Испанская лестница”?',
        options: [
            'Австрия',
            'Испания',
            'Италия',
            'Бразилия'
        ],
        rightAnswer: 2
    },
    {
        question: 'Из какого города приехали The Beatles?',
        options: [
            'Манчестер',
            'Лондон',
            'Ливерпуль',
            'Йорк'
        ],
        rightAnswer: 2
    },
    {
        question: 'О каком певце говорили, что он Король поп-музыки?',
        options: [
            'Стинг',
            'Филипп Киркоров',
            'Элтон Джон',
            'Майкл Джексон'
        ],
        rightAnswer: 3
    },
];

numberOfAllQuestion.innerHTML = questions.length;

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];
    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
}

let completedAnswers = [];

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;

    if (indexOfPage == questions.length) {
        quizOver();
    } else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach(answer => {
                if (answer == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if (hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        };
        if (completedAnswers == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    };
    completedAnswers.push(indexOfQuestion);
};

function checkAnswer(el) {
    el.target.classList.remove('check');
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        correctSd.play();
        updateTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        wrongSd.play();
        updateTracker('wrong');
    }
    console.log(el);
    disabledOptions();
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
};

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};

const updateTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if (!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из вариантов ответа')
    } else {
        randomQuestion();
        enableOptions();
        if (indexOfPage !== questions.length) {
            nextSd.play();
            gameSd.play();
        }
    }
}

btnNext.addEventListener('click', validate);

for (option of optionElements) {
    option.addEventListener('click', e => {
        gameSd.pause();
        console.log(e.target);
        e.target.classList.add('check');
        checkSd.play();
        setTimeout(() => {
            checkAnswer(e)
        }, 3000);
    }
    );
};

const quizOver = () => {
    console.log('Game Over');
    gameSd.pause();
    gameOverSd.play();
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestion2.innerHTML = questions.length;
};

const tryAgain = () => {
    nextSd.play();
    window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});