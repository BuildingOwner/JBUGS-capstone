import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from secret import keys
from quiz_generator_keyword import extrect_keyword
from quiz_generator_keyword import generator
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

        userInput = f"""
        {question}
        이 문제의 answer을 무시하고 option만 봤을 때 답이 2개 이상이거나 이상하다면 false를 출력해주고 이상이 없으면 true를 출력해줘.
        반드시 true나 false만 출력해줘.
        """

        completion = client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {
                    "role": "system",
                    "content": "You are a person who is troubleshooter the given content.",
                },
                {"role": "user", "content": userInput},
            ],
        )
        # print(question)
        print("question check ", completion.choices[0].message.content)

        answer = completion.choices[0].message.content.lower()
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
