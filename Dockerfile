FROM node:12 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --aot

FROM nginx:alpine
COPY --from=node /app/dist/school-project /usr/share/nginx/html
