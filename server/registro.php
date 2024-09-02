<!-- server/registro.php -->

<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

    // Conectar a la base de datos
    $conn = new mysqli('localhost', 'usuario', 'contraseña', 'plant-db');

    if ($conn->connect_error) {
        die('Conexión fallida: ' . $conn->connect_error);
    }

    // Verificar si el usuario ya existe
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(['message' => 'El usuario ya existe']);
    } else {
        $sql = "INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $nombre, $email, $password);
        if ($stmt->execute()) {
            // Redirigir al usuario a inicio.html
            header('Location: proyect-main\server\views\inicio.html');
            exit(); // Asegurarse de que el script se detenga después de la redirección
        } else {
            echo json_encode(['message' => 'Error al registrar usuario']);
        }
    }

    $stmt->close();
    $conn->close();
}
?>

