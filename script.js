let questions = [
{
question: "What does HTML stand for?",
options: [
"Hyper Text Markup Language",
"High Text Machine Language",
"Hyper Tool Multi Language",
"Home Text Markup Language"
],
answer: 0
},
{
question: "Which language is used to style web pages?",
options: ["HTML", "CSS", "C++", "SQL"],
answer: 1
},
{
question: "Which language makes web pages interactive?",
options: ["CSS", "HTML", "JavaScript", "SQL"],
answer: 2
},
{
question: "Which tag is used for the largest heading in HTML?",
options: ["<h6>", "<head>", "<h1>", "<p>"],
answer: 2
},
{
question: "Which symbol is used for an ID selector in CSS?",
options: [".", "#", "*", "&"],
answer: 1
},
{
question: "Which keyword declares a variable in JavaScript?",
options: ["int", "string", "let", "define"],
answer: 2
},
{
question: "Which HTML tag creates a hyperlink?",
options: ["<link>", "<a>", "<img>", "<p>"],
answer: 1
},
{
question: "Which method displays a message in the browser console?",
options: ["alert()", "print()", "console.log()", "write()"],
answer: 2
},
{
question: "Which Bootstrap class creates a responsive container?",
options: [".row", ".container", ".button", ".text"],
answer: 1
},
{
question: "Which HTML tag is used to display an image?",
options: ["<picture-text>", "<image>", "<img>", "<src>"],
answer: 2
}
];

let currentQuestion = 0;
let userAnswers = Array(questions.length).fill(null);
let timeLeft = 15 * 60;
let timerInterval;

let startScreen = document.getElementById("startScreen");
let quizScreen = document.getElementById("quizScreen");
let resultScreen = document.getElementById("resultScreen");

let startBtn = document.getElementById("startBtn");
let questionNumber = document.getElementById("questionNumber");
let questionText = document.getElementById("questionText");
let optionsDiv = document.getElementById("options");

function showQuestion() {
let q = questions[currentQuestion];

questionNumber.textContent =
    "Question " + (currentQuestion + 1) + " of " + questions.length;

questionText.textContent = q.question;
optionsDiv.innerHTML = "";

q.options.forEach(function(option, index) {
let selected = userAnswers[currentQuestion] === index;

let optionHTML = document.createElement("div");
optionHTML.className = "form-check";

let radio = document.createElement("input");
radio.type = "radio";
radio.className = "form-check-input";
radio.name = "answer";
radio.id = "option" + index;
radio.value = index;
radio.checked = selected;

let text = document.createElement("label");
text.className = "form-check-label";
text.htmlFor = "option" + index;
text.textContent = option;

optionHTML.appendChild(radio);
optionHTML.appendChild(text);
optionsDiv.appendChild(optionHTML);
});

document.getElementById("previousBtn").disabled = currentQuestion === 0;

document.getElementById("nextBtn").classList.toggle(
    "d-none",
    currentQuestion === questions.length - 1
);

document.getElementById("submitBtn").classList.toggle(
    "d-none",
    currentQuestion !== questions.length - 1
);

document.getElementById("progressBar").style.width =
    ((currentQuestion + 1) / questions.length * 100) + "%";
}

function startTimer() {
document.getElementById("timer").textContent = "15:00";

timerInterval = setInterval(function() {
    timeLeft--;

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    document.getElementById("timer").textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        showResult();
    }
}, 1000);
}

optionsDiv.addEventListener("change", function(event) {
if (event.target.name === "answer") {
userAnswers[currentQuestion] = Number(event.target.value);
}
});

startBtn.addEventListener("click", function() {
startScreen.classList.add("d-none");
quizScreen.classList.remove("d-none");

showQuestion();
startTimer();

});

document.getElementById("nextBtn").addEventListener("click", function() {
if (currentQuestion < questions.length - 1) {
currentQuestion++;
showQuestion();
}
});

document.getElementById("previousBtn").addEventListener("click", function() {
if (currentQuestion > 0) {
currentQuestion--;
showQuestion();
}
});
function showResult() {
    clearInterval(timerInterval);

    quizScreen.classList.add("d-none");
    resultScreen.classList.remove("d-none");

    let correct = 0;

    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].answer) {
            correct++;
        }
    }
    let incorrect = questions.length - correct;
    let percentage = Math.round((correct / questions.length) * 100);
    let passed = percentage >= 60;

    document.getElementById("finalScore").textContent =
        correct + "/" + questions.length;

    document.getElementById("percentage").textContent =
        percentage + "%";

    document.getElementById("correctAnswers").textContent = correct;

    document.getElementById("incorrectAnswers").textContent = incorrect;

    document.getElementById("totalQuestions").textContent =
        questions.length;

    document.getElementById("passStatus").textContent =
        passed ? "Pass" : "Fail";

    document.getElementById("resultStatus").textContent =
        passed ? "Congratulations!" : "Better Luck Next Time!";

    document.getElementById("resultMessage").textContent =
        passed
            ? "Great job! Keep it up."
            : "Keep practicing and try again!";
}

document.getElementById("submitBtn").addEventListener("click", function() {
    showResult();
});

document.getElementById("restartBtn").addEventListener("click", function() {
clearInterval(timerInterval);

currentQuestion = 0;
userAnswers = Array(questions.length).fill(null);
timeLeft = 15 * 60;

resultScreen.classList.add("d-none");
startScreen.classList.remove("d-none");

document.getElementById("timer").textContent = "15:00";
document.getElementById("progressBar").style.width = "0%";

});
