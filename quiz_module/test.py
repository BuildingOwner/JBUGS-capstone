import requests

def stream_get_explane(url, question):
    # 'stream=True'를 설정하여 서버로부터 스트리밍 응답을 받습니다.
    with requests.get(url, params={"question": question}, stream=True) as r:
        # HTTP 스테이터스 코드 확인
        if r.status_code == 200:
            try:
                # 스트리밍 데이터를 조각조각 읽어들입니다.
                for chunk in r.iter_content(chunk_size=8192):
                    if chunk: # 필터: 청크가 빈 문자열('')인 경우는 제외
                        print(chunk.decode("utf-8"), end="")
            except Exception as e:
                print("스트리밍 중 에러 발생:", e)
        else:
            print(f"Error response: {r.status_code}")

if __name__ == "__main__":
    # Flask 애플리케이션 URL을 지정합니다.
    # 예: 'http://127.0.0.1:5000/get-explane'
    url = "http://127.0.0.1:5000/get-explane" 
    question = '''
    {"question": "경사 하강법을 사용하는 주된 이유는 무엇인가?", "options": ["활성화 함수를 결정하기 위해서", "최적의 가중치 값을 찾기 위해서", "은닉층의 수를 결정하기 위해서", "학습률을 증가시키기 위해서"], "answer": "최적의 가중치 값을 찾기 위해서", "type": "choice"}
    '''
    #question = "none"

    stream_get_explane(url, question)