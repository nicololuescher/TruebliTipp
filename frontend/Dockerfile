FROM node:20.17.0 as builder
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app
RUN npm run build

FROM nginx:1.19.10
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
