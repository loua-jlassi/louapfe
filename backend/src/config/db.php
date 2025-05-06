<?php
function connectToDatabase() {
    // Paramètres de connexion
    $host = 'localhost';
    $user = 'root';
    $password = 'foulou2025.';
    $db = 'feature_catalog';
    $port = 3306;

    // Création de la connexion
    $conn = new mysqli($host, $user, $password, $db, $port);

    // Vérification de la connexion
    if ($conn->connect_error) {
        die("La connexion a échoué: " . $conn->connect_error);
    }

    return $conn;
}
?>
