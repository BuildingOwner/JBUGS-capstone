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

# Get the absolute path of the current Python script
current_file_path = os.path.abspath(__file__)
# Extract the file name from the path
current_file_name = os.path.basename(current_file_path)

client = OpenAI(api_key=keys.OPENAI_KEY)

# OpenAI API 키 설정
api_key = keys.OPENAI_KEY


# 이미지를 base64로 인코딩하는 함수
def encode_image(image_path):
    print(f"[{current_file_name}] 이미지 변환 url: {image_path}")
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")


def chat(chat_id, question, img_path=[]):
    # model = {"vision": "gpt-4-vision-preview", "turbo": "gpt-4-turbo-preview"}
    message = []
    print(f"[{current_file_name}] chat_id: {chat_id}")
    db = getConnection()
    cursor = db.cursor()
    sql = "SELECT chatting_json FROM chat_room WHERE chat_room_id = %s"
    cursor.execute(sql, (chat_id,))
    prev_chat_text = cursor.fetchone()
    
    # 인코딩된 이미지 URL을 저장할 리스트
    urls = []

    if prev_chat_text:
        try:
            message = json.loads(prev_chat_text[0])
        except:
            message = []  # 이전 채팅 데이터가 없는 경우 빈 리스트로 초기화
        # print("메시지 : ", message)
        # 메시지 내용에서 이미지 URL을 찾아서 인코딩하고 리스트에 추가
        for msg in message:
            for item in msg["content"]:
                if item.get("type") == "image_url":
                    try:
                        urls.append(item["image_url"]["url"])  # 인코딩된 URL을 리스트에 추가
                        encoded_url = encode_image(item["image_url"]["url"])  # 이미지 URL 인코딩
                        item["image_url"]["url"] = f"data:image/jpeg;base64,{encoded_url}"  # 이미지 URL 업데이트
                    except FileNotFoundError:
                        msg["content"].remove(item)  # FileNotFoundError가 발생하면 해당 항목 삭제
                        urls.pop()

    print(f"[{current_file_name}] 이전 대화 이미지 urls: {urls}")
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

    print(f"[{current_file_name}] 현재 질문 이미지: {img_path}")
    if len(img_path) != 0:
        # base64 문자열 얻기
        for path in img_path:
            urls.append(path)
            img = {
                "type": "image_url",
                "image_url": {"url": f"data:image/jpeg;base64,{encode_image(path)}"},
            }
            message[-1]["content"].append(img)
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=message,
        stream=True
    )
    
    insert_text = ""
    for chunk in response:
        if chunk.choices[0].delta.content is not None:
            insert_text += chunk.choices[0].delta.content
        yield chunk.choices[0].delta.content
    
    print(f"[{current_file_name}] gpt 답변 생성 완료: {insert_text}")
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
    if len(urls) != 0:
        for msg in message:
                for item in msg["content"]:
                    if item.get("type") == "image_url":
                        item["image_url"]["url"] = urls[i]  # 이미지 URL 업데이트
                        i+1

    sql_str = ""
    params = ""
    if prev_chat_text is None:
        sql_str = "INSERT INTO chat_room (chatting_json) VALUES (%s)"
        params = (json.dumps(message, ensure_ascii=False, separators=(',', ':')))
        print(f"[{current_file_name}] db 삽입", end="")
    else:
        sql_str = "UPDATE chat_room SET chatting_json = %s WHERE chat_room_id = %s"
        params = (json.dumps(message, ensure_ascii=False, separators=(',', ':')), chat_id)
        print(f"[{current_file_name}]  db 업데이트", end="")
    
    sql = "SELECT chat_room_name FROM chat_room WHERE chat_room_id = %s"
    cursor.execute(sql, (chat_id,))
    chat_room_name = cursor.fetchone()
    if chat_room_name[0] == ("생성" or "이름"):
        sql = "UPDATE chat_room SET chat_room_name = %s WHERE chat_room_id = %s"
        cursor.execute(sql, (make_name_by_question(question), chat_id,))
        chat_room_name = cursor.fetchone()

    if sql_injection_detector([sql_str]) == False:
        cursor.execute(sql_str, params)
        db.commit()
        print(" 완료")

def make_name_by_question(str):
    question = f'''
    {str}
    
    이 내용을 바탕으로 채팅방 이름을 지어줘.
    경어체로 지어줘.
    방 이라는 글자는 빼줘.
    '''
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a name maker"},
            {"role": "user", "content": question}
        ]
    )

    return completion.choices[0].message.content

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
