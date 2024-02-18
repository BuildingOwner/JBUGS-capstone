import requests
import uuid
import time
import json
import os
import glob
import sys
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from secret import keys

img_extensions = ['*.png']

def png2keyword_clova(path):
    api_url = keys.CLOVA_URL
    secret_key = keys.CLOVA_KEY

    request_json = {
        'images': [
            {
                'format': 'png',
                'name': 'demo'
            }
        ],
        'requestId': str(uuid.uuid4()),
        'version': 'V2',
        'timestamp': int(round(time.time() * 1000))
    }

    payload = {'message': json.dumps(request_json).encode('UTF-8')}
    result_text = ""

    img_count = 0
    for ext in img_extensions:
        img_count += len(glob.glob(path + ext))

    for i in range(img_count):
        files = [
            ('file', open(f"{path}{i}.png",'rb'))
        ]
        headers = {
            'X-OCR-SECRET': secret_key
        }

        response = requests.request("POST", api_url, headers=headers, data = payload, files = files)

        res = json.loads(response.text.encode('utf8'))
            
        # inferText 추출 및 합치기
        result_text += " ".join(field["inferText"] for field in res["images"][0]["fields"])

    # 결과 출력
    print('png2keyword_clova done.')
    return f"""{result_text}"""

if __name__ == "__main__":
    print(png2keyword_clova('quiz_easy/pdf2png/3-DL-개요/'))