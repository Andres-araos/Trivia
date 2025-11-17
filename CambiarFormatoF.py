from PIL import Image
import os

def convertir_webp_a_jpg(ruta_webp, ruta_jpg):
        try:
            with Image.open(ruta_webp) as img:
                img.save(ruta_jpg, 'JPEG')
            print(f"El archivo {ruta_webp} se convirtió a {ruta_jpg}")
        except FileNotFoundError:
            print(f"Error: No se encontró el archivo {ruta_webp}")
        except Exception as e:
            print(f"Ocurrió un error: {e}")

nombre_archivo_webp = "bolt.webp" 
nombre_archivo_jpg = "bolt.jpeg"

ruta_actual = os.path.dirname(__file__)
ruta_completa_webp = os.path.join(ruta_actual, nombre_archivo_webp)
ruta_completa_jpg = os.path.join(ruta_actual, nombre_archivo_jpg)

convertir_webp_a_jpg(ruta_completa_webp, ruta_completa_jpg)