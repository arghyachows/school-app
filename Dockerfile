FROM node:12 as node
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build --aot

FROM nginx:alpine
COPY --from=node /app/dist/school-project /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx","-g","daemon off;"]
