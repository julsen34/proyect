// src/aiResponses.js

/**
 * Genera respuestas basadas en el análisis de la imagen.
 * @param {Object} analysisResults - Resultados del análisis de la imagen.
 * @returns {String} Respuesta generada por la IA.
 */
function generateResponse(analysisResults) {
    console.log("Generando respuesta basada en los resultados del análisis:", analysisResults);
    
    // Simulación de generación de respuesta
    let response;
    if (analysisResults.health === "Saludable") {
        response = "La imagen muestra un crecimiento saludable. Se recomienda mantener las condiciones actuales.";
    } else {
        response = "Se detecta un problema con la planta. Se recomienda revisar las condiciones de cultivo.";
    }

    return response;
}

export { generateResponse };
