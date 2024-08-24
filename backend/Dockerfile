FROM node:20.12.2
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . /app
CMD ["npm", "run", "start"]