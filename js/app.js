
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
const backBtn = document.getElementById("btn-back");
const HighscoreLabel = document.getElementById("Highscore");
const rightSound = new Audio('audio/rightanswer.mp3');
const wrongSound = new Audio('audio/wronganswer.mp3');

let currentcategory= "";
let allQuestions = {};
let currentQuestion = [];
let currentQuestionIndex = 0;
let EndRes = 0;
let Richtig = 0;
let correctAnswerHTML = "";
let isServerQuestion = false;

//Elemente für die Antworten
const ans1 = document.getElementById("ans1");
const ans2 = document.getElementById("ans2");
const ans3 = document.getElementById("ans3");
const ans4 = document.getElementById("ans4");

async function checkAnswer(button) {
  if (currentQuestionIndex >= 10) return;

  if (isServerQuestion) {
    
    const Text = button.getAttribute("data-raw");
    const selIndx = currentQuestion.l.indexOf(Text);
    console.log(selIndx);
    const apiId = currentQuestionIndex + 1;

    try {
      const response = await fetch(`data/solve.php?id=${apiId}&index=${selIndx}`);
      const debugData = await response.json();
      console.log("API-Antwort:", debugData);
      if (debugData.success || debugData.success == "true") {
        
        rightSound.currentTime = 0; // Setzt den Ton zurück (falls man schnell klickt)
        rightSound.play().catch(e => console.log("Audio-Autoplay blockiert:", e))
        
        EndRes++;
        Richtig = 1;
        console.log("Antwort war Richtig!");
        
        ans1.style.backgroundColor = "#007bff";
        ans2.style.backgroundColor = "#007bff";
        ans3.style.backgroundColor = "#007bff";
        ans4.style.backgroundColor = "#007bff";
        
        button.style.backgroundColor = "#00FF00";
        setTimeout(() => {
        button.style.backgroundColor = "#007bff";
        }, 1000);

      } else {
        Richtig = 0;
        console.log("Antwort war falsch!");
        
        wrongSound.currentTime = 0; // Setzt den Ton zurück (falls man schnell klickt)
        wrongSound.play().catch(e => console.log("Audio-Autoplay blockiert:", e));
        
        ans1.style.backgroundColor = "#007bff";
        ans2.style.backgroundColor = "#007bff";
        ans3.style.backgroundColor = "#007bff";
        ans4.style.backgroundColor = "#007bff";
        
        button.style.backgroundColor = "#8B0000";
        setTimeout(() => {
          button.style.backgroundColor = "#007bff";
        }, 1000);
      }
    } catch (e) {
      console.error("Fehler beim Überprüfen der Antwort", e);
    }
  } else {

    const selAnsw = button.getAttribute("data-raw"); // KI gegeben um den Inhalt zu checken wenn es mit Katex verändert wurde

    if (selAnsw == correctAnswerHTML) {
      
      ans1.style.backgroundColor = "#007bff";
      ans2.style.backgroundColor = "#007bff";
      ans3.style.backgroundColor = "#007bff";
      ans4.style.backgroundColor = "#007bff";
      
      button.style.backgroundColor = "#00FF00";
      setTimeout(() => {
        button.style.backgroundColor = "#007bff";
      }, 1000);
      
      rightSound.currentTime = 0; // Setzt den Ton zurück (falls man schnell klickt)
      rightSound.play().catch(e => console.log("Audio-Autoplay blockiert:", e))

      EndRes++;
      Richtig = 1;
      console.log("Antwort war Richtig!");
    } else {
      Richtig = 0;
      
      ans1.style.backgroundColor = "#007bff";
      ans2.style.backgroundColor = "#007bff";
      ans3.style.backgroundColor = "#007bff";
      ans4.style.backgroundColor = "#007bff";
      
      button.style.backgroundColor = "#8B0000";
      setTimeout(() => {
        button.style.backgroundColor = "#007bff";
      }, 1000);
      
      wrongSound.currentTime = 0; // Setzt den Ton zurück (falls man schnell klickt)
      wrongSound.play().catch(e => console.log("Audio-Autoplay blockiert:", e));
      console.log("Antwort war falsch!");
    }
  }
  currentQuestionIndex++;
  Updateprogress(currentQuestionIndex);

  if (currentQuestionIndex >= 10) {
      ShowResult(Richtig);
  } 
  else 
  { 
    if (isServerQuestion) 
    {
      loadServerQuestions();
    }
    else 
    {
      showQuestion(currentcategory);
    }
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
  backBtn.style.display = "block";
  

  showQuestion("mathe");
}

function switchmusikquiz()
{
  selscreen.style.display = "none";
  quiz.style.display = "block";
  Progress.style.display = "block";
  backBtn.style.display = "block";
  musicdisplay.style.display = "block";
  
  showQuestion("musik");
}

function switchinformatikquiz()
{
  selscreen.style.display = "none";
  quiz.style.display = "block";
  Progress.style.display = "block";
  backBtn.style.display = "block";
  
  showQuestion("informatik");
}

async function switchwebquiz()
{
  selscreen.style.display = "none";
  quiz.style.display = "block";
  Progress.style.display = "block";
  backBtn.style.display = "block";
  isServerQuestion = true;
  currentQuestionIndex = 0;
  
  await loadServerQuestions();
}

async function loadServerQuestions()
{
  if (!navigator.onLine) {
        handleServerQuestionsOffline();
        return;
    }
  try {
    Exdata = "";
    const ApiIndx = currentQuestionIndex +1; // +1 da die API bei 1 beginnt
    const response = await fetch(`data/getWebQuest.php?id=${ApiIndx}`);
    const text = await response.text();
    console.log("Was kommt an?: ", text);

    if(!response.ok) throw new Error("Netzwerk-Antwort war negativ!");

    Exdata = JSON.parse(text);
    if (Exdata && Exdata.options)
    {
      const formatQuestion = {
      a: Exdata.text,
      l: Exdata.options};
      isServerQuestion = true;
    
      showQuestion("web", formatQuestion);
    } else {
      console.error("Datenformat war ungültig!:" , Exdata);
    }
  } catch (e) { 
    console.error("Serverfragen konnten nicht geladen werden", e);
    handleServerQuestionsOffline();
    question.innerText ="Fehler beim laden der Server-Frage.";
  }
}

function handleServerQuestionsOffline() {
    alert("Die Webprogrammierung-Fragen können offline leider nicht vom Server der HTW geladen werden. Wir starten stattdessen das Informatik-Quiz für dich!");
    isServerQuestion = false;
    currentQuestionIndex = 0;
    showQuestion("informatik");
}



function showQuestion(category, Exdata = null)
{
  currentcategory = category;

  if(Exdata){
    currentQuestion = Exdata;

  } else if (allQuestions[category] && allQuestions[category][currentQuestionIndex]){
    currentQuestion = allQuestions[category][currentQuestionIndex];
    isServerQuestion = false;
  } else {
    console.error("Keine Frage gefunden!:" , category , currentQuestionIndex);
    return;
  }

  if(!currentQuestion.l) {
    console.error("Die Eigentschaft .l fehlt im Objekt:" , currentQuestion);
    return;
  }

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

    
    if (category == "musik") {
        musicdisplay.style.display = "block";
        musicdisplay.innerHTML = ""; // Alten Inhalt löschen
        drawNote("vexflow", currentQuestion.notation);
        console.log("Musikfrage angezeigt, Notation:", currentQuestion.notation);
    } else {
        musicdisplay.style.display = "none";
    }

  renderMathInElement(document.getElementById("answers"), {
    delimiters: [
      {left: "$", right: "$", display: false}
    ],
    throwOnError: false
  });

}



function goBack() {
    quiz.style.display = "none";
    selscreen.style.display = "grid";
    Result.style.display = "none";
    musicdisplay.style.display = "none";
    currentQuestionIndex = 0;
    currentcategory = "";
    EndRes = 0;
    Updateprogress(currentQuestionIndex);
    Progress.style.display = "none";
    backBtn.style.display = "none";
    HighscoreLabel.style.display = "none";
    HighscoreLabel.innerHTML = "";

    console.log("Zurück zum Hauptmenü");
}

async function ShowResult(Richtig)
{
    Result.style.display = "block";
    if(currentQuestionIndex <= 10)
    {
      Result.innerText = "Du hast " + EndRes + "/10 Fragen richtig beantwortet!";
      let spielerName = prompt("Gib deinen Namen für die Highscore ein:");
        
        // Falls Abbrechen geklickt wurde (null) oder nichts eingegeben wurde ("")
        if (spielerName === null || spielerName.trim() === "") {
            spielerName = "Anonymer Spieler";
        } else {
            spielerName = spielerName.trim();
        }
        await saveHighscore(spielerName, EndRes, currentcategory);
        await loadHighscores(currentcategory);
    } else {
      Result.innerText = "Fehler: Alle Fragen wurden bereits beantwortet!";
    }
}

function drawNote(vexFlow, notation) {
    const { Renderer, Stave, StaveNote, Voice, Formatter } = Vex.Flow;

    const div = document.getElementById(vexFlow);
    if (!div) return;
    div.innerHTML = ""; 

    const renderer = new Renderer(div, Renderer.Backends.SVG);
    renderer.resize(250, 150); 
    const context = renderer.getContext();

    // 1. Notenzeile etwas tiefer ansetzen (y: 40 ist gut)
    const stave = new Stave(10, 40, 230);
    stave.addClef("treble").setContext(context).draw();

    // 2. Noten parsen
    const notes = notation.split(',').map(n => {
        const parts = n.trim().split('/'); 
        let key = parts[0];      // z.B. "C4"
        const duration = parts[1]; // z.B. "q"

        // Formatierung von "C4" zu "c/4"
        const formattedKey = key.toLowerCase().replace(/(\d)/, "/$1");

        return new StaveNote({
            clef: "treble",
            keys: [formattedKey], 
            duration: duration
        });
    });
    try {
        const voice = new Voice({ num_beats: 4, beat_value: 4 });
        voice.setStrict(false); 
        voice.addTickables(notes);

        // 4. Formatieren und Zeichnen
        new Formatter().joinVoices([voice]).format([voice], 150);
        voice.draw(context, stave);
    } catch (e) {
        console.error("VexFlow Error:", e);
    }
}

//// Highscore-Funktionalität ////

async function saveHighscore(playerName, finalScore, currentCategory) {
    try {
        const response = await fetch('https://www.informatik.htw-dresden.de/~s88665/data/saveHighscore.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: playerName,
                score: finalScore,
                category: currentCategory
            })
        });

        if (!response.ok) {
            throw new Error(`Der Server hat das Speichern blockiert (Status ${response.status})`);
        }

        const result = await response.json();
        console.log("Server-Antwort:", result.message);

    } catch (e) {
        console.error("Speichern fehlgeschlagen: ", e.message);
    }
}

