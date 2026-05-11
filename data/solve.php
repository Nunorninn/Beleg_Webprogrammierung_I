<?php

$id = $_GET['id'];
$index = (int)$_GET['index'];

$user = "test@gmail.com";
$pass = "secret";
$url = "https://test.com:8888/api/quizzes/$id/solve";

$data = json_encode([$index]);
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERPWD, "$user:$pass");
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
]);

$output = curl_exec($ch);
curl_close($ch);

header('Content-Type: application/json');
echo $output;
?>