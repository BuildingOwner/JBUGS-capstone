import pytesseract
import cv2 
import matplotlib.pyplot as plt

folderName = 'NN-Primer'
text = ""
for i in range(23):
    image = cv2.imread(f'test/pdf2png/{folderName}/{i}.png')
    rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    text += pytesseract.image_to_string(rgb_image, lang='kor+eng')
print(text)