import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from secret import keys
from openai import OpenAI

# Get the absolute path of the current Python script
current_file_path = os.path.abspath(__file__)
# Extract the file name from the path
current_file_name = os.path.basename(current_file_path)

client = OpenAI(api_key=keys.OPENAI_KEY)


def validate_question(question):
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
    print(f"[{current_file_name}] question check {completion.choices[0].message.content}")
    return completion.choices[0].message.content
