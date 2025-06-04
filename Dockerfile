# Build stage
FROM node:23-alpine3.20 AS build
WORKDIR /usr/src/app
COPY ./src ./src
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./tsconfig.json ./tsconfig.json
COPY ./conditions ./conditions
RUN yarn install --frozen-lockfile --ignore-scripts --ignore-engines && \
  yarn global add @nestjs/cli --ignore-engines && \
  yarn build

# Dependencies
FROM node:23-alpine3.20 AS dependencies
WORKDIR /usr/src/app
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
# COPY ./types ./types
RUN yarn install --frozen-lockfile --ignore-scripts --ignore-engines --production

# Production stage
FROM node:23-alpine3.20
WORKDIR /usr/src/app
ARG UID=2000
ARG GID=$UID
RUN addgroup -g "$GID" non-root && \
  adduser -u "$UID" -G non-root -s /bin/sh -D non-root && \
  chown -R "$UID":"$GID" /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/conditions ./conditions
COPY --from=dependencies /usr/src/app/package.json ./package.json
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
USER $UID
