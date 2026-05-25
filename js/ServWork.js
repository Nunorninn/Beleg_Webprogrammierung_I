const CACHE_NAME = 'quiz-version-1.0'
const ASSETS = [
    'index.html',
    'css/style.css',
    'css/progress.css',
    'js/app.js',
    'js/progressbar.js',
    'data/questions.json',
    'data/HTW.png',
    'https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js',
    'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js',
    'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
    'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js',
    'data/saveHighscore.php',
    'data/getHighSC.php',
    'data/getWebQuest.php',
    'data/solve.php',
    'data/db.php',
    'ServWork.js',
    'highscores.sqlite',
    'audio/rightanswer.mp3',
    'audio/wronganswer.mp3'
];

//Offline Inhalt für den Cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

//fetch für die fragen beantworten

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});