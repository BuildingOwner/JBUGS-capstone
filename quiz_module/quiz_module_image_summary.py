import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from secret import keys
from pdf2png import pdf2png
from quiz_generator_image_summary import generator, summary_pdf
from quiz_module.question_validation import validate_question
from openai import OpenAI
import json

# Get the absolute path of the current Python script
current_file_path = os.path.abspath(__file__)
# Extract the file name from the path
current_file_name = os.path.basename(current_file_path)

client = OpenAI(api_key=keys.OPENAI_KEY)


def gen(path, choice=5, short=5):
    img_path = pdf2png(path)
    questions = []

    result = summary_pdf(img_path)

    i = 0
    while i < choice + short:
        if i < choice:
            print(f"[{current_file_name}] choice 문제 생성")
            question = generator(result, "choice", questions)
        else:
            print(f"[{current_file_name}] short 문제 생성")
            question = generator(result, "short", questions)

        answer = validate_question(question).lower()
        if "true" in answer:
            i += 1
            print(f"[{current_file_name}] {i}번째 문제 생성완료\n")
            question["id"] = i
            questions.append(question)

        else:
            print(f"[{current_file_name}] {i+1}번째 문제 재생성\n")

    # print(question)

    questions_dict = {"questions": questions}

    return json.dumps(questions_dict, ensure_ascii=False)


if __name__ == "__main__":
    print(gen("학습자료/3-DL-원리.pdf", 2, 2))
