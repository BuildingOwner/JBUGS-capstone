import requests
import time
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from secret import keys
import json
from jsonschema import validate, ValidationError
from json import JSONDecodeError

def generator(source, number=10):
    headers = {
        "x-api-key": keys.CHATPDF_KEY,
        "Content-Type": "application/json",
    }
    
    template = """
    {
        "question": "",
        "options": ["", "", "", ""],
        "answer": ""
    }
    """ 

    data = {
        "sourceId": source,
        "messages": [
            {
                "role": "user",
                "content": f"""이 파일의 내용으로 객관식 문제와 그 문제의 선지와 답 쌍을 {number}개만 생성해줘. 
                문제를 푸는데 있어 필요한 자료가 있으면 그건 다른 필드로 추가해서 생성해줘 
                선지는 4개로 구성되어 있고 선지에 정답이 포함되어 있어야해. 
                정답은 1개야. 
                json형식으로 생성해주고 json 시작전에 start라고 출력하고 json이 끝나면 end라고 출력해줘.
                (예시 : [{template.strip()},]) 
                question, options, answer 키를 가져야 하고 options는 배열 형태로 생성해줘. 반드시 예시에 맞는 형식으로 생성해줘. 한국어로 생성해줘""",
            }
        ],
    }

    response = requests.post(
        "https://api.chatpdf.com/v1/chats/message", headers=headers, json=data
    )

    quiz = ''

    if response.status_code == 200:
        quiz = response.json()["content"]
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
            return generator(source, number)  # 재귀 호출로 다시 생성
        
        return result
    else:
        print("Status:", response.status_code)
        print("Error:", response.text)
        return 'error'

if __name__ == "__main__":
    source = [
        "src_A9aWDtQnZQUqdi6qBxGcF",  # 관계형 데이터 베이스
        "src_aPBCS0Tu9UkatOmtZX9iR",  # room
        "src_q99mfG5rBNeZG1lkVci0V",  # nn-primer
        "src_JbVpiZdpP1dcJMasl9UE4",  # 주주환원
        "src_8cbY6DMoJFi8bhoRRCyFW",  # 마케팅
    ]

    start = time.time()

    result = generator(source[3])
    print(result)
    # if response.status_code == 200:
    #     print("Result:", response.json()["content"])
    # else:
    #     print("Status:", response.status_code)
    #     print("Error:", response.text)

    end = time.time()
    print(f"{end - start:.5f} sec")
