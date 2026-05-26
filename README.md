fwsrnprogramm)
### Belegarbeit im Modul Webprogrammierung I – HTW Dresden

* **Autor:** Niels Stauß
* **Studiengang:** Informatik
* **Entwicklungsumgebung:** Visual Studio Code, PHP 8.5 (Lokaler CLI-Server)
* **Empfohlene Test-Browser:** Firefox / Vivaldi

---

## Erfüllte Aufgaben & Features

### Frontend (Client-seitig)
* **Dynamische Benutzeroberfläche:** Single-Page-Anwendung (SPA) mit flüssigen Wechseln zwischen Kategoriewahl, Quiz-Ansicht und Highscore-Tabelle.
* **Vier Fachbereiche:** * *Mathe:* Mathematische Formeln werden dynamisch zur Laufzeit mittels **KaTeX** gerendert (Inline-Delimiter `$` werden abgefangen).
  * *Musik:* Dynamische Generierung von Notenzeilen aus Strings (z.B. `C4/q`) im SVG-Format mithilfe von **VexFlow**.
  * *Informatik:* Lokale Multiple-Choice-Fragen mit automatischem Antwort-Shuffling (Fisher-Yates-Algorithmus).
  * *Server:* Dynamischer Abruf von Live-Fragen direkt von der HTW-Dresden-API.
* **Visuelles Feedback:** Fortschrittsbalken (`progressbar.js`), farbliches Feedback bei Antworten bis 10 Fragen erfolgen.

### Backend & Datenspeicherung 
* **Server-zu-Server-Abruf (`getWebQuest.php`) der Prüfungsfragen der HTW Dresden mittels **cURL** inklusive Fehlerbehandlung.
* **Verifikations-Schnittstelle:** Validierung der eingegebenen Webprogrammierung-Antworten über ein `solve.php`-Skript gegen die Hochschul-API.
* **Datebaatenbank:** Speicherung der Highscores (Name, Score, Kategorie, Zeitstempel) in einer lokalen **SQLite3-Datenbank** via PDO.

### PWA & Offline-Modus (Advanced Features)
* **Service Worker (`sw.js`):** Caching aller kritischen Assets (HTML, CSS, JS, Bilder) sowie der externen CDN-Bibliotheken (KaTeX, VexFlow), um die App komplett netzwerkunabhängig startbar zu machen.
* **App-Manifest (`manifest.json`):** Vollständige Konfiguration als Progressive Web App (PWA), wodurch das Lernprogramm auf Smartphones und PCs installierbar ist (Standalone-Display).
* ** Offline-Sicherheitsnetz:** * Automatische Erkennung des Netzwerkstatus über `navigator.onLine`.
  * Lokale Aufgaben auf integrierte JSON-Fragen.
  * Zwischenspeicherung von Highscores im browserinternen **localStorage**, falls beim Beenden keine Internetverbindung besteht.
  * **Hintergrund-Synchronisation:** Automatisiertes Hochladen der Offline-Scores in die SQLite-Datenbank, sobald das `online`-Event des Browsers feuert.

---

##  Installation und Start (Lokal)

1. Stellen Sie sicher, dass in Ihrer `php.ini` die Erweiterungen `extension=pdo_sqlite`, `extension=sqlite3` und `extension=curl` aktiviert (einkommentiert) sind,
   aufgrund von das diese nicht sqlite Befehl und curl Befehle über php nicht ausführbar sind.
2. Öffnen Sie das Projektverzeichnis im Terminal.
3. Starten Sie den integrierten PHP-Entwicklungsserver:
   ```bash
   php -S 127.0.0.1:8000