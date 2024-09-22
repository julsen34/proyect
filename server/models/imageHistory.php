<!-- server/models/imageHistory.php -->

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

        // Validar si la consulta fue exitosa
        if ($result === false) {
            throw new Exception('Error en la consulta SQL: ' . $conn->error);
        }

        // Si hay resultados, agregarlos al array
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                // Escape de los datos para evitar XSS
                $row['image_url'] = htmlspecialchars($row['image_url'], ENT_QUOTES, 'UTF-8');
                $row['description'] = htmlspecialchars($row['description'], ENT_QUOTES, 'UTF-8');
                $historial[] = $row;
            }
        }

        return [
            'success' => true,
            'message' => 'Historial de imágenes recuperado con éxito',
            'data' => $historial
        ];

    } catch (Exception $e) {
        // Manejo de errores: Loguear el error
        error_log('Error al obtener el historial de imágenes: ' . $e->getMessage());
        return [
            'success' => false,
            'message' => 'Error al obtener el historial de imágenes'
        ];
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

    if ($historial['success']) {
        // Retornar el historial de imágenes como JSON
        header('Content-Type: application/json');
        echo json_encode($historial);
    } else {
        // Manejo de errores: enviar mensaje de error en formato JSON
        header('Content-Type: application/json', true, 500);
        echo json_encode([
            'success' => false,
            'message' => $historial['message']
        ]);
    }
}
?>

