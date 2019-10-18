# Build image
FROM node:alpine as builder
# Directory used for running the build commands
WORKDIR /tmp
# Copy package, package-lock.json, tsconfig, webpack
COPY package*.json tsconfig.json webpack.config.ts ./
# Install git
RUN apk --update add git
# Install dependencies
RUN npm ci
# Copy typescript files
COPY . .
# Run npm test
RUN npm run test
# Transpile from Typescript to javascript
RUN npm run build

# Latest LTS
FROM node:alpine
# Add build-related environment variables
# Author of commit
ARG author
# sha of commit
ARG gitCommit
# Build date
ARG buildDate
# Set to environment variables to expose to application
ENV AUTHOR=$author
ENV COMMIT_HASH=$gitCommit
ENV BUILD_DATE=$buildDate

# Create app directory
WORKDIR /opt
# Copy package, package-lock.json
COPY package*.json ./
# Bundle app source
COPY --from=builder /tmp/dist ./dist/
#Install dependencies
RUN npm ci --only=production
# Exposed route
EXPOSE 8080
# Add production environment variable
ENV NODE_ENV=production
# Main command
ENTRYPOINT ["npm", "run", "start:prod"]
