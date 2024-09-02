<!-- server/controllers/UserController.php -->

<?php
require_once '../models/User.php';

class UserController {
    public function login($email, $password) {
        return User::login($email, $password);
    }

    public function register($name, $email, $password) {
        return User::register($name, $email, $password);
    }
}
?>
