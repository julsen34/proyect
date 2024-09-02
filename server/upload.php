<!-- /workspaces/proyect/server/upload.php -->

<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["image"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Verificar si el archivo es una imagen real
    $check = getimagesize($_FILES["image"]["tmp_name"]);
    if ($check !== false) {
        $uploadOk = 1;
    } else {
        echo "El archivo no es una imagen.";
        $uploadOk = 0;
    }

    // Verificar si el archivo ya existe
    if (file_exists($target_file)) {
        echo "El archivo ya existe.";
        $uploadOk = 0;
    }

    // Verificar el tamaño del archivo
    if ($_FILES["image"]["size"] > 500000) {
        echo "El archivo es demasiado grande.";
        $uploadOk = 0;
    }

    // Permitir ciertos formatos de archivo
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
    && $imageFileType != "gif" ) {
        echo "Solo se permiten archivos JPG, JPEG, PNG y GIF.";
        $uploadOk = 0;
    }

    // Verificar si $uploadOk está configurado a 0 por un error
    if ($uploadOk == 0) {
        echo "Lo siento, tu archivo no fue subido.";
    // Si todo está bien, intenta subir el archivo
    } else {
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
            echo "El archivo ". htmlspecialchars(basename($_FILES["image"]["name"])). " ha sido subido.";
        
            // Conectar a la base de datos y guardar el historial
            $conn = new mysqli('localhost', 'usuario', 'contraseña', 'plant-db');
        
            if ($conn->connect_error) {
                die('Conexión fallida: ' . $conn->connect_error);
            }
        
            // Asigna los valores a variables antes de pasarlos a bind_param
            $imageSrc = $target_file;
            $response = ''; // Ajusta según sea necesario
            $date = date('Y-m-d H:i:s');
        
            $sql = "INSERT INTO image_history (imageSrc, response, date) VALUES (?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sss", $imageSrc, $response, $date);
            $stmt->execute();
        
            echo "Historial de imagen guardado.";
            $stmt->close();
            $conn->close();
        } else {
            echo "Lo siento, hubo un error al subir tu archivo.";
        }
        
    }
}
?>
