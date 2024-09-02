<!-- users.js -->

<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Conectar a la base de datos
    $conn = new mysqli('localhost', 'usuario', 'contraseña', 'plant-db');

    if ($conn->connect_error) {
        die('Conexión fallida: ' . $conn->connect_error);
    }

    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            echo json_encode(['message' => 'Inicio de sesión exitoso']);
            // Redireccionar a la página de inicio
            header('Location: inicio.php');
        } else {
            echo json_encode(['message' => 'Contraseña incorrecta']);
        }
    } else {
        echo json_encode(['message' => 'Usuario no encontrado']);
    }

    $stmt->close();
    $conn->close();
}
?>
