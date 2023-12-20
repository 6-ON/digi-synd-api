FROM node:20-alpine3.19
WORKDIR /app
COPY package*.json .
RUN npm i -yes --verbose
COPY . /app
CMD ["npm", "start"]