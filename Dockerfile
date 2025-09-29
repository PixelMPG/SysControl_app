FROM node:20

RUN apt-get update && \
    apt-get install -y watchman && \
    apt-get clean

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002


CMD ["npm", "start"]