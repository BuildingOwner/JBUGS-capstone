from pdf2png import pdf2png
from quiz_generator_image import generator
from quiz_module.question_validation import validate_question
from openai import OpenAI

import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from secret import keys

client = OpenAI(api_key=keys.OPENAPI_KEY)


def gen(path, number):
    img_path = pdf2png(path)
    questions = []

    i = 0
    while i < number:
        question = generator(img_path, questions, 1)

        answer = validate_question(question).lower()
        if "true" in answer:
            print(f"{i+1}번째 문제 생성완료.")
            questions.append(question)
            i += 1

        else:
            print(f"{i+1}번째 문제 재생성")

    return f"{questions}"


if __name__ == "__main__":
    print(gen("학습자료/마케팅관리_Chap2_(003)_231022_164154.pdf", 5))
