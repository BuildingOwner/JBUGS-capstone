from openai import OpenAI
from pdf2png import pdf2png
# from png2keyword_clova import png2keyword_clova
from png2keyword_google_vision import png2keyword_google_vision
# from png2keyword_tesseract import png2keyword_tesseract
import json
from jsonschema import validate, ValidationError
from json import JSONDecodeError
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from secret import keys


client = OpenAI(api_key=keys.OPENAPI_KEY)


def extrect_keyword(path, number=10):
    img_path = pdf2png(path)
    question = png2keyword_google_vision(img_path) # 모듈에 따라 스위칭
    question += f"""
    
    여기서 자주 반복되는 단어 {number}개만 뽑아서 출력해줘.
    """

    completion = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {
                "role": "system",
                "content": "You are a person who summarizes the given content well and extracts important words.",
            },
            {"role": "user", "content": question},
        ],
    )

    print(completion.choices[0].message.content)
    return completion.choices[0].message.content

def generator(keyword, number=10):
    template = """
    {
        "question": "",
        "options": ["", "", "", ""],
        "answer": ""
    }
    """ 

    question = f"""{keyword} 이 단어에 관한 객관식 문제와 그 문제의 선지와 답 쌍을 {number}개만 생성해줘. 
    문제를 푸는데 있어 필요한 자료가 있으면 그건 다른 필드로 추가해서 생성해줘.
    선지는 4개로 구성되어 있고 선지에 정답이 포함되어 있어야해. 
    정답은 1개야. 
    json형식으로 생성해주고 json 시작전에 start라고 출력하고 json이 끝나면 end라고 출력해줘.
    (예시 : [{template.strip()},]) 
    question, options, answer 키를 가져야 하고 options는 배열 형태로 생성해줘. 
    반드시 예시에 맞는 형식으로 생성해줘. 
    한국어로 생성해줘"""

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You're a professor who makes questions",
            },
            {"role": "user", "content": question},
        ],
    )
    
    quiz = ''
    quiz = completion.choices[0].message.content
    start = quiz.find('start') + len('start')
    end = quiz.find('end')
    result = quiz[start:end].strip()
    # print("Result:", result)
    # JSON 형식 검증
    try:
        schema = {
            "type" : "array",
            "items" : {
                "type" : "object",
                "properties" : {
                    "question" : {"type" : "string"},
                    "options" : {
                        "type" : "array",
                        "items" : {"type" : "string"},
                        "minItems": 4,
                        "maxItems": 4,
                    },
                    "answer" : {"type" : "string"},
                },
                "required": ["question", "options", "answer"]
            },
            "minItems": 1 if number != 10 else 5,
            "maxItems": number if number != 10 else 10,
        }
        validate(instance=json.loads(result), schema=schema)
    except (ValidationError, JSONDecodeError):
        print("JSON 형식이 잘못되었습니다. 다시 생성합니다.")
        return generator(keyword, number)  # 재귀 호출로 다시 생성

    return result


if __name__ == "__main__":
    print(generator(extrect_keyword('학습자료/3-DL-원리.pdf'), 1))
