import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from secret import keys
from openai import OpenAI
from pdf2png import pdf2png
import json
from jsonschema import ValidationError
from json import JSONDecodeError
from json_validation import json_validate

# from png2keyword_clova import png2keyword_clova
# from png2keyword_google_vision import png2keyword_google_vision
from png2text_tesseract import png2text_tesseract

client = OpenAI(api_key=keys.OPENAI_KEY)

# Get the absolute path of the current Python script
current_file_path = os.path.abspath(__file__)
# Extract the file name from the path
current_file_name = os.path.basename(current_file_path)


def extrect_keyword(path, number=10):
    img_path = pdf2png(path)
    question = png2text_tesseract(img_path)  # 모듈에 따라 스위칭
    question += f"""
    
    여기서 자주 반복되는 단어 {number}개만 뽑아서 출력해줘.
    """

    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": "You are a person who summarizes the given content well and extracts important words.",
            },
            {"role": "user", "content": question},
        ],
    )

    print(f"[{current_file_name}] #extrect_keyword keyword: {completion.choices[0].message.content}\n")
    return completion.choices[0].message.content


def generator(keyword, quiz_type, questions=[]):
    choice_template = """
        {
            "question": "",
            "options": ["", "", "", ""],
            "answer": ""
            "type": "choice"
        }
        """
    short_template = """
        {
            "question": "",
            "answer": ""
            "type": "short"
        }
        """

    choice_input = f"""
        이 단어에 관한 객관식 문제와 그 문제의 선지와 답 쌍을 1개만 생성해.
        선지는 4개로 구성되어 있고 선지에 정답이 포함되어 있어야해. 
        정답은 1개야. 
        (객관식 예시 : {choice_template.strip()}) 
        객관식 문제는 question, options, answer 키를 가져야 하고 options는 배열 형태로 생성해.
    """

    short_input = f"""
        이 단어에 관한 단답식 문제와 답 쌍을 1개만 생성해.
        (단답식 예시 : {short_template.strip()})
        단답식 문제의 정답은 문장이 아니라 단어가 정답이여야 해.
    """

    userInput = f"""
        {keyword}
        {choice_input if quiz_type == "choice" else short_input}
        {json.dumps(questions, ensure_ascii = False)} 와 겹치지 않는 문제로 생성해.
        json형식으로 생성해주고 json 시작전에 start라고 출력하고 json이 끝나면 end라고 출력해.
        반드시 예시에 맞는 형식으로 생성해. 
        단어의 의미를 묻는 문제를 제외하고 생성해.
        문제는 반드시 ?로 끝나야해.
        질문의 의도를 명확히 해.
        한국어로 생성해
    """

    # print(quiz_type)
    # print(userInput)

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
    # print("Result:", result)

    # JSON 형식 검증
    try:
        json_validate(result)
    except (ValidationError, JSONDecodeError):
        # print(questions)
        print(f"[{current_file_name}] #generator JSON 형식이 잘못되었습니다. 다시 생성합니다.")
        return generator(keyword, quiz_type, questions=[])  # 재귀 호출로 다시 생성

    # print(f"[{current_file_name}] #generator type: {json.loads(result)["type"]}")
    return json.loads(result)


if __name__ == "__main__":
    print(generator(extrect_keyword("학습자료/3-DL-원리.pdf"), 10))
