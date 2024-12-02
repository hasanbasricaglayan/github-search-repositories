FROM node:20.11.1-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli
COPY . .
RUN npm run build
FROM nginx:latest
COPY --from=build /app/dist/github-search-repositories /usr/share/nginx/html
EXPOSE 80
