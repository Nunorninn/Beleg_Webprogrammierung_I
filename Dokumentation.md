# Lernportfolio & Entwicklungsdokumentation
**Projekt:** Quiz-App Lernprogramm  
**Entwickler:** Niels Stauß

---

## Chronologische Entwicklungsschritte

1. **Das UI-Fundament (HTML/CSS):** Aufbau einer Grid- und Flexbox-Struktur für die Website. Trennung der Screens über CSS-Klassen (`display: none/block/grid`).
2. **Die Quiz-Logik (JavaScript):** Implementierung der Core-Logik. Einbindung der Buttons und Antworten Logik, um sicherzustellen, dass Antwortoptionen bei jedem Durchlauf in zufälliger Reihenfolge angezeigt werden, während die Validierung stabil bleibt.
3. **Integration der Drittanbieter-Bibliotheken:** * Einarbeitung in die API von *VexFlow*, um Notenschlüssel, Notenzeilen und Tondauern sauber in ein SVG-Element zu zeichnen.
   * Integration von *KaTeX* zur Formeldarstellung über automatisiertes DOM-Rendering nach dem Laden einer Frage.
4. **Backend-Anbindung (PHP & SQLite):** Erstellung des Proxy-Skripts zur Umgehung von CORS-Problemen beim Abruf der HTW-API.
5. **Aufbau Highscore-Tabelle:** Eingebaute Highscore Tabelle mit php zum erstellen der Umgebung und Ausgeben der ausgewählten Kategorie mit `scores` in SQLite.
5. **PWA und Ausfallsicherheit:** Implementierung des Service Workers für Offline-Verfügbarkeit. Entwicklung der Synchronisationslogik für Offline-Highscores über den `localStorage`.

---

##  Größte Herausforderungen, Misserfolge & Lösungen

### 1. Die blockierte cURL-Erweiterung unter Windows
* **Problem:** Beim ersten Versuch, die Kategorie "Server" zu laden, stürzte das Skript mit einem *Fatal Error: Call to undefined function curl_init()* ab.
* **Fehlersuche & Lösung:** Die Standardkonfiguration von frisch installierten PHP-Distributionen unter Windows lädt standardmäßig keinerlei Extensions. Ich musste die Vorlage `php.ini-development` manuell in eine aktive `php.ini` umwandeln und das Semikolon vor `extension=curl` entfernen. Derselbe Schritt war später für die SQLite-Treiber (`pdo_sqlite`) notwendig. KI-Untersützung zur Hilfe wie dieser Fehler zustande kam.

### 2. Das Problem mit veraltetem Code in modernen PHP-Versionen (PHP 8.5)
* **Problem:** Nach der Behebung des cURL-Fehlers gab das Skript zwar Daten aus, das JavaScript konnte das JSON jedoch nicht parsen (*SyntaxError: Unexpected token '<' ...*). Grund war eine HTML-Warnung, die sich vor das JSON schob: `Deprecated: Function curl_close() is deprecated since 8.5`.
* **Erkenntnis:** Da PHP 8.0 cURL-Verbindungen intern als Objekte statt als Ressourcen behandelt, schließt PHP diese am Skriptende automatisch. Der Aufruf von `curl_close()` erzeugt in modernsten Versionen Warnungen.
* **Lösung:** Entfernen der Codezeile.

### 3. Lokale Server Ladung über VPN
* **Problem:** Das laden der Serverfragen über lokalem Ausführen führte immer zu einem `Network-Error: Timeout`
* **Ursache:** Der Grund war die extension in VS Code der `Live Server` von `Ritwick Dey`.
               Dieser könnte keine PHP Dateien ausführen was zu einem Timeout führte, da nie eine Antwort an das fetch kam.
* **Lösung:**  Wechseln auf eine andere extension `PHP Server` von `brapifra`, dieser benötigt zusätzlich php auf dem Rechner oder Server.
`

---

## Persönlicher Lernfortschritt

Durch die Bearbeitung dieses Belegs habe ich tiefgehende praktische Kenntnisse in folgenden Bereichen erlangt:
* **Asynchrone Programmierung:** Intensiver Einsatz von `async/await` und `fetch()` im Zusammenspiel mit HTTP-Statuscodes und JSON-Parsing.
* **Nutzung von PHP:** Großer Einsatz von PHP für Curl-Befehle mit Zusammenspiel beim zusammenpacken eines Befehls.
* **Offline-First-Design:** Die Erkenntnis, dass eine Web-App durch Service Worker und `localStorage` die Ausfallsicherheit und Haptik einer nativen Desktop-/Mobile-App annehmen kann.

---

## Vorschläge zur zukünftigen Erweiterung / Verbesserung

Obwohl der Beleg alle Anforderungen vollumfänglich erfüllt, bietet die Architektur exzellente Ansätze für zukünftige Optimierungen:

1. **Globale Leaderboards via WebSockets:** Statt einer rein lokalen SQLite-Datenbank, die nur die Ergebnisse des aktuellen Geräts kennt, könnte das Backend auf einen zentralen MySQL-/PostgreSQL-Server im Netz umgestellt werden. Über WebSockets könnten Highscores in Echtzeit an alle geöffneten Quiz-Anwendungen gepusht werden.
2. **Audio-Erweiterung für den Musik-Bereich:** Ergänzung der VexFlow-Notenanzeige um echte Audio-Hörbeispiele (MP3-Dateien), die über die HTML5 Audio-API abgespielt werden. Der Code hierfür wurde in der Architektur bereits vorbereitet (Caching-Strukturen im Service Worker für Mediendateien sind vorhanden).
3. **Erweiterte Fehleranalyse für Lernende:** Speicherung, *welche* Fragen am häufigsten falsch beantwortet wird mit Statistikansicht.
4. **Zufällige Fragen:** Ändern der Fragen Reihenfolge bei lokalen und Serverfragen.