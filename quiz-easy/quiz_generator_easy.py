from openai import OpenAI
from secret import keys
from pdf2png import pdf2png
from png2keyword_clova import png2keyword_clova

client = OpenAI(api_key=keys.OPENAPI_KEY)


def generator(path):
    img_path = pdf2png(path)
    question = png2keyword_clova(img_path)
    question += """
    
    여기서 자주 반복되는 단어 10개만 뽑아서 출력해줘.
    """

    completion = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {
                "role": "system",
                "content": "You are a person who summarizes the given content well and extracts important words.",
            },
            {"role": "user", "content": question},
        ],
    )

    print(completion.choices[0].message.content)

    template = """
    {
        "question": "",
        "options": ["", "", "", ""],
        "answer": ""
    }
    """ 

    question = f"""{completion.choices[0].message.content} 이 단어에 관한 객관식 문제와 그 문제의 선지와 답 쌍을 5개 생성해줘. 문제를 푸는데 있어 필요한 자료가 있으면 그건 다른 필드로 추가해서 생성해줘 선지는 4개로 구성되어 있고 선지에 정답이 포함되어 있어야해. 정답은 1개야. json형식으로 생성해주고 json 시작전에 start라고 출력하고 json이 끝나면 end라고 출력해줘.(예시 : [
                    {template.strip()},
                ]) question, options, answer 키를 가져야 하고 options는 배열 형태로 생성해줘. 반드시 예시에 맞는 형식으로 생성해줘. 한국어로 생성해줘"""

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You're a professor who makes questions",
            },
            {"role": "user", "content": question},
        ],
    )

    print(completion.choices[0].message.content)

if __name__ == "__main__":
    generator('학습자료/3-DL-개요.pdf')
