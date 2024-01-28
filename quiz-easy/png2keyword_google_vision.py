import os
import io
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = 'secret/jbugs-capstone-8bf55e84fb30.json'
from google.cloud import vision
client = vision.ImageAnnotatorClient()

string = []

for i in range(23):
    file_name = os.path.abspath(f'test/pdf2png/NN-Primer/{i}.png')

    with io.open(file_name, 'rb') as image_file:
        content = image_file.read()
        
    # image = vision.Image(content=content)
    # response = client.label_detection(image=image)
    # labels = response.label_annotations

    # print('[Labels]')
    # labeldict = []
    # for label in labels:
    #     labeldict.append(label.description)
    # print(", ".join(labeldict))

    image = vision.Image(content=content)
    response = client.text_detection(image=image)
    texts = response.text_annotations

    string.append(texts[0].description)

print(string)