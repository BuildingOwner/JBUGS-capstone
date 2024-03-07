import fitz #PyMuPDF
import os

def pdf2png(path):
    filename = os.path.splitext(os.path.basename(path))[0]  # 확장자 제거
    directory = f"quiz_module/pdf2png/{filename}"

    # 폴더가 없으면 생성
    if not os.path.exists(directory):
        os.makedirs(directory)

    doc = fitz.open(path)
    for i, page in enumerate(doc):
        img = page.get_pixmap()
        img.save(f"{directory}/{i}.png")
        
    print("pdf2png done.")

    return f"{directory}/"

if __name__ == "__main__":
    print(pdf2png('학습자료/3-DL-개요.pdf'))
