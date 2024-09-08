<!--proyect/server/app.php -->

<?php
// Cargar el autoloader de Composer
require __DIR__ . '/../vendor/autoload.php';

// Cargar archivos de configuración y modelos
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
    $data = $request->getParsedBody();
    $resultado = loginUser($data); 
    $response->getBody()->write(json_encode($resultado));
    return $response->withHeader('Content-Type', 'application/json');
});

// Ruta de registro de usuarios
$app->post('/users/register', function ($request, $response, $args) {
    // Procesar registro
    $data = $request->getParsedBody();
    $resultado = registerUser($data); 
    $response->getBody()->write(json_encode($resultado));
    return $response->withHeader('Content-Type', 'application/json');
});

// Ruta de subida de imágenes
$app->post('/upload', function ($request, $response, $args) {
    // Procesar subida de imágenes
    $uploadedFiles = $request->getUploadedFiles();
    $resultado = uploadImage($uploadedFiles); 
    $response->getBody()->write(json_encode($resultado));
    return $response->withHeader('Content-Type', 'application/json');
});

// Ruta de historial de imágenes
$app->get('/imageHistory', function ($request, $response, $args) {
    // Obtener historial de imágenes
    $resultado = getImageHistory(); 
    $response->getBody()->write(json_encode($resultado));
    return $response->withHeader('Content-Type', 'application/json');
});

// Ejecutar la aplicación
$app->run();
?>


