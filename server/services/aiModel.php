<!-- server/aiModel.php -->

<?php
require_once 'proyect-main\vendor\autoload.php';

use Phpml\ModelManager;

class AIModel {
    public static function analyzeImage($imagePath) {
        $modelManager = new ModelManager();
        $model = $modelManager->restoreFromFile('path/to/your/model');

        // Lógica de preprocesamiento de la imagen
        $imageArray = self::preprocessImage($imagePath); // Llama al método preprocessImage

        if (is_array($imageArray)) { // Verifica que la imagen se procesó correctamente
            $predictions = $model->predict($imageArray);
            return $predictions;
        } else {
            return $imageArray; // Devuelve el error si la imagen no se pudo procesar
        }
    }

    // Función de preprocesamiento de imagen
    private static function preprocessImage($imagePath) {
        // Cargar la imagen usando GD
        $img = imagecreatefromjpeg($imagePath); // Cambiar a imagecreatefrompng() o imagecreatefromjpeg() según el formato de tu imagen

        if (!$img) {
            return ['status' => 'error', 'message' => 'Failed to process image.'];
        }

        $width = imagesx($img);
        $height = imagesy($img);

        $pixels = [];
        for ($y = 0; $y < $height; $y++) {
            for ($x = 0; $x < $width; $x++) {
                $rgb = imagecolorat($img, $x, $y);
                $colors = imagecolorsforindex($img, $rgb);
                $pixels[] = [$colors['red'], $colors['green'], $colors['blue']];
            }
        }

        imagedestroy($img); // Liberar la memoria

        return $pixels; // Retornar la matriz de píxeles
    }
}
?>


