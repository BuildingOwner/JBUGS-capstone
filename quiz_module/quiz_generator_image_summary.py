import base64
import requests
import glob
from openai import OpenAI

import json
from jsonschema import validate, ValidationError
from json import JSONDecodeError
from json_validation import json_validate

import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from secret import keys

# Get the absolute path of the current Python script
current_file_path = os.path.abspath(__file__)
# Extract the file name from the path
current_file_name = os.path.basename(current_file_path)

client = OpenAI(api_key=keys.OPENAI_KEY)

# OpenAI API 키 설정
api_key = keys.OPENAI_KEY


# 이미지를 base64로 인코딩하는 함수
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")


def summary_pdf(path):
    headers = {"Content-Type": "application/json", "Authorization": f"Bearer {api_key}"}

    question = f"""
        여기서 중요한 내용을 바탕으로 아주 자세하고 1000토큰 이상으로 길게 설명해.
    """

    img_extensions = ["*.png"]
    img_count = 0
    for ext in img_extensions:
        img_count += len(glob.glob(path + ext))

    summarized_text = ""

    for i in range(0, img_count, 20):
        payload = {
            "model": "gpt-4o",
            "messages": [
                {
                    "role": "system",
                    "content": "You're a person who summarizes PDFs",
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": question,
                        },
                    ],
                },
            ],
            "max_tokens": 2048,
        }

        for j in range(i, min(i + 20, img_count)):
            str = {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{encode_image(f'{path}{j}.png')}"
                },
            }
            # print(j)
            payload["messages"][1]["content"].append(str)
        response = requests.post(
            "https://api.openai.com/v1/chat/completions", headers=headers, json=payload
        )
        # print(response.json()["choices"][0]["message"]["content"])
        summarized_text += response.json()["choices"][0]["message"]["content"]
        print(f"[{current_file_name}] #summary_pdf {i} - {min(i + 20, img_count)} / {img_count} PDF 요약 완료.")
    print("")
    return summarized_text


def generator(summary, quiz_type, questions=[]):
    # choice_count = 0
    # short_count = 0

    # for question in questions:
    #     if question["type"] == "choice":
    #         choice_count += 1
    #     elif question["type"] == "short":
    #         short_count += 1

    template1 = """
        {
            "question": "",
            "options": ["", "", "", ""],
            "answer": ""
            "type": "choice"
        }
        """
    template2 = """
        {
            "question": "",
            "answer": ""
            "type": "short"
        }
        """

    choice_input = f"""
        여기서 중요한 내용을 바탕으로 객관식 문제와 그 문제의 선지와 답 쌍을 1개만 생성해.
        선지는 4개로 구성되어 있고 선지에 정답이 포함되어 있어야해. 
        정답은 1개야. 
        (객관식 예시 : {template1.strip()}) 
        객관식 문제는 question, options, answer 키를 가져야 하고 options는 배열 형태로 생성해.
    """

    short_input = f"""
        여기서 중요한 내용을 바탕으로 단답식 문제와 답 쌍을 1개만 생성해.
        (단답식 예시 : {template2.strip()})
        단답식 문제의 정답은 문장이 아니라 단어가 정답이여야 해.
    """

    userInput = f"""
        {summary}
        {choice_input if quiz_type == "choice" else short_input}
        {json.dumps(questions, ensure_ascii = False)} 와 겹치지 않는 문제로 생성해.
        json형식으로 생성해주고 json 시작전에 start라고 출력하고 json이 끝나면 end라고 출력해.
        반드시 예시에 맞는 형식으로 생성해. 
        배열로 생성하지 말고 반드시 json으로만 생성해야해
        단어의 의미를 묻는 문제를 제외하고 생성해.
        문제는 반드시 ?로 끝나야해.
        질문의 의도를 명확히 해.
        한국어로 생성해
    """

    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": "You are a person who is troubleshooter the given content.",
            },
            {"role": "user", "content": userInput},
        ],
    )

    quiz = ""
    quiz = completion.choices[0].message.content
    start = quiz.find("start") + len("start")
    end = quiz.find("end")
    result = quiz[start:end].strip()
    # print(result)

    # JSON 형식 검증
    try:
        json_validate(result)
    except (ValidationError, JSONDecodeError):
        # print(result)
        # print(questions)
        print(f"[{current_file_name}] #generator JSON 형식이 잘못되었습니다. 다시 생성합니다.")
        return generator(summary, quiz_type, questions)  # 재귀 호출로 다시 생성

    # print(f"[{current_file_name}] #generator type: {json.loads(result)["type"]}")
    return json.loads(result)


if __name__ == "__main__":
    print(generator(summary_pdf("quiz_module/pdf2png/3-DL-원리/"), number=2))
