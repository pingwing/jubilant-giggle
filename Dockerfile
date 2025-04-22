FROM node:22.14-alpine

WORKDIR /app

COPY dist/main.js main.js

ENV PORT=3000
EXPOSE 3000

CMD ["node", "main.js"]
