from python:3.9

WORKDIR /tmp/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV FLASK_ENV=development
ENV FLASK_APP=main.py

CMD ["flask", "run", "--host=0.0.0.0"]

EXPOSE 5000