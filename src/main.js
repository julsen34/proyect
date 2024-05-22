import { processImage } from './imageProcessor.js';
import { generateResponse } from './aiResponses.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("Documento cargado y listo");

    // Configuración de eventos
    document.querySelector('#uploadForm').addEventListener('submit', handleImageUpload);

    // Cargar historial de imágenes
    loadImageHistory();
});

/**
 * Maneja la carga de imágenes.
 * @param {Event} event - El evento submit del formulario.
 */
function handleImageUpload(event) {
    event.preventDefault();
    const fileInput = document.querySelector('#imagen');
    const file = fileInput.files[0];

    if (!file) {
        alert("Por favor, selecciona una imagen para cargar.");
        return;
    }

    if (!file.type.startsWith('image/')) {
        alert("El archivo seleccionado no es una imagen. Por favor, selecciona un archivo de imagen.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const image = new Image();
        image.src = e.target.result;
        document.querySelector('#imagePreview').innerHTML = ''; // Limpiar previa imagen
        document.querySelector('#imagePreview').appendChild(image);

        // Procesar la imagen
        const analysisResults = processImage(image);

        // Generar respuesta de IA
        const response = generateResponse(analysisResults);

        // Guardar en historial
        saveImageHistory(image.src, response);

        // Mostrar respuesta en la página
        displayResponse(response);
    };
    reader.readAsDataURL(file);
}

/**
 * Muestra la respuesta generada por la IA en la página.
 * @param {String} response - La respuesta generada por la IA.
 */
function displayResponse(response) {
    const responseContainer = document.querySelector('#responseContainer');
    responseContainer.textContent = response;
}

/**
 * Guarda el historial de imágenes en localStorage.
 * @param {String} imageSrc - La fuente de la imagen.
 * @param {String} response - La respuesta generada.
 */
function saveImageHistory(imageSrc, response) {
    const history = JSON.parse(localStorage.getItem('imageHistory')) || [];
    const newEntry = { imageSrc, response, date: new Date().toLocaleString() };
    history.push(newEntry);
    localStorage.setItem('imageHistory', JSON.stringify(history));
    loadImageHistory();
}

/**
 * Carga el historial de imágenes desde localStorage.
 */
function loadImageHistory() {
    const historyContainer = document.querySelector('#imageHistory');
    const history = JSON.parse(localStorage.getItem('imageHistory')) || [];

    historyContainer.innerHTML = ''; // Limpiar historial previo

    history.forEach(entry => {
        const div = document.createElement('div');
        div.innerHTML = `
            <img src="${entry.imageSrc}" alt="Imagen del historial" style="max-width: 100px;">
            <p>${entry.date}</p>
            <p>${entry.response}</p>
        `;
        historyContainer.appendChild(div);
    });
}



