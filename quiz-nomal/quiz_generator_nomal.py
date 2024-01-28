from chatPDF_upload import upload_chatPDF
from chatPDF_chat import generator

def quiz_generator(path):
    source = upload_chatPDF(path)
    result = generator(source)
    return result

if __name__ == '__main__':
    quiz_generator('학습자료/AI-intro.pdf')