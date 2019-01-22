# Build Step
FROM node:10

# Build arguments
ARG SSH_PRIVATE_KEY

# Variables
ENV PORT=3000
ENV PACKAGE_NAME="marketplace-sample"

# Prepare SSH private key
RUN mkdir /root/.ssh/
RUN echo "${SSH_PRIVATE_KEY}" > /root/.ssh/id_rsa
RUN chmod 400 /root/.ssh/id_rsa
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts

# Create app directory
WORKDIR /usr/src/${PACKAGE_NAME}/

# Copy only the package.json and lock file and install app dependencies
COPY ./package.json ./yarn.lock /usr/src/${PACKAGE_NAME}/
RUN yarn install --ignore-engines

# Copy the app source code and compile it
COPY . /usr/src/${PACKAGE_NAME}/
RUN yarn build

## Expose and startup
EXPOSE ${PORT}
CMD [ "node", "./build/start.js" ]