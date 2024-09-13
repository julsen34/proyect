import tensorflow as tf
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras.applications.efficientnet import preprocess_input, decode_predictions
from tensorflow.keras.preprocessing import image
import numpy as np

def predict_image(img_path):
    # Cargar modelo preentrenado EfficientNetB0
    model = EfficientNetB0(weights='imagenet')

    # Cargar y procesar la imagen
    img = image.load_img(img_path, target_size=(224, 224))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)

    # Realizar predicciones
    preds = model.predict(x)

    # Decodificar las predicciones
    print('Predicted:', decode_predictions(preds, top=3)[0])

if __name__ == "__main__":
    # Ruta de la imagen para predecir
    img_path = 'ruta/a/tu/imagen.jpg'
    predict_image(img_path)
