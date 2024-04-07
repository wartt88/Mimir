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
RUN npm run build

EXPOSE 3000

WORKDIR /app/apps/web

CMD ["npm", "run", "start"]