<!-- /workspaces/proyect/server/upload.php -->

<?php

function uploadImage($uploadedFiles) {
    $directory = __DIR__ . '/../uploads/';

    if (!file_exists($directory)) {
        mkdir($directory, 0755, true);
    }

    $image = $uploadedFiles['imagen'];
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    
    // Validar tipo de archivo
    if (!in_array($image->getClientMediaType(), $allowedTypes)) {
        return ['success' => false, 'message' => 'Solo se permiten archivos de imagen.'];
    }
    
    // Validar tamaño del archivo (5MB)
    if ($image->getSize() > 5000000) {
        return ['success' => false, 'message' => 'El archivo es demasiado grande.'];
    }

    // Guardar el archivo
    $filename = moveUploadedFile($directory, $image);

    if ($filename) {
        return [
            'success' => true,
            'message' => 'Imagen subida correctamente',
            'data' => [
                'imageUrl' => '/uploads/' . $filename
            ]
        ];
    } else {
        return ['success' => false, 'message' => 'Error al subir la imagen.'];
    }
}

function moveUploadedFile($directory, $uploadedFile) {
    $filename = uniqid() . '_' . $uploadedFile->getClientFilename();
    $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $filename);
    return $filename;
}
?>
