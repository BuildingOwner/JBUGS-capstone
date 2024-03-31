import pytesseract
import cv2
import numpy as np
import matplotlib.pyplot as plt
import glob

img_extensions = ['*.png']

def png2text_tesseract(path):
    string = ""

    img_count = 0
    for ext in img_extensions:
        img_count += len(glob.glob(path + ext))
    
    for i in range(img_count):
        img_array = np.fromfile(f'{path}{i}.png', np.uint8)
        image = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        string += pytesseract.image_to_string(rgb_image, lang='kor+eng')
        
    print('png2text_tesseract done.')
    return f"""{string}"""

if __name__ == "__main__":
    print(png2text_tesseract('quiz_easy/pdf2png/3-DL-원리/'))