<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header('Content-Type: application/json; charset=utf-8');

// Datenbankverbindung laden
require 'db.php';

// JSON-Daten empfangen (vom JS fetch)
$data = json_decode(file_get_contents("php://input"), true);

// Prüfen, ob alle Daten da sind
if (isset($data['name']) && isset($data['score']) && isset($data['category'])) {
    
    // Prepared Statement bereiten (Schützt vor SQL-Injection)
    $stmt = $pdo->prepare("INSERT INTO scores (name, category, score) VALUES (:name, :category, :score)");
    
    // Daten in die Datenbank schreiben
    $stmt->execute([
        ':name' => htmlspecialchars($data['name']), // Entfernt gefährliche HTML-Tags
        ':category' => $data['category'],
        ':score' => (int)$data['score']
    ]);

    echo json_encode(["success" => true, "message" => "Highscore gespeichert!"]);
} else {
    echo json_encode(["success" => false, "message" => "Fehlende Daten."]);
}
?>