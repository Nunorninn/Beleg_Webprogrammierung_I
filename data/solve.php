<?php
// Parameter von der URL (app.js) holen
$id = isset($_GET['id']) ? $_GET['id'] : 1;
$index = isset($_GET['index']) ? (int)$_GET['index'] : 0;

// Zugangsdaten
$user = "1@gmail.com";
$pass = "secret";
$url = "https://idefix.informatik.htw-dresden.de:8888/api/quizzes/" . $id . "/solve";

// Das entspricht --data '[1]'
$data = json_encode([$index]);

$ch = curl_init();

// Entspricht der URL im Terminal
curl_setopt($ch, CURLOPT_URL, $url);

// Entspricht -X POST
curl_setopt($ch, CURLOPT_POST, true); 

// Entspricht --user test@gmail.com:secret
curl_setopt($ch, CURLOPT_USERPWD, "$user:$pass");
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

// Entspricht -H 'Content-Type: application/json'
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($data)
]);

// Entspricht --data '[1]'
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

// Antwort als String zurückgeben statt direkt auszugeben
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Falls der Server ein SSL-Zertifikat nutzt, das PHP nicht kennt (oft bei Port 8888)
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$output = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    $error_msg = curl_error($ch);
}
curl_close($ch);

// Rückgabe an JavaScript
header('Content-Type: application/json');

if (isset($error_msg)) {
    echo json_encode(["success" => false, "error" => $error_msg]);
} else {
    // Wenn der Server leer antwortet (204 No Content), senden wir ein gültiges JSON-Objekt
    if (empty($output)) {
        echo json_encode(["success" => ($httpCode < 300)]);
    } else {
        echo $output;
    }
}
?>