import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

from flask import Flask, Response, request, jsonify, stream_with_context
from secret.db_connection import getConnection
import pymysql
from datetime import datetime, timedelta
from quiz_module.quiz_module_keyword import gen as keword_gen
from quiz_module.quiz_module_image_summary import gen as summary_gen
from secret.sql_injection_detector import sql_injection_detector
import json
from explane_generator import gen
from related_generator import related_question_gen
from datetime import datetime
from chat import chat
from erase_folder import erase_folder

app = Flask(__name__)


@app.route("/add-quiz-keyword", methods=["POST"])
def add_quiz_keyword():
    lecture = request.form.get("lecture")
    week = request.form.get("week")
    path = request.form.get("path")
    choice = request.form.get("choice")
    short = request.form.get("short")

    print("lecture: ", lecture)
    print("week: ", week)
    print("path: ", path)
    print("choice: ", choice)
    print("short: ", short)

    if int(week) > 16 or int(week) < 0 or lecture == None or lecture == "":
        return "invalied request", 401

    if not os.path.exists(path):
        return "no file", 402

    sql_strings = [lecture, week]
    if sql_injection_detector(sql_strings):
        return "invalied request", 403

    now = datetime.now()
    one_week_later = now + timedelta(weeks=1)
    formatted_date = one_week_later.strftime("%Y-%m-%d %H:%M:%S")

    # path = '학습자료/3-DL-원리.pdf'

    question = keword_gen(path, int(choice), int(short))

    sql_strings = [json.dumps(question, ensure_ascii=False)]
    if sql_injection_detector(sql_strings):
        return "invalied quiz data", 404

    db = getConnection()
    cursor = db.cursor()
    sql = "INSERT INTO question (deadline, question_name, question) VALUES (%s, %s, %s)"
    val = (formatted_date, f"{lecture} {week}주차 퀴즈", question)
    cursor.execute(sql, val)

    db.commit()

    return "Quiz added successfully", 200


@app.route("/add-quiz-summary", methods=["POST"])
def add_quiz_summary():
    lecture = request.form.get("lecture")
    week = request.form.get("week")
    path = request.form.get("path")
    choice = request.form.get("choice")
    short = request.form.get("short")

    print("lecture: ", lecture)
    print("week: ", week)
    print("path: ", path)
    print("choice: ", choice)
    print("short: ", short)

    if int(week) > 16 or int(week) < 0 or lecture == None or lecture == "":
        return "invalied request", 401

    if not os.path.exists(path):
        return "no file", 402

    sql_strings = [lecture, week]
    if sql_injection_detector(sql_strings):
        return "invalied request", 403

    now = datetime.now()
    one_week_later = now + timedelta(weeks=1)
    formatted_date = one_week_later.strftime("%Y-%m-%d %H:%M:%S")

    # path = '학습자료/3-DL-원리.pdf'

    question = summary_gen(path, int(choice), int(short))

    sql_strings = [json.dumps(question, ensure_ascii=False)]
    if sql_injection_detector(sql_strings):
        return "invalied quiz data", 404

    db = getConnection()
    cursor = db.cursor()
    sql = "INSERT INTO question (deadline, question_name, question) VALUES (%s, %s, %s)"
    val = (formatted_date, f"{lecture} {week}주차 퀴즈", question)
    cursor.execute(sql, val)

    db.commit()

    return "Quiz added successfully", 200


@app.route("/get-quiz/<int:question_id>", methods=["GET"])
def get_quiz(question_id):
    try:
        db = getConnection()
        cursor = db.cursor()
        sql = "SELECT question FROM question WHERE id = %s"
        cursor.execute(sql, (question_id,))
        question_row = cursor.fetchone()
        if question_row:
            # 데이터베이스로부터 읽어온 문자열을 다시 Python 딕셔너리로 변환
            question_dict = json.loads(question_row[0])
            return jsonify(question_dict), 200
        else:
            return "Question not found", 404
    except Exception as e:
        return str(e), 500
    finally:
        cursor.close()
        db.close()


@app.route("/get-explane", methods=["GET"])
def get_explane():
    question = request.form.get("question")
    if question == "none":
        return "Quiz not found.", 200

    def generate():
        for piece in gen(str(question)):
            if piece is not None:  # piece가 None이 아닐 경우에만 encode 진행
                yield piece.encode("utf-8")

    return Response(stream_with_context(generate()))


@app.route("/related-quiz", methods=["GET"])
def get_related_quiz():
    question = request.form.get("question")
    print(question)
    related_question = related_question_gen(question)
    return related_question, 200

@app.route('/chat', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        # 이미지 파일저장
        image = request.files.get('image')
        text = request.form['text']
        print(image, text)
        if image:
            erase_folder()
            now = datetime.now()
            filename = str(now.strftime("%H_%M_%S_") + str(now.microsecond // 1000)) + image.filename 
            save_path = os.path.join('quiz_module/chat_img', filename)  # 'uploads' 폴더에 저장
            image.save(save_path)
            #chat(text, 'vision', save_path)
            def generate():
                for piece in chat(text, 'vision', [save_path]):
                    if piece is not None:  # piece가 None이 아닐 경우에만 encode 진행
                        yield piece.encode("utf-8")
            return Response(stream_with_context(generate()))
        
        def generate():
            for piece in chat(text, 'turbo'):
                if piece is not None:  # piece가 None이 아닐 경우에만 encode 진행
                    yield piece.encode("utf-8")
        return Response(stream_with_context(generate()))
        

    return jsonify({'message': 'Failed to upload file'})


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
