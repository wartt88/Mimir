import fitz
from flask import Flask, flash, request, redirect, url_for, session
from markupsafe import escape
from werkzeug.utils import secure_filename
import os
import pathlib
import requests
import json
from datetime import datetime
from flask_cors import CORS

UPLOAD_FOLDER = '.'
ALLOWED_EXTENSIONS = {'pdf'}

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = b'beb7b92dd94df7c9387e55726d5e70c0502262e9aa54dd5a51694e74726a4652'


@app.route("/extract/")
def extract():
    name = request.args.get("name")
    nbQuestions = request.args.get("number")

    pdfbytes = pathlib.Path(name).read_bytes()
    doc = fitz.open("pdf", pdfbytes)
    output = ""
    for page in doc:  # iterate the document pages
        text = page.get_text()
        output += text

    os.remove(name)

    formatJson = '{ questions : [ {question : <...>, answer : <...>} ] }'

    prompt = f"Contexte : <{output}> Fin du contexte. Génère {nbQuestions} questions avec leur réponse dans ce format en JSON : {str(formatJson)}."
        
    payload = {
        'model': 'vigogne',
        'prompt': prompt,
        'format': "json",
         'stream': False
    }
    
    r = requests.post("http://vps.kizyow.me/ollama/api/generate", json=payload)
    retourIA = r.json()

    retour = retourIA["response"]
    questions = json.loads(retour)["questions"]
    
    payload = {
        'id': 1,
        'title': 'test',
        'tags': ['tag1'],
        'isPublic': True,
        'isEducational': False,
        'votes': {'up': 10, 'down':0},
        'deadline': datetime.today().strftime('%Y-%m-%d'),
        'cards': questions
    }

    ## Ajout des éléments nécessaires dans questions
    i = 1
    for element in questions:
        element['id'] = i
        element['proficency'] = 1
        element['lastSeen'] = datetime.today().strftime('%Y-%m-%d')
        i += 1
    
    ## Requête vers l'API pour pouvoir créer un deck avec les questions générées
    # requests.post("http://localhost:3000/api/deck",json=payload)

    return questions


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
        questions = request.form['questions']
        if file.filename == '':
            return redirect(url_for('error', text="No selected file"))
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('extract', name=filename, number=questions))
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type="number" name="questions" min="1" max="100" value="10"/>
      <input type=submit value=Upload>
    </form>
    '''
