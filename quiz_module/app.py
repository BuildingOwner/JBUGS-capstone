import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

from flask import Flask, request
from secret.db_connection import getConnection
import pymysql
from datetime import datetime, timedelta
from quiz_module.quiz_module_image_summary import gen
from secret.sql_injection_detector import sql_injection_detector

app = Flask(__name__)


@app.route("/add-quiz", methods=["POST"])
def add_quiz():
    lecture = request.form.get("lecture")
    week = request.form.get("week")
    path = request.form.get("path")

    print("lecture: ", lecture)
    print("week: ", week)
    print("path: ", path)

    if int(week) > 16 or int(week) < 0 or lecture == None or lecture == '' :
        return 'invalied request', 401
    
    if not os.path.exists(path):
        return 'no file', 402
    
    sql_strings = [lecture, week]
    if sql_injection_detector(sql_strings) :
        return 'invalied request', 403

    now = datetime.now()
    one_week_later = now + timedelta(weeks=1)
    formatted_date = one_week_later.strftime("%Y-%m-%d %H:%M:%S")

    # path = '학습자료/3-DL-원리.pdf'

    question = gen(path, 3)
    
    sql_strings = [question]
    if sql_injection_detector(sql_strings) :
        return 'invalied quiz data', 404

    db = getConnection()
    cursor = db.cursor()
    sql = "INSERT INTO question (deadline, question_name, question) VALUES (%s, %s, %s)"
    val = (formatted_date, f"{lecture} {week}주차 퀴즈", question)
    cursor.execute(sql, val)

    db.commit()

    return "Quiz added successfully", 200


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
