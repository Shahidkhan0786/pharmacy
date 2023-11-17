FROM node

WORKDIR /`app
COPY package.json .
RUN npm install
COPY . .
CMD npx sequelize db:migrate;npm run startDev;