import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = 'secret/jbugs-capstone-8bf55e84fb30.json'
import io
import glob
from google.cloud import vision

client = vision.ImageAnnotatorClient()

img_extensions = ['*.png']

def png2text_google_vision(path):
    string = []

    img_count = 0
    for ext in img_extensions:
        img_count += len(glob.glob(path + ext))
    
    for i in range(img_count):
        file_name = os.path.abspath(f'{path}{i}.png')

        with io.open(file_name, 'rb') as image_file:
            content = image_file.read()

        image = vision.Image(content=content)
        response = client.text_detection(image=image)
        texts = response.text_annotations

        string.append(texts[0].description)
    
    print("png2keyword_google_vision done.")
    return f"""{string}"""

    
if __name__ == "__main__":
    print(png2text_google_vision('quiz-easy/pdf2png/3-DL-개요/'))