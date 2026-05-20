<?php
// backend/get_scores.php
header('Content-Type: application/json');
require 'db.php';

$category = $_GET['category'] ?? 'Mathematik';

// Lade die Top 10 der gewählten Kategorie, absteigend sortiert nach Score
$stmt = $pdo->prepare("SELECT name, score, date FROM scores WHERE category = :category ORDER BY score DESC LIMIT 10");
$stmt->execute([':category' => $category]);

$highscores = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($highscores);
?>