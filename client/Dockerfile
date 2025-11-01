FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json* ./
RUN npm install --production
COPY --from=builder /app/dist ./dist
EXPOSE 5173
CMD ["npx", "serve", "dist", "-l", "5173", "-s"]