// Top 10 vom Server holen

async function loadHighscores(category) {
HighscoreLabel.style.display = "block";
    
    try {
        const response = await fetch(`https://www.informatik.htw-dresden.de/~s88665/data/getHighSC.php?category=${category}`);
        
        if (!response.ok) {
            throw new Error(`Server-Fehler: Status ${response.status}`);
        }

        const textData = await response.text(); // Als Rohtext einlesen
        console.log("Rohdaten vom Server:", textData);

        if (!textData.trim()) {
            throw new Error("Der Server hat eine komplett leere Antwort geschickt!");
        }

        const scores = JSON.parse(textData);

        if (scores.error) {
            throw new Error(scores.message);
        }

        // Backup im localStorage ablegen und anzeigen
        localStorage.setItem(`cached_scores_${category}`, JSON.stringify(scores));
        HighscoreLabel.innerHTML = "<h3> Highscores für " + category + "</h3>" + 
    scores.map((s, index) => `<p>${index + 1}. ${s.name} ${s.score}</p>`).join('');
    } catch (e) {
        console.warn("Konnte Highscores nicht live laden, nutze Offline-Backup:", e);
        // Fallback auf LocalStorage bei Fehlern
        const cachedScores = JSON.parse(localStorage.getItem(`cached_scores_${category}`)) || [];
        HighscoreLabel.style.display = "block";
        HighscoreLabel.innerHTML = "<h3> Highscores für " + category + "</h3>" + 
        cachedScores.map((s, index) => `<p>${index + 1}. ${s.name} ${s.score}</p>`).join('');
    }
}
 // Offline zu Online Synchronisation der Highscores
window.addEventListener('online', async () => {
    console.log("Verbindung wiederhergestellt! Synchronisiere Offline-Highscores...");
    
    let offlineScores = JSON.parse(localStorage.getItem('offline_highscores')) || [];
    if (offlineScores.length === 0) return;

    for (const scoreData of offlineScores) {
        try {
            await fetch('data/saveHighscore.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(scoreData)
            });
            console.log(`Erfolgreich synchronisiert: ${scoreData.name} (${scoreData.score} Punkte)`);
        } catch (e) {
            console.error("Synchronisation fehlgeschlagen, versuche es später wieder", e);
            return; // Abbrechen, falls der Server doch noch zickt
        }
    }

    // Wenn alle erfolgreich hochgeladen wurden, löschen wir den Offline-Speicher
    localStorage.removeItem('offline_highscores');
    alert("Alle deine Offline-Highscores wurden erfolgreich mit dem Server synchronisiert! 🚀");
});
