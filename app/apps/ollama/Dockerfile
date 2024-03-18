FROM ubuntu:22.04

WORKDIR /ollama

COPY vigogne.gguf ./
COPY Modelfile ./

RUN apt update -y && apt upgrade -y
RUN apt install curl -y
RUN apt install screen -y
RUN curl -fsSL https://ollama.com/install.sh | sh

COPY start.sh ./

RUN chmod +x start.sh

CMD ["./start.sh"]
