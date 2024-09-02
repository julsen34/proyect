<!--proyect/server/app.php -->

<?php
require '../vendor/autoload.php';
require __DIR__ . '/services/db.php';
require __DIR__ . '/models/imageHistory.php';
require './users.php';
require './upload.php';
require './registro.php';

use Slim\Factory\AppFactory;

$app = AppFactory::create();

// Ruta de inicio
$app->get('/', function ($request, $response, $args) {
    $response->getBody()->write("Bienvenido a la API de gestión de plantas!");
    return $response;
});

// Ruta de usuarios
$app->post('/users/login', function ($request, $response, $args) {
    include 'users.php';
    return $response;
});

// Ruta de registro
$app->post('/users/register', function ($request, $response, $args) {
    include 'registro.php';
    return $response;
});

// Ruta de subida de imágenes
$app->post('/upload', function ($request, $response, $args) {
    include 'upload.php';
    return $response;
});

// Ruta de historial de imágenes
$app->get('/imageHistory', function ($request, $response, $args) {
    include 'imageHistory.php';
    return $response;
});

$app->run();
?>

