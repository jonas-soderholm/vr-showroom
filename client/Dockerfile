FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build

RUN npm install -g serve

CMD ["sh", "-c", "serve -s build -l ${PORT:-3000}"]

EXPOSE 3000