//main.php


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subida de Imágenes</title>
</head>
<body>
    <h1>Subir Imagen</h1>

    <form id="uploadForm" action="/upload" method="POST" enctype="multipart/form-data">
        <label for="imagen">Seleccionar imagen:</label>
        <input type="file" id="imagen" name="imagen" required><br><br>
        <button type="submit">Subir Imagen</button>
    </form>

    <div id="responseContainer"></div>

    <div id="imagePreview"></div>
    <div id="imageHistory"></div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            console.log("Documento cargado y listo");

            // Manejar la subida de imagen
            document.querySelector('#uploadForm').addEventListener('submit', async function(event) {
                event.preventDefault();

                const formData = new FormData(event.target);

                try {
                    const response = await fetch('/upload', {
                        method: 'POST',
                        body: formData
                    });

                    const result = await response.json();

                    if (result.success) {
                        document.getElementById('responseContainer').innerHTML = `
                            <p>${result.message}</p>
                            <p>${result.data.analysis}</p>
                        `;
                    } else {
                        throw new Error(result.message);
                    }
                } catch (error) {
                    document.getElementById('responseContainer').innerHTML = `<p>Error: ${error.message}</p>`;
                }
            });

            // Cargar historial de imágenes
            loadImageHistory();
        });

        function loadImageHistory() {
            // Realizar una solicitud para obtener el historial de imágenes
            fetch('/imageHistory')
                .then(response => response.json())
                .then(data => {
                    const historyContainer = document.getElementById('imageHistory');
                    data.forEach(image => {
                        historyContainer.innerHTML += `
                            <img src="${image.image_url}" alt="Imagen del historial" class="imagen-historial">
                        `;
                    });
                })
                .catch(error => {
                    console.error('Error al cargar el historial de imágenes:', error);
                });
        }
    </script>
</body>
</html>



