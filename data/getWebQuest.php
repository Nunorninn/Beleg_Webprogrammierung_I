<?php
$url = " https://idefix.informatik.htw-dresden.de:8888/api/quizzes/10";
$user = "1@gmail.com";
$password = "secret";

// 1. curl Initialisieren
$ch = curl_init();

// 2. Optionen setzen
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Ergebnis als String zurückgeben
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC); // Basic Auth aktivieren
curl_setopt($ch, CURLOPT_USERPWD, "$user:$password"); // Zugangsdaten setzen
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET"); // GET Methode (Standard)

// 3. Ausführen
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// 4. Fehlerprüfung
if(curl_errno($ch)) {
    echo 'Fehler: ' . curl_error($ch);
} else {
    // Ergebnis ausgeben (wird an dein JS gesendet)
    header('Content-Type: application/json');
    echo $response;
}

// 5. Schließen
curl_close($ch);
?>