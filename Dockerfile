#base image
FROM node:latest

#setting working directory
WORKDIR /home/api

#copying web application file to container's working directory
COPY . ./

#commant for install packages from package.json
RUN npm install

#exposing port from listened port
EXPOSE 5000

#entrypoint for executing command before cmd
ENTRYPOINT ["npm", "run", "start"]


#command runs when entrypoint does't work
CMD ["node", "index.js"]