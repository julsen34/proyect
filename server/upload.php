<!-- /workspaces/proyect/server/upload.php -->

<?php

function uploadImage($uploadedFiles) {
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($uploadedFiles["image"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Verificar si el archivo es una imagen real
    $check = getimagesize($uploadedFiles["image"]["tmp_name"]);
    if ($check !== false) {
        $uploadOk = 1;
    } else {
        return "El archivo no es una imagen.";
    }

    // Verificar si el archivo ya existe
    if (file_exists($target_file)) {
        return "El archivo ya existe.";
    }

    // Verificar el tamaño del archivo
    if ($uploadedFiles["image"]["size"] > 500000) {
        return "El archivo es demasiado grande.";
    }

    // Permitir ciertos formatos de archivo
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
    && $imageFileType != "gif" ) {
        return "Solo se permiten archivos JPG, JPEG, PNG y GIF.";
    }

    // Intentar subir el archivo
    if (move_uploaded_file($uploadedFiles["image"]["tmp_name"], $target_file)) {
        // Conectar a la base de datos y guardar el historial
        $conn = new mysqli('localhost', 'usuario', 'contraseña', 'plant-db');

        if ($conn->connect_error) {
            return 'Conexión fallida: ' . $conn->connect_error;
        }

        $imageSrc = $target_file;
        $response = ''; // Ajusta según sea necesario
        $date = date('Y-m-d H:i:s');

        $sql = "INSERT INTO image_history (imageSrc, response, date) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $imageSrc, $response, $date);
        $stmt->execute();

        $stmt->close();
        $conn->close();
        return "Historial de imagen guardado.";
    } else {
        return "Lo siento, hubo un error al subir tu archivo.";
    }
}
?>
