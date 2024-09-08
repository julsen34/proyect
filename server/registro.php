<!-- server/registro.php -->

<?php
function registerUser($data) {
    $nombre = $data['nombre'];
    $email = $data['email'];
    $password = password_hash($data['password'], PASSWORD_BCRYPT);

    // Conectar a la base de datos
    $conn = new mysqli('localhost', 'usuario', 'contraseña', 'plant-db');

    if ($conn->connect_error) {
        return ['message' => 'Conexión fallida: ' . $conn->connect_error];
    }

    // Verificar si el usuario ya existe
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $stmt->close();
        $conn->close();
        return ['message' => 'El usuario ya existe'];
    } else {
        $sql = "INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $nombre, $email, $password);
        if ($stmt->execute()) {
            $stmt->close();
            $conn->close();
            
            // Redirigir a la página de inicio
            header('Location: /ruta/a/inicio.html');
            exit(); // Asegurarse de que el script se detenga después de la redirección
        } else {
            $stmt->close();
            $conn->close();
            return ['message' => 'Error al registrar usuario'];
        }
    }
}
?>

