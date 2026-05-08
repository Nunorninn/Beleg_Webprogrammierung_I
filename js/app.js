
const matheBtn = document.getElementById("mathe");
const musikBtn = document.getElementById("musik");
const informatikBtn = document.getElementById("informatik");
const webBtn = document.getElementById("web");
const selscreen = document.getElementById("category-selection");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const Anworten = document.getElementById("answers");
const Result = document.getElementById("result");
const Progress = document.getElementById("progress");
const musicdisplay = document.getElementById("vexflow");

let currentcategory= "";
let allQuestions = {};
let currentQuestions = [];
let currentQuestionIndex = 0;
let EndRes = 0;
let Richtig = 0;
let correctAnswerHTML = "";
const frageObjekt = currentQuestions[0];

//Elemente für die Antworten
const ans1 = document.getElementById("ans1");
const ans2 = document.getElementById("ans2");
const ans3 = document.getElementById("ans3");
const ans4 = document.getElementById("ans4");

function checkAnswer(button) {
  if (currentQuestionIndex >= 10) return;

  const selAnsw = button.getAttribute("data-raw"); // KI gegeben um den Inhalt zu checken wenn es mit Katex verändert wurde

  if (selAnsw == correctAnswerHTML) {
    EndRes++;
    Richtig = 1;
    console.log("Antwort war Richtig!");
  } else {
    Richtig = 0;
    console.log("Antwort war falsch!");
  }

  currentQuestionIndex++;
  Updateprogress(currentQuestionIndex);

  if (currentQuestionIndex >= 10) {
      ShowResult(Richtig);
  } else {
    showQuestion(currentcategory);
  }
}

function shuffleAnswers(content)
{
  for (let i = content.length - 1; i > 0; i--)
  {
    const rand = Math.floor(Math.random() * (i+1));
    [content[i], content[rand]] = [content[rand],content[i]];
  }
  return content;
}

async function loadQuestions() {
  try {
    const response = await fetch('data/questions.json'); //  https://www.informatik.htw-dresden.de/~s88665/questions.json
    allQuestions = await response.json();
    console.log("Daten geladen:", allQuestions);
  } catch (e) { console.error("JSON konnte nicht geladen werden", e); }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ist fertig geladen");
  
  loadQuestions();
  // Eventlistener für Fächer
  matheBtn.addEventListener("click", switchmathquiz);
  musikBtn.addEventListener("click", switchmusikquiz);
  informatikBtn.addEventListener("click", switchinformatikquiz);
  webBtn.addEventListener("click", switchwebquiz);

  // Eventlistener für Antwortbuttons
  ans1.addEventListener("click", function() {checkAnswer(this)});
  ans2.addEventListener("click", function() {checkAnswer(this)});
  ans3.addEventListener("click", function() {checkAnswer(this)});
  ans4.addEventListener("click", function() {checkAnswer(this)});
});



function switchmathquiz()
{
  selscreen.style.display = "none";
  quiz.style.display = "block";
  Progress.style.display = "block";

  showQuestion("mathe");
}

function switchmusikquiz()
{
  selscreen.style.display = "none";
  quiz.style.display = "block";
  Progress.style.display = "block";
  musicdisplay.style.display = "block";
  
  showQuestion("musik");
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
  correctAnswerHTML = currentQuestion.l[0];

  let shuffledAns = [currentQuestion.l[0],currentQuestion.l[1],currentQuestion.l[2],currentQuestion.l[3]];
  shuffleAnswers(shuffledAns);
  question.innerHTML = currentQuestion.a;

  if (shuffledAns.includes('$'))
  {
      ans1.innerHTML = shuffledAns[0];
  } else {
    ans1.innerText = shuffledAns[0];
  }
  ans1.setAttribute("data-raw", shuffledAns[0]);


  if (shuffledAns.includes('$'))
  {
      ans2.innerHTML = shuffledAns[1];
  } else {
    ans2.innerText = shuffledAns[1];
  }
  ans2.setAttribute("data-raw", shuffledAns[1]);


  if (shuffledAns.includes('$'))
  {
      ans3.innerHTML = shuffledAns[2];
  } else {
    ans3.innerText = shuffledAns[2];
  }
  ans3.setAttribute("data-raw", shuffledAns[2]);


  if (shuffledAns.includes('$'))
  {
      ans4.innerHTML = shuffledAns[3];
  } else {
    ans4.innerText = shuffledAns[3];
  }
  ans4.setAttribute("data-raw", shuffledAns[3]);

  renderMathInElement(document.getElementById("answers"), {
    delimiters: [
      {left: "$", right: "$", display: false}
    ],
    throwOnError: false
  });

}



function goBack() {
    quiz.style.display = "none";
    selscreen.style.display = "block";
    Result.style.display = "none";
    musicdisplay.style.display = "none";
    currentQuestionIndex = 0;
    currentcategory = "";
    EndRes = 0;
    Updateprogress(currentQuestionIndex);
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

function DrawNote(musicdisplay, note) {
  const { Renderer, Stave, StaveNote, Voice, Formatter } = Vex.Flow;
  const div = document.getElementById(musicdisplay);
  div.innerHTML = ""; // Clear previous rendering

  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(500, 200);

  const context = renderer.getContext();
  const stave = new Stave(10, 40, 400);
  stave.addClef("treble").setContext(context).draw();

  const notes = notation.split(', ').map(n => {
    return new StaveNote({ keys: [n.split('/')[0]], duration: n.split('/')[1] });
  });

  const voice = new Voice({ num_beats: notes.length, beat_value: 4 });
  voice.addTickables(notes);

  new Formatter().joinVoices([voice]).format([voice], 150);
  voice.draw(context, stave);
}




