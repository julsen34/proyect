<!-- server/db.php -->

<?php
class DB {
    private static $connection;

    public static function getConnection() {
        if (!self::$connection) {
            $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../');
            $dotenv->load();

            $host = $_ENV['DB_HOST'];
            $dbname = $_ENV['DB_NAME'];
            $username = $_ENV['DB_USERNAME'];
            $password = $_ENV['DB_PASSWORD'];

            // Corrige el orden de los parámetros de mysqli
            self::$connection = new mysqli($host, $username, $password, $dbname);

            if (self::$connection->connect_error) {
                die("Connection failed: " . self::$connection->connect_error);
            }
        }

        return self::$connection;
    }
}
?>

