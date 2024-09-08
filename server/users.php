

<?php

function loginUser($data) {
    $email = $data['email'];
    $password = $data['password'];

    // Conectar a la base de datos
    $conn = new mysqli('localhost', 'usuario', 'contraseña', 'plant-db');

    if ($conn->connect_error) {
        return ['message' => 'Conexión fallida: ' . $conn->connect_error];
    }

    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $stmt->close();
            $conn->close();
            return ['message' => 'Inicio de sesión exitoso'];
        } else {
            $stmt->close();
            $conn->close();
            return ['message' => 'Contraseña incorrecta'];
        }
    } else {
        $stmt->close();
        $conn->close();
        return ['message' => 'Usuario no encontrado'];
    }
}
?>
