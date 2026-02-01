FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# LamaDB Internal Protocol Port
EXPOSE 5174

ENV NODE_NAME=quantum-01
ENV TIER=sovereign
ENV GITHUB_SYNC=enabled

CMD ["node", "provisioner.js"]
