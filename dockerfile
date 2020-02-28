FROM mongo:latest

RUN mkdir -p /home/app/data/
WORKDIR /home/app/data/

COPY . .

