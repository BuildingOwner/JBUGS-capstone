import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from secret import keys
from quiz_generator_keyword import extrect_keyword
from quiz_generator_keyword import generator
from quiz_module.question_validation import validate_question
from openai import OpenAI
import json

client = OpenAI(api_key=keys.OPENAI_KEY)


def gen(path, choice=5, short=5):
    keywords = extrect_keyword(path)
    questions = []

    i = 0
    while i < choice + short:
        # print(i, choice, short, i < choice)
        if i < choice:
            question = generator(keywords, "choice", questions)
        else:
            question = generator(keywords, "short", questions)

        answer = validate_question(question).lower()
        if "true" in answer:
            print(f"{i + 1}번째 문제 생성완료.")
            questions.append(question)
            i += 1

        else:
            print(f"{i + 1}번째 문제 재생성")

    questions_dict = {"questions": questions}
    print(questions_dict)
    return json.dumps(questions_dict, ensure_ascii=False)
    # return questions_dict


if __name__ == "__main__":
    print(gen("학습자료/3-DL-원리.pdf", 2, 2))
