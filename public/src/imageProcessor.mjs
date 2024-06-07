
// src/imageProcessor.mjs

const processImage = async (imageFile) => {
  // Asumiendo que esta función es un placeholder por ahora
  return {
    success: true,
    message: 'Imagen procesada correctamente',
    data: {
      analysis: 'Análisis detallado de la imagen procesada'
    }
  };
};

document.getElementById('uploadForm').addEventListener('submit', async (event) => {
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
