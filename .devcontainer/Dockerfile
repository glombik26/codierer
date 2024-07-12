FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bullseye
# Install headless Chrome for usage in npm run test
RUN apt-get update \
     && apt-get -y install --no-install-recommends chromium
ENV CHROME_BIN=/usr/bin/chromium
