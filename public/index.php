<!-- public/index.php -->

<?php
require __DIR__ . '/../vendor/autoload.php'; // Asegúrate de que la ruta es correcta
require __DIR__ . '/../server/app.php'; // Incluye el archivo que configura las rutas y la aplicación

use Slim\Factory\AppFactory;

$app = AppFactory::create(); // Usa AppFactory para crear la instancia de la aplicación

$app->run(); // Ejecuta la aplicación
?>


