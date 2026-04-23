
const matheBtn = document.getElementById("mathe");
const deutschBtn = document.getElementById("deutsch");
const informatikBtn = document.getElementById("informatik");
const webBtn = document.getElementById("web");
const selscreen = Document.getElementById("category-selection");
const quiz = document.getElementById("quiz");

function switchmathquiz()
{
  selscreen.style.display = "none";
  quiz.style.display = "block";

  showQuestion("mathe");
  updateProgress();
}

function switchdeutschquiz()
{
  selscreen.style.display = "none";
  quiz.style.display = "block";
  
  showQuestion("deutsch");
  updateProgress();
}

function switchinformatikquiz()
{
  selscreen.style.display = "none";
  quiz.style.display = "block";
  
  showQuestion("informatik");
  updateProgress();
}

function switchwebquiz()
{
  selscreen.style.display = "none";
  quiz.style.display = "block";
  
  showQuestion("web");
  updateProgress();
}

matheBtn.addEventListener("click", switchmathquiz);
deutschBtn.addEventListener("click", switchdeutschquiz);
informatikBtn.addEventListener("click", switchinformatikquiz);
webBtn.addEventListener("click", switchwebquiz);