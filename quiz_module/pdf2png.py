import fitz #PyMuPDF
import os

# Get the absolute path of the current Python script
current_file_path = os.path.abspath(__file__)
# Extract the file name from the path
current_file_name = os.path.basename(current_file_path)

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
        
    print(f"[{current_file_name}] #pdf2png done.")

    return f"{directory}/"

if __name__ == "__main__":
    print(pdf2png('test\과제1.pdf'))
