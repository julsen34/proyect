export function processImage(image) {
    console.log("Procesando imagen:", image.src);

    // Implementar lógica de procesamiento de imágenes
    const result = analyzeImage(image);
    return result;
}

function analyzeImage(image) {
    // Simular un análisis de la imagen
    const result = {
        health: "Saludable",
        recommendations: "Mantener las condiciones actuales."
    };
    return result;
}
