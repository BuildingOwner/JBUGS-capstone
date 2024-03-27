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
import json
from secret.db_connection import getConnection
from secret.sql_injection_detector import sql_injection_detector

client = OpenAI(api_key=keys.OPENAI_KEY)

# OpenAI API 키 설정
api_key = keys.OPENAI_KEY


# 이미지를 base64로 인코딩하는 함수
def encode_image(image_path):
    print(image_path)
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")


def chat(chat_id, question, model_name="turbo", img_path=["test/images/test.png"]):
    model = {"vision": "gpt-4-vision-preview", "turbo": "gpt-4-turbo-preview"}
    message = []
    
    db = getConnection()
    cursor = db.cursor()
    sql = "SELECT chat_str FROM chat WHERE id = %s"
    cursor.execute(sql, (chat_id,))
    prev_chat_text = cursor.fetchone()
    
    # 인코딩된 이미지 URL을 저장할 리스트
    urls = []
    
    if prev_chat_text:
        message = json.loads(prev_chat_text[0])
    
        # 메시지 내용에서 이미지 URL을 찾아서 인코딩하고 리스트에 추가
        for msg in message:
            for item in msg["content"]:
                if item.get("type") == "image_url":
                    urls.append(item["image_url"]["url"])  # 인코딩된 URL을 리스트에 추가
                    encoded_url = encode_image(item["image_url"]["url"])  # 이미지 URL 인코딩
                    item["image_url"]["url"] = encoded_url  # 이미지 URL 업데이트
    msg = {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": f"{question}",
                },
            ],
        }
    message.append(msg)

    if model_name == "vision":
        # base64 문자열 얻기
        for path in img_path:
            urls.append(path)
            img = {
                "type": "image_url",
                "image_url": {"url": f"data:image/jpeg;base64,{encode_image(path)}"},
            }
            message[-1]["content"].append(img)
            
    print(message)
            
    response = client.chat.completions.create(
        model=model[model_name],
        messages=message,
        max_tokens=1024,
        stream=True
    )
    
    insert_text = ""
    for chunk in response:
        if chunk.choices[0].delta.content is not None:
            insert_text += chunk.choices[0].delta.content
        yield chunk.choices[0].delta.content
    
    gpt_msg = {
        "role": "assistant",
            "content": [
                {
                    "type": "text",
                    "text": f"{insert_text}",
                },
            ],
        }
    
    message.append(gpt_msg)
    i=0
    for msg in message:
            for item in msg["content"]:
                if item.get("type") == "image_url":
                    item["image_url"]["url"] = urls[i]  # 이미지 URL 업데이트
                    i+1
    
    sql_str = ""
    params = ""
    if prev_chat_text is None:
        sql_str = "INSERT INTO chat (chat_str) VALUES (%s)"
        params = (json.dumps(message, ensure_ascii=False, separators=(',', ':')))
    else:
        sql_str = "UPDATE chat SET chat_str = %s WHERE id = %s"
        params = (json.dumps(message, ensure_ascii=False, separators=(',', ':')), chat_id)

    if sql_injection_detector([sql_str]) == False:
        cursor.execute(sql_str, params)
        db.commit()

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