export async function generateResponse(file) {
    console.log("Generando respuesta para la imagen", file);
    // Simulación de una respuesta generada por IA
    await new Promise(resolve => setTimeout(resolve, 1000));
    return "La imagen muestra un crecimiento saludable. Continúa con el buen trabajo!";
}
