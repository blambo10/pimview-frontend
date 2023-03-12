# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

#TODO issue with react try running commented with explicit react dnd install and see if error can be reproduced. 

RUN npm install mqtt
RUN npm install @mui/material @emotion/react @emotion/styled
RUN npm install @mui/icons-material

# add app
RUN pwd
RUN ls
COPY . ./

# start app
CMD ["tail", "-f", "/dev/null"]
# CMD ["npm", "start"]
