<!-- server/models/imageHistory.mjs -->

<?php
require_once __DIR__ . '/../services/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $conn = DB::getConnection();

    $sql = "SELECT * FROM image_history ORDER BY date DESC";
    $result = $conn->query($sql);

    $historial = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $historial[] = $row;
        }
    }

    echo json_encode($historial);

    $conn->close();
}
?>
