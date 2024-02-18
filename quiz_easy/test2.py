import base64
import requests
import os
import glob
from PIL import Image
from io import BytesIO
import matplotlib.pyplot as plt
import sys
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from secret import keys

# OpenAI API 키 설정
api_key = keys.OPENAPI_KEY

# 이미지를 base64로 인코딩하는 함수
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

# 이미지 경로
# image_path = "asset/images/test_1.jpg"

# # base64 문자열 얻기
# base64_image = encode_image(image_path)

headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {api_key}"
}

template = """
    {
        "question": "",
        "options": ["", "", "", ""],
        "answer": ""
    }
    """ 

payload = {
    "model": "gpt-4-vision-preview",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": f"""
    
    여기서 중요한 내용을 바탕으로 객관식 문제와 그 문제의 선지와 답 쌍을 10개만 생성해줘. 
    문제를 푸는데 있어 필요한 자료가 있으면 그건 다른 필드로 추가해서 생성해줘.
    선지는 4개로 구성되어 있고 선지에 정답이 포함되어 있어야해. 
    정답은 1개야. 
    json형식으로 생성해주고 json 시작전에 start라고 출력하고 json이 끝나면 end라고 출력해줘.
    (예시 : [{template.strip()},]) 
    question, options, answer 키를 가져야 하고 options는 배열 형태로 생성해줘. 
    반드시 예시에 맞는 형식으로 생성해줘. 
    단어의 의미를 묻는 문제를 제외하고 생성해줘.
    문제는 반드시 ?로 끝나야해.
    질문의 의도를 명확히 해줘.
    한국어로 생성해줘"""
          },
          
        ]
      }
    ],
    "max_tokens": 1000
}

img_extensions = ['*.png']
img_count = 0
for ext in img_extensions:
  img_count += len(glob.glob('quiz-easy/pdf2png/3-DL-원리/' + ext))

for i in range(img_count):
  str = {
            "type": "image_url",
            "image_url": {
              "url": f"data:image/jpeg;base64,{encode_image(f'quiz-easy/pdf2png/3-DL-원리/{i}.png')}"
            }
          }
  payload["messages"][0]["content"].append(str)
  

response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
# 'content' 부분만 추출하여 출력
content = response.json()['choices'][0]['message']['content']

# 이미지 표시
# img = Image.open(image_path)
# plt.imshow(img)
# plt.axis('off')  # 축 정보 숨기기
# plt.show()

# 응답 출력
print(content)