FROM node:slim

LABEL "com.github.actions.name"="buildVersion bump for electron-builder"
LABEL "com.github.actions.description"="Automated build version bump for electron-builder."
LABEL "com.github.actions.icon"="chevron-up"
LABEL "com.github.actions.color"="blue"

COPY package*.json ./

RUN apt-get update
RUN apt-get -y install git

RUN npm ci --only=production

COPY . .

ENTRYPOINT ["node", "/index.js"]