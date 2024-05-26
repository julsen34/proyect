//aiResponses.js

import { ImageHistory, upload, createImageHistory } from '../server/models/imageHistory';
export { ImageHistory };

export function generateResponse(analysis) {
  let response = '';
  if (analysis.health === 'good') {
    response = 'La imagen muestra un crecimiento saludable. Se recomienda mantener las condiciones actuales.';
  } else if (analysis.health === 'fair') {
    response = 'La imagen muestra un crecimiento regular. Se recomienda ajustar la cantidad de agua y luz para mejorar el crecimiento.';
  } else if (analysis.health === 'poor') {
    response = 'La imagen muestra un crecimiento deficiente. Se recomienda revisar las condiciones de cultivo y considerar la posibilidad de trasplantar la planta a un lugar más adecuado.';
  }
  if (analysis.water === 'low') {
    response += ' Se detecta un nivel bajo de humedad en el suelo. Se recomienda regar la planta.';
  } else if (analysis.water === 'high') {
    response += ' Se detecta un nivel alto de humedad en el suelo. Se recomienda reducir la frecuencia de riego.';
  }
  if (analysis.light === 'low') {
    response += ' Se detecta una cantidad insuficiente de luz. Se recomienda mover la planta a un lugar más iluminado.';
  } else if (analysis.light === 'high') {
    response += ' Se detecta una cantidad excesiva de luz. Se recomienda mover la planta a un lugar con sombra parcial.';
  }
  return response;
}

export default generateResponse;