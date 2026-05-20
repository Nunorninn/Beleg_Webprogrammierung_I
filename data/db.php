<?php

// Pfad SQLite-Datei (automatisch erstellt -> fehlt)
$dbFile = __DIR__ . '/highscores.sqlite';

try {
    // Verbindung herstellen
    $pdo = new PDO('sqlite:' . $dbFile);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Tabelle erstellen, falls sie noch nicht existiert
    $query = "CREATE TABLE IF NOT EXISTS scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        score INTEGER NOT NULL,
        date DATETIME DEFAULT CURRENT_TIMESTAMP
    )";
    $pdo->exec($query);

} catch (PDOException $e) {
    echo json_encode(["error" => "Datenbank-Fehler: " . $e->getMessage()]);
    exit;
}
?>