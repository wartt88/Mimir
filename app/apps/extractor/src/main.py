import fitz
from flask import Flask, flash, request, redirect, url_for, session
from markupsafe import escape
from werkzeug.utils import secure_filename
import os
import pathlib
import requests
import re

UPLOAD_FOLDER = '.'
ALLOWED_EXTENSIONS = {'pdf'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = b'beb7b92dd94df7c9387e55726d5e70c0502262e9aa54dd5a51694e74726a4652'


@app.route("/extract/")
def extract():
    name = request.args.get("name")

    pdfbytes = pathlib.Path(name).read_bytes()
    doc = fitz.open("pdf", pdfbytes)
    output = ""
    for page in doc:  # iterate the document pages
        text = page.get_text()
        output += text

    os.remove(name)

    prompt = f"Contexte : <{output}> Fin du contexte. Génère 5 questions avec leur réponse. Numérote chaque question"

    payload = {
        'model': 'vigogne',
        'prompt': prompt,
        'stream': False
    }

    r = requests.post("http://vps.kizyow.me/ollama/api/generate", json=payload)
    json = r.json()

    questions = json["response"]
    quest = re.split(r"\d+\.", questions)
    print(quest)
    html = "<p>"
    for q in quest:
        html += f"{q}<br><br>"
    html += "</p>"
    return html


def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/error/")
def error():
    text = request.args.get("text")
    return {
        "ok": "false",
        "error": text
    }


@app.route("/upload/", methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            return redirect(url_for('error', text="No file found in the form"))
        file = request.files['file']
        if file.filename == '':
            return redirect(url_for('error', text="No selected file"))
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('extract', name=filename))
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''
