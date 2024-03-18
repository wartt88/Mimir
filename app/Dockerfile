FROM node:18-alpine3.18

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

COPY apps/web ./apps/web
COPY apps/docs ./apps/docs
COPY packages ./packages

COPY tsconfig.json ./
COPY turbo.json ./
COPY .npmrc ./

RUN npm install

COPY .env ./

EXPOSE 3000

CMD ["npm", "run", "dev"]