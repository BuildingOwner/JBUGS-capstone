import os
import shutil

def get_folder_size(folder):
    """
    폴더의 총 용량을 계산합니다.
    """
    total_size = 0
    for dirpath, dirnames, filenames in os.walk(folder):
        for f in filenames:
            fp = os.path.join(dirpath, f)
            # 파일이 심볼릭 링크가 아닌지 확인 후 크기 추가
            if not os.path.islink(fp):
                total_size += os.path.getsize(fp)
    return total_size

def delete_all_files_in_folder(folder):
    """
    폴더 안의 모든 파일을 삭제합니다.
    """
    for filename in os.listdir(folder):
        file_path = os.path.join(folder, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)  # 파일 또는 심볼릭 링크 삭제
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)  # 폴더 삭제
        except Exception as e:
            print(f'Failed to delete {file_path}. Reason: {e}')

def erase_folder():
    folder_path = 'quiz_module/chat_img'  # 여기에 폴더 경로 입력
    folder_size = get_folder_size(folder_path)

    if folder_size > 1 * 1024 * 1024 * 1024:  # 1GB 초과 시
        delete_all_files_in_folder(folder_path)
        print("폴더 내의 모든 파일이 삭제되었습니다.")
    else:
        print("폴더 크기가 1GB를 초과하지 않습니다.")