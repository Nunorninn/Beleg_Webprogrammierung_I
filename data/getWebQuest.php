<?php
$id = isset($_GET['id']) ? $_GET['id'] : 1; // Falls keine ID übergeben wurde, nimm die 1

$user = "1@gmail.com";
$pass = "secret";
// Wir hängen die ID dynamisch an die URL an
$url = "https://idefix.informatik.htw-dresden.de:8888/api/quizzes/" . $id;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERPWD, "$user:$pass");
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

// Wichtig für HTTPS-Anfragen (falls das Zertifikat auf dem Server zickt)
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 

$output = curl_exec($ch);
curl_close($ch);

header('Content-Type: application/json');
echo $output;
?>