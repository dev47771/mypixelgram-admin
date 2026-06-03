FROM node:20-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

ENV NEXT_PUBLIC_GRAPHQL_URL=https://mypixelgram.ru/api/v1/graphql
ENV NEXT_PUBLIC_APP_URL=https://admin.mypixelgram.ru

RUN npm run build:production

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/ ./
USER node
EXPOSE 3000
CMD ["npm", "start"]
