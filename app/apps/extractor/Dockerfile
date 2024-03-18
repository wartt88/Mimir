FROM python:3.11.2-slim-bullseye

RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
RUN pip install --no-cache-dir sentence-transformers

WORKDIR /extractor

COPY requirements.txt ./
COPY src ./src

RUN pip install -r requirements.txt

EXPOSE 5000

WORKDIR src

CMD ["flask", "--app", "main", "run", "--host", "0.0.0.0"]