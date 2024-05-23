export async function processImage(file) {
    console.log("Procesando imagen", file);
    // Simulación del análisis de la imagen
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await generateResponse(file);
    saveImageToHistory(URL.createObjectURL(file));
    displayResponse(response);
}

function saveImageToHistory(imageUrl) {
    const imageHistory = JSON.parse(localStorage.getItem('imageHistory')) || [];
    imageHistory.push(imageUrl);
    localStorage.setItem('imageHistory', JSON.stringify(imageHistory));
}

function displayResponse(response) {
    const responseContainer = document.querySelector('#responseContainer');
    responseContainer.innerHTML = `<p>${response}</p>`;
}

