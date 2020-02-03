# Create image based on the official Node 10 image from the dockerhub
FROM node:10

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app/node_modules

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package*.json ./

# Install dependecies
RUN npm install


# Get all the code needed to run the app from host to workdir
COPY . .

#EXPOSE 3000
