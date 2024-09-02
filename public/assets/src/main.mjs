//main.js


document.addEventListener('DOMContentLoaded', () => {
    console.log("Documento cargado y listo");

    // Configuración de eventos
    document.querySelector('#uploadForm').addEventListener('submit', handleImageUpload);

    // Cargar historial de imágenes
    loadImageHistory();
});

async function handleImageUpload(event) {
    event.preventDefault();
    const fileInput = document.querySelector('#imagen');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const imageUrl = URL.createObjectURL(file);
        document.querySelector('#imagePreview').innerHTML = `<img src="${imageUrl}" alt="Vista previa de la imagen" class="imagen-preview">`;
        await processImage(file);
    }
}

function loadImageHistory() {
    const historyContainer = document.querySelector('#imageHistory');
    const imageHistory = JSON.parse(localStorage.getItem('imageHistory')) || [];
    imageHistory.forEach(imageUrl => {
        historyContainer.innerHTML += `<img src="${imageUrl}" alt="Imagen del historial" class="imagen-historial">`;
    });
}


