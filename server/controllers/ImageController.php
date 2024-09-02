<!-- server/controllers/ImageController.php -->

<?php
require_once '../services/AIModel.php';

class ImageController {
    public function upload($file) {
        $result = AIModel::analyzeImage($file);
        return $result;
    }
}
?>
