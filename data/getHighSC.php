<?php
// data/getHighSC.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json; charset=utf-8');

// Fehler-Anzeige im Browser unterdrücken, damit sie das JSON nicht kaputt macht
ini_set('display_errors', 0); 

$dbFile = __DIR__ . DIRECTORY_SEPARATOR . 'highscores.sqlite';

try {
    if (!file_exists($dbFile)) {
        // Falls die Datei noch gar nicht existiert, leeres Array zurückgeben
        echo json_encode([]);
        exit;
    }

    $pdo = new PDO('sqlite:' . $dbFile);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // WICHTIG: Timeout erhöhen, falls die Datenbank mal kurz beschäftigt ist (verhindert Locks)
    $pdo->exec('PRAGMA busy_timeout = 5000;');

    $category = $_GET['category'] ?? '';

    if (!empty($category)) {
        $stmt = $pdo->prepare("SELECT name, score FROM scores WHERE category = :category ORDER BY score DESC, date ASC LIMIT 10");
        $stmt->execute(['category' => $category]);
    } else {
        $stmt = $pdo->query("SELECT name, score FROM scores ORDER BY score DESC, date ASC LIMIT 10");
    }

    $scores = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Immer ein gültiges JSON ausgeben!
    echo json_encode($scores ? $scores : []);

} catch (Exception $e) {
    // Falls etwas schiefläuft, senden wir den Fehler als JSON-Objekt zurück!
    http_response_code(500);
    echo json_encode([
        "error" => true,
        "message" => "Datenbank-Fehler: " . $e->getMessage()
    ]);
}
?>