<!--proyect/server/app.php -->

<?php
// Cargar el autoloader de Composer
require __DIR__ . '/../vendor/autoload.php';

// Cargar archivos de configuración y modelos
require __DIR__ . '/../server/services/db.php';  
require __DIR__ . '/../server/models/imageHistory.php';  
require __DIR__ . '/upload.php'; 
require __DIR__ . '/registro.php';

use Slim\Factory\AppFactory;

// Crear la aplicación Slim
$app = AppFactory::create();

// Middleware de manejo de errores
$app->addErrorMiddleware(true, true, true);

// Definir las rutas

// Ruta de inicio
$app->get('/', function ($request, $response, $args) {
    $response->getBody()->write("Bienvenido a la API de gestión de plantas!");
    return $response;
});

// Ruta de inicio de sesión de usuarios
$app->post('/users/login', function ($request, $response, $args) {
    $data = $request->getParsedBody();
    $resultado = loginUser($data);
    $response->getBody()->write(json_encode($resultado));
    return $response->withHeader('Content-Type', 'application/json');
});

// Ruta de registro de usuarios
$app->post('/users/register', function ($request, $response, $args) {
    $data = $request->getParsedBody();
    $resultado = registerUser($data); 
    $response->getBody()->write(json_encode($resultado));
    return $response->withHeader('Content-Type', 'application/json');
});

// Ruta de subida de imágenes
$app->post('/upload', function ($request, $response, $args) {
    $uploadedFiles = $request->getUploadedFiles();
    $resultado = uploadImage($uploadedFiles); 
    $response->getBody()->write(json_encode($resultado));
    return $response->withHeader('Content-Type', 'application/json');
});

// Ruta de historial de imágenes
$app->get('/imageHistory', function ($request, $response, $args) {
    $resultado = getImageHistory(); 
    $response->getBody()->write(json_encode($resultado));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->run();
?>

