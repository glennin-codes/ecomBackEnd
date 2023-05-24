FROM node:19
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV PORT 8000
EXPOSE $PORT
CMD ["node", "index.js"]


