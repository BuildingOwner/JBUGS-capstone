import requests
from secret import keys
import pickle


def upload_chatPDF(path):
    with open("quiz-nomal/pdf_source.pickle", "rb") as f:
        source = pickle.load(f)

    if path in source:
        print(source[path])
        return source[path]

    files = [("file", ("file", open(path, "rb"), "application/octet-stream"))]
    headers = {"x-api-key": keys.CHATPDF_KEY}

    response = requests.post(
        "https://api.chatpdf.com/v1/sources/add-file", headers=headers, files=files
    )
    if response.status_code == 200:
        print("Source ID:", response.json()["sourceId"])
        source[path] = response.json()["sourceId"]

        # 딕셔너리를 다시 pickle 파일에 저장
        with open("quiz-nomal/pdf_source.pickle", "wb") as f:
            pickle.dump(source, f)

        with open('quiz-nomal/pdf_source.py', 'w', encoding='utf-8') as f:
            f.write(f"source = {source}\n")

        print(response.json()["sourceId"])
        return response.json()["sourceId"]
    else:
        print("Status:", response.status_code)
        print("Error:", response.text)
        return "error"


if __name__ == "__main__":
    response = upload_chatPDF("학습자료/NN-Primer.pdf")
