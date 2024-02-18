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
        return base64.b64encode(image_file.read()).decode("utf-8")


# 이미지 경로
# image_path = "asset/images/test_1.jpg"

# # base64 문자열 얻기
# base64_image = encode_image(image_path)

headers = {"Content-Type": "application/json", "Authorization": f"Bearer {api_key}"}

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
            "role": "system",
            "content": "You are a person who teaches the entire contents of a PDF",
        },
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": f"""
    이 pdf의 내용을 자세하게 정리해줘""",
                },
            ],
        }
    ],
    "max_tokens": 2000,
}

img_extensions = ["*.png"]
img_count = 0
for ext in img_extensions:
    img_count += len(glob.glob("quiz_easy/pdf2png/3-DL-원리/" + ext))

for i in range(img_count):
    str = {
        "type": "image_url",
        "image_url": {
            "url": f"data:image/jpeg;base64,{encode_image(f'quiz_easy/pdf2png/3-DL-원리/{i}.png')}"
        },
    }
    payload["messages"][1]["content"].append(str)


response = requests.post(
    "https://api.openai.com/v1/chat/completions", headers=headers, json=payload
)
# 'content' 부분만 추출하여 출력
content = response.json()["choices"][0]["message"]["content"]

# 이미지 표시
# img = Image.open(image_path)
# plt.imshow(img)
# plt.axis('off')  # 축 정보 숨기기
# plt.show()

# 응답 출력
print(content)
