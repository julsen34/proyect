<!--proyect/server/app.php -->

<?php
// Cargar el autoloader de Composer
require __DIR__ . '/../vendor/autoload.php';

// Cargar archivos de configuración y rutas
require __DIR__ . '/services/db.php';
require __DIR__ . '/models/imageHistory.php';
require __DIR__ . '/users.php';
require __DIR__ . '/upload.php';
require __DIR__ . '/registro.php';

use Slim\Factory\AppFactory;

// Crear la aplicación Slim
$app = AppFactory::create();

// Definir las rutas

// Ruta de inicio
$app->get('/', function ($request, $response, $args) {
    $response->getBody()->write("Bienvenido a la API de gestión de plantas!");
    return $response;
});

// Ruta de inicio de sesión de usuarios
$app->post('/users/login', function ($request, $response, $args) {
    // Procesar inicio de sesión
    include __DIR__ . '/users.php';
    return $response;
});

// Ruta de registro de usuarios
$app->post('/users/register', function ($request, $response, $args) {
    // Procesar registro
    include __DIR__ . '/registro.php';
    return $response;
});

// Ruta de subida de imágenes
$app->post('/upload', function ($request, $response, $args) {
    // Procesar subida de imágenes
    include __DIR__ . '/upload.php';
    return $response;
});

// Ruta de historial de imágenes
$app->get('/imageHistory', function ($request, $response, $args) {
    // Obtener historial de imágenes
    include __DIR__ . '/imageHistory.php';
    return $response;
});

// Ejecutar la aplicación
$app->run();
?>


