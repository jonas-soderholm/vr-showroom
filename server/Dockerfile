# FROM python:3.9-slim

# ENV PYTHONDONTWRITEBYTECODE=1
# ENV PYTHONUNBUFFERED=1
# ENV PORT=7000

# WORKDIR /app

# COPY requirements.txt /app/
# RUN pip install --upgrade pip && pip install -r requirements.txt

# COPY . /app/

# EXPOSE 7000

# CMD ["gunicorn", "--bind", "0.0.0.0:$PORT", "vr_project.wsgi:application"]


FROM python:3.9-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app
ENV PORT=7000

COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . /app/

EXPOSE 7000

CMD ["sh", "-c", "gunicorn --bind 0.0.0.0:$PORT vr_project.wsgi:application"]