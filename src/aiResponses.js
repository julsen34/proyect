export function generateResponse(analysisResult) {
    if (analysisResult.health === "Saludable") {
        return "La imagen muestra un crecimiento saludable. Se recomienda mantener las condiciones actuales.";
    } else {
        return "Se detecta un problema con la planta. Por favor, revise las recomendaciones específicas.";
    }
}
