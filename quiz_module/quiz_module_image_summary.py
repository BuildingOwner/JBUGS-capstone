import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from secret import keys
from pdf2png import pdf2png
from quiz_generator_image_summary import generator, summary_pdf
from quiz_module.question_validation import validate_question
from openai import OpenAI
import json

client = OpenAI(api_key=keys.OPENAI_KEY)


def gen(path, choice=5, short=5):
    img_path = pdf2png(path)
    questions = []

    result = summary_pdf(img_path)

    i = 0
    while i < choice + short:
        if i < choice:
            question = generator(result, "choice", questions)
        else:
            question = generator(result, "short", questions)

        answer = validate_question(question).lower()
        if "true" in answer:
            print(f"{i+1}번째 문제 생성완료.")
            questions.append(question)
            i += 1

        else:
            print(f"{i+1}번째 문제 재생성")

    # print(question)

    questions_dict = {"questions": questions}

    return json.dumps(questions_dict, ensure_ascii=False)


if __name__ == "__main__":
    print(gen("학습자료/3-DL-원리.pdf", 2, 2))
