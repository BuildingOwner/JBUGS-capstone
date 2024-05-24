import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from secret import keys
from openai import OpenAI
from question_validation import validate_question
from json_validation import json_validate
from jsonschema import ValidationError
from json import JSONDecodeError

# Get the absolute path of the current Python script
current_file_path = os.path.abspath(__file__)
# Extract the file name from the path
current_file_name = os.path.basename(current_file_path)

client = OpenAI(api_key=keys.OPENAI_KEY)

question1 = '''

{"question": "경사 하강법을 사용하는 주된 이유는 무엇인가?", "options": ["활성화 함수를 결정하기 위해서", "최적의 가중치 값을 찾기 위해서", "은닉층의 수를 결정하기 위해서", "학습률을 증가시키기 위해서"], "answer": "최적의 가중치 값을 찾기 위해서", "type": "choice"}
'''

def related_question_gen(question=question1):
    user_input = question + """
    이 문제와 같은 유형으로 비슷한 문제를 만들어줘.
    반드시 이문제와 같은 형식의 json을 사용해줘.
    """
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are the professor explaining the problem."},
            {"role": "user", "content": user_input},
        ],
        max_tokens=1024,
    )
    
    related_question = completion.choices[0].message.content
    
    answer = validate_question(related_question).lower()
    if "true" in answer:
        try:
            json_validate(related_question)
        except (ValidationError, JSONDecodeError):
            # print(questions)
            print(f"[{current_file_name}] JSON 형식이 잘못되었습니다. 다시 생성합니다.\n")
            return related_question_gen(question)
        return related_question
    else:
        print(f"[{current_file_name}] 퀴즈 재생성\n")
        return related_question_gen(question)

if __name__ == "__main__":
    print(related_question_gen())
