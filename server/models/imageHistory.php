<!-- server/models/imageHistory.mjs -->

<?php
require_once __DIR__ . '/../services/db.php';

/**
 * Función para obtener el historial de imágenes
 */
function getImageHistory() {
    try {
        // Obtener la conexión a la base de datos
        $conn = DB::getConnection();
        
        // Consultar el historial de imágenes ordenado por fecha descendente
        $sql = "SELECT * FROM image_history ORDER BY date DESC";
        $result = $conn->query($sql);

        // Inicializar array para almacenar el historial de imágenes
        $historial = [];
        
        // Si hay resultados, agregarlos al array
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $historial[] = $row;
            }
        }
        
        return $historial;

    } catch (Exception $e) {
        // Manejo de errores: Loguear o realizar acciones necesarias
        error_log('Error al obtener el historial de imágenes: ' . $e->getMessage());
        return null;
    } finally {
        // Cerrar la conexión a la base de datos si existe
        if (isset($conn)) {
            $conn->close();
        }
    }
}

// Verificar si el método de la solicitud es GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $historial = getImageHistory();

    if ($historial !== null) {
        // Retornar el historial de imágenes como JSON
        header('Content-Type: application/json');
        echo json_encode($historial);
    } else {
        // Manejo de errores: enviar mensaje de error en formato JSON
        header('Content-Type: application/json', true, 500);
        echo json_encode(['error' => 'Error al obtener el historial de imágenes']);
    }
}
?>
