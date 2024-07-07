ARG PORT=3000

FROM node:20-alpine AS builder
ARG PORT
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV PORT=${PORT}
RUN npm run build
RUN npm prune --production

FROM node:20-alpine
ARG PORT
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production PORT=${PORT}
CMD [ "node", "build/index.js" ]
