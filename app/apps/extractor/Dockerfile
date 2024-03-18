FROM python:3.10.13-slim-bullseye

RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
RUN pip install --no-cache-dir sentence-transformers

WORKDIR /extractor

COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY src ./src

WORKDIR src

EXPOSE 5000

CMD ["flask", "--app", "main", "run", "--host", "0.0.0.0"]