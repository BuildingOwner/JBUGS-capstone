import base64
import requests
import os
from PIL import Image
from io import BytesIO
import matplotlib.pyplot as plt

import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from secret import keys

from openai import OpenAI

client = OpenAI(api_key=keys.OPENAI_KEY)

# OpenAI API 키 설정
api_key = keys.OPENAI_KEY


# 이미지를 base64로 인코딩하는 함수
def encode_image(image_path):
    print(image_path)
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")


def chat(question, model_name="turbo", img_path=["test/images/test.png"]):
    image_path = img_path
    model = {"vision": "gpt-4-vision-preview", "turbo": "gpt-4-turbo-preview"}

    message = [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": f"""
                    {question}
                    """,
                },
            ],
        }
    ]

    if model_name == "vision":
        base64_image = []
        # base64 문자열 얻기
        for path in image_path:
            base64_image.append(encode_image(path))

        for base64_img in base64_image:
            img = {
                "type": "image_url",
                "image_url": {"url": f"data:image/jpeg;base64,{base64_img}"},
            }
            message[0]["content"].append(img)

    response = client.chat.completions.create(
        model=model[model_name],
        messages=message,
        max_tokens=1024,
        stream=True
    )
    
    for chunk in response:
        yield chunk.choices[0].delta.content

def chat_test(question, model_name="turbo", img_path=["test/images/test.png"]):
    # 이미지 경로
    image_path = img_path
    model = {"vision": "gpt-4-vision-preview", "turbo": "gpt-4-turbo-preview"}

    headers = {"Content-Type": "application/json", "Authorization": f"Bearer {api_key}"}

    payload = {
        "model": model[model_name],
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": f"""
                    {question}
                    """,
                    },
                ],
            }
        ],
        "max_tokens": 2048,
    }

    if model_name == "vision":
        base64_image = []
        # base64 문자열 얻기
        for path in image_path:
            base64_image.append(encode_image(path))

        for base64_img in base64_image:
            img = {
                "type": "image_url",
                "image_url": {"url": f"data:image/jpeg;base64,{base64_img}"},
            }
            payload["messages"][0]["content"].append(img)

    response = requests.post(
        "https://api.openai.com/v1/chat/completions",
        headers=headers,
        json=payload,
        stream=True,
    )

    for chunk in response:
        print(chunk.choices[0].delta.content, end="")




def chat_test2(question, model_name="turbo", img_path=["test/images/test.png"]):
    image_path = img_path
    model = {"vision": "gpt-4-vision-preview", "turbo": "gpt-4-turbo-preview"}

    message = [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": f"""
                    {question}
                    """,
                },
            ],
        }
    ]

    if model_name == "vision":
        base64_image = []
        # base64 문자열 얻기
        for path in image_path:
            base64_image.append(encode_image(path))

        for base64_img in base64_image:
            img = {
                "type": "image_url",
                "image_url": {"url": f"data:image/jpeg;base64,{base64_img}"},
            }
            message[0]["content"].append(img)

    response = client.chat.completions.create(
        model=model[model_name],
        messages=message,
        max_tokens=1024,
        stream=True
    )
    
    for chunk in response:
        print(chunk.choices[0].delta.content, end="")


if __name__ == "__main__":
    chat_test2("이 그림에 대해 설명해줘", "vision")
