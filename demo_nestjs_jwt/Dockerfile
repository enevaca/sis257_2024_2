FROM node:lts-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/scr/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["node", "dist/main.js"]
