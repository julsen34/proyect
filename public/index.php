<!-- public/index.php -->

<?php
require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../server/app.php'; 

use Slim\Factory\AppFactory;

$app = AppFactory::create(); 

$app->run(); // Ejecuta la aplicación
?>


