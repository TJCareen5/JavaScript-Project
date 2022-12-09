const quizQuestion = document.querySelector(".quiz-question");
const quizChoices = document.querySelector(".quiz-choices");
const quizScore = document.querySelector(".quiz-score");
const quizFooter = document.querySelector(".quiz-footer");

let id = 0;
let score = 0;

function displayQuestion(id) {
    let question = document.createElement("div")
    question.className = "question";
    question.textContent = quizQuestions[id].question;
    quizQuestion.append(question);
    let choices = quizQuestions[id].choices;

    for (let i = 0; i < 4; i++) {
        let choice = document.createElement("div");
        choice.classList.add("choice", "choice-hover");
        choice.innerHTML = "<span class='choice-text'>" + choices[i] + "</span>";
        if (choice.textContent === quizQuestions[id].answer) {
            choice.classList.add("choice-correct");
        }
        quizChoices.append(choice);
        choice.addEventListener("click", checkChoice);
    }

    const counterHolder = document.getElementById("counter");
    counterHolder.textContent = id + 1;
}

displayQuestion(id);

function checkChoice(event) {

    const choices = document.querySelectorAll(".choice");
    for (let i = 0; i < choices.length; i++) {
        choices[i].classList.remove("choice-hover");
        choices[i].removeEventListener("click", checkChoice);
    }


    for (let i = 0; i < choices.length; i++) {
        if (event.target.textContent === choices[i].textContent) {
            choices[i].classList.add("highlight");
            let answer = quizQuestions[id].answer;
            if (event.target.textContent === answer) {
                choices[i].classList.add("correct");
                score++;
            } else {
                choices[i].classList.add("incorrect");
            }
        }
    }

    const answerChoice = document.querySelector(".choice-correct");
    answerChoice.classList.add("correct");

    const nextBtn = document.querySelector(".next-btn");
    if (id < 3) {
        nextBtn.style.display = "block";
        nextBtn.addEventListener("click", nextFunction);
    } else {
        nextBtn.textContent = "RESULTS"
        nextBtn.removeEventListener("click", nextFunction);
        nextBtn.addEventListener("click", seeScore);
    }
    id++;

}

function nextFunction() {
    quizQuestion.innerHTML = "";
    quizChoices.innerHTML = "";
    displayQuestion(id);
}

function seeScore() {
    quizQuestion.innerHTML = "";
    quizChoices.innerHTML = "";
    quizFooter.style.display = "none";
    quizScore.style.display = "block";
    const scoreResult = document.getElementById("score");
    scoreResult.innerText = score;

}