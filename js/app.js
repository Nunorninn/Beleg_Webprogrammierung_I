
const matheBtn = document.getElementById("mathe");
const deutschBtn = document.getElementById("deutsch");
const informatikBtn = document.getElementById("informatik");
const webBtn = document.getElementById("web");
const selscreen = document.getElementById("category-selection");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const Anworten = document.getElementById("answers");
const Result = document.getElementById("result");
const Progress = document.getElementById("progress");

let currentcategory= "";
let allQuestions = {};
let currentQuestions = [];
let currentQuestionIndex = 0;
let EndRes = 0;
let Richtig = 0;
const frageObjekt = currentQuestions[0];

//Elemente für die Antworten
const ans1 = document.getElementById("answer1");
const ans2 = document.getElementById("answer2");
const ans3 = document.getElementById("answer3");
const ans4 = document.getElementById("answer4");

async function loadQuestions() {
    try {
        const response = await fetch('https://www.informatik.htw-dresden.de/~s88665/questions.json');
        allQuestions = await response.json();
        console.log("Daten geladen:", allQuestions);
    } catch (e) { console.error("JSON konnte nicht geladen werden", e); }
}
loadQuestions();

function switchmathquiz()
{
  selscreen.style.display = "none";
  quiz.style.display = "block";
  Progress.style.display = "block";

  showQuestion("mathe");
}

function switchdeutschquiz()
{
  selscreen.style.display = "none";
  quiz.style.display = "block";
  Progress.style.display = "block";
  
  showQuestion("deutsch");
}

function switchinformatikquiz()
{
  selscreen.style.display = "none";
  quiz.style.display = "block";
  Progress.style.display = "block";
  
  showQuestion("informatik");
}

function switchwebquiz()
{
  selscreen.style.display = "none";
  quiz.style.display = "block";
  Progress.style.display = "block";
  
  showQuestion("web");
}

function showQuestion(category)
{
  currentcategory = category;
  currentQuestion =  allQuestions[category][currentQuestionIndex];
  question.innerText = currentQuestion.a;
  ans1.value = currentQuestion.l[0];
  ans2.value = currentQuestion.l[1];
  ans3.value = currentQuestion.l[2];
  ans4.value = currentQuestion.l[3];

}

function Antwort1()
{ 
  if(currentQuestionIndex>=10){return;}
  if(ans1.value==currentQuestion.l[0]) {EndRes++; Richtig=1;}
  currentQuestionIndex++;
  Updateprogress(currentQuestionIndex);
  if(currentQuestionIndex >= 10)
  {
    ShowResult(Richtig);
  }
  else{
    showQuestion(currentcategory);
  }
  
}

function Antwort2()
{
  if(currentQuestionIndex>=10){return;}
  if(ans2.value==currentQuestion.l[0]) {EndRes++; Richtig=1;}
  currentQuestionIndex++;
  Updateprogress(currentQuestionIndex);
  if(currentQuestionIndex >= 10)
  {
    ShowResult(Richtig);
  }
  else{
    showQuestion(currentcategory);
  }
  
}

function Antwort3()
{
  if(currentQuestionIndex>=10){return;}
  if(ans3.value==currentQuestion.l[0]) {EndRes++; Richtig=1;}
  currentQuestionIndex++;
  Updateprogress(currentQuestionIndex);
  if(currentQuestionIndex >= 10)
  {
    ShowResult(Richtig);
  }
  else{
    showQuestion(currentcategory);
  }
  
}

function Antwort4()
{
  if(currentQuestionIndex>=10){return;}
  if(ans4.value==currentQuestion.l[0]) {EndRes++; Richtig=1;}
  currentQuestionIndex++;
  Updateprogress(currentQuestionIndex);
  if(currentQuestionIndex >= 10)
  {
    ShowResult(Richtig);
  }
  else{
    showQuestion(currentcategory);
  }
  
}

function goBack() {
    quiz.style.display = "none";
    selscreen.style.display = "block";
    Result.style.display = "none";
    currentQuestionIndex = 0;
    currentcategory = "";
    EndRes = 0;
    Progress.style.display = "none";
    console.log("Zurück zum Hauptmenü");
}

function ShowResult(Richtig)
{
    Result.style.display = "block";
    if(currentQuestionIndex <= 10)
    {
      Result.innerText = "Du hast " + EndRes + "/10 Fragen richtig beantwortet!"; 
    }
    else if (currentQuestionIndex > 10 && Richtig == 1)
    {
      Result.innerText = "Da versucht jemand zu Mogeln, -1 Punkt!" + EndRes;
      EndRes= EndRes-2;
    }
    else
    {
      Result.innerText = "Da versucht jemand zu Mogeln, -1 Punkt!" +EndRes;
      EndRes--;
    }
    
}




matheBtn.addEventListener("click", switchmathquiz);
deutschBtn.addEventListener("click", switchdeutschquiz);
informatikBtn.addEventListener("click", switchinformatikquiz);
webBtn.addEventListener("click", switchwebquiz);
ans1.addEventListener("click", Antwort1);
ans2.addEventListener("click", Antwort2);
ans3.addEventListener("click", Antwort3);
ans4.addEventListener("click", Antwort4);