from chatPDF_upload import upload_chatPDF
from chatPDF_chat import generator

def quiz_generator(path):
    source = upload_chatPDF(path)
    result = generator(source, 1)
    return result

if __name__ == '__main__':
    print(quiz_generator('학습자료/3-DL-원리.pdf'))