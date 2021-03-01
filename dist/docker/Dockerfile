FROM node:14-alpine
WORKDIR /SOFTWARE/SPHINX/sphinx_device
RUN npm init -y
RUN npm install node-fetch
COPY . .
CMD [ "node", "index" ]
