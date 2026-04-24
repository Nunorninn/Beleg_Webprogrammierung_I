
const matheBtn = document.getElementById("mathe");
const deutschBtn = document.getElementById("deutsch");
const informatikBtn = document.getElementById("informatik");
const webBtn = document.getElementById("web");
const selscreen = document.getElementById("category-selection");
const quiz = document.getElementById("quiz");
let allQuestions = {};
let currentQuestions = [];
let currentQuestionIndex = 0;
const frageObjekt = currentQuestions[0];
category = 


async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        allQuestions = await response.json();
    } catch (e) { console.error("JSON konnte nicht geladen werden", e); }
}

function switchmathquiz()
{
  selscreen.style.display = "none";
  quiz.style.display = "visible";

  showQuestion("mathe");
}

function switchdeutschquiz()
{
  selscreen.style.display = "none";
  quiz.style.display = "visible";
  
  showQuestion("deutsch");
}

function switchinformatikquiz()
{
  selscreen.style.display = "none";
  quiz.style.display = "visible";
  
  showQuestion("informatik");
}

function switchwebquiz()
{
  selscreen.style.display = "none";
  quiz.style.display = "visible";

  
  showQuestion("web");
}

function showQuestion(category)
{
  currentQuestions = allQuestions[category];
  currentQuestionIndex = 0;
  frageObjekt = currentQuestions[currentQuestionIndex];
  document.getElementById("question").innerText = frageObjekt.question;

}
loadQuestions();
matheBtn.addEventListener("click", switchmathquiz);
deutschBtn.addEventListener("click", switchdeutschquiz);
informatikBtn.addEventListener("click", switchinformatikquiz);
webBtn.addEventListener("click", switchwebquiz);async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        allQuestions = await response.json();
    } catch (e) { console.error("JSON konnte nicht geladen werden", e); }
}
loadQuestions();