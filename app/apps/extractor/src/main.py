import fitz
from flask import Flask, flash, request, redirect, url_for, session
from markupsafe import escape
from werkzeug.utils import secure_filename
import os
import pathlib

UPLOAD_FOLDER = '.'
ALLOWED_EXTENSIONS = {'pdf'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


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
    return {
        "ok": "true",
        "text": output
    }


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


@app.post("/upload/")
def upload_file():
    if 'file' not in request.files:
        return redirect(url_for('error', text="No file found in the form"))
    file = request.files['file']
    if file.filename == '':
        return redirect(url_for('error', text="No selected file"))
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return redirect(url_for('extract', name=filename))
