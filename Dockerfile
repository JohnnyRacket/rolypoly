FROM node:alpine

# Create Directory for the Container
WORKDIR /usr/src/app

# Only copy the package.json file to work directory
COPY package.json .
# Install all Packages
RUN npm install

# Copy all other source code to work directory
ADD . /usr/src/app

RUN npm install -g typescript
# TypeScript
RUN tsc

# Start
WORKDIR /usr/src/app/dist
CMD [ "node", "server.js" ]
EXPOSE 3000