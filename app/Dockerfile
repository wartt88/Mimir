FROM node:18-alpine3.18

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

COPY apps ./apps
COPY packages ./packages

COPY tsconfig.json ./
COPY turbo.json ./
COPY .npmrc ./

COPY .env ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]