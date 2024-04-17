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

question1 = '''

{"question": "경사 하강법을 사용하는 주된 이유는 무엇인가?", "options": ["활성화 함수를 결정하기 위해서", "최적의 가중치 값을 찾기 위해서", "은닉층의 수를 결정하기 위해서", "학습률을 증가시키기 위해서"], "answer": "최적의 가중치 값을 찾기 위해서", "type": "choice"}
'''

def explain_gen(question=question1):
    question += """
    이 문제에 대해서 설명해줘.
    정답은 answer 이야.
    type이 choice인 문제는 option들 중 정답이 아닌 것은 왜 정답이 아닌지 설명해주고, 정답인건 왜 정답인지 설명해줘.
    type이 short인 문제는 왜 answer이 정답인지 설명해줘.
    """
    print(f"[{current_file_name}] question:\n{question}")
    completion = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": "You are the professor explaining the problem."},
            {"role": "user", "content": question},
        ],
        stream=True,
        max_tokens=1024,
    )
    
    for chunk in completion:
        yield chunk.choices[0].delta.content
    
    print(f"[{current_file_name}] done.")

def gen_test(question=question1):
    question += """
    이 문제에 대해서 설명해줘.
    정답은 answer 이야.
    type이 choice인 문제는 option들 중 정답이 아닌 것은 왜 정답이 아닌지 설명해주고, 정답인건 왜 정답인지 설명해줘.
    type이 short인 문제는 왜 answer이 정답인지 설명해줘.
    """
    completion = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": "You are the professor explaining the problem."},
            {"role": "user", "content": question},
        ],
        stream=True,
        max_tokens=1024,
    )
    
    print(question)
    for chunk in completion:
        print(chunk.choices[0].delta.content, end="")

if __name__ == "__main__":
    gen_test()
