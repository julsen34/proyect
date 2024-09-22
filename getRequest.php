<!-- getRequest.php -->

<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Capturar parámetros de la URL
    $parametro = isset($_GET['parametro']) ? $_GET['parametro'] : null;

    // Lógica para procesar la solicitud
    if ($parametro) {
        echo "El parámetro recibido es: " . htmlspecialchars($parametro);
    } else {
        echo "No se recibió ningún parámetro.";
    }
} else {
    echo "Método no permitido.";
}
?>
