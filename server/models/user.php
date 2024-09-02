<!-- server/models/user.mjs -->


<?php
require_once '../services/DB.php';

class User {
    public static function login($email, $password) {
        $conn = DB::getConnection();

        $sql = "SELECT * FROM users WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password'])) {
                session_start();
                $_SESSION['user_id'] = $user['id'];
                $conn->close(); // Mueve el cierre de conexión antes del return
                return ['status' => 'success', 'message' => 'Login successful'];
            } else {
                $conn->close(); // Mueve el cierre de conexión antes del return
                return ['status' => 'error', 'message' => 'Invalid password'];
            }
        } else {
            $conn->close(); // Mueve el cierre de conexión antes del return
            return ['status' => 'error', 'message' => 'User not found'];
        }
    }

    public static function register($name, $email, $password) {
        $conn = DB::getConnection();

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $name, $email, $hashedPassword);

        if ($stmt->execute()) {
            $conn->close(); // Mueve el cierre de conexión antes del return
            return ['status' => 'success', 'message' => 'Registration successful'];
        } else {
            $conn->close(); // Mueve el cierre de conexión antes del return
            return ['status' => 'error', 'message' => 'Registration failed'];
        }
    }
}
?>

