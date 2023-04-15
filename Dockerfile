FROM node:14-alpine AS builder
WORKDIR "/app"
ENV PORT=80
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false
COPY . .
RUN yarn build
RUN rm -rf node_modules
RUN yarn install --frozen-lockfile --production=true

FROM node:14-alpine AS production
WORKDIR "/app"
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/dist ./dist
ENV NODE_ENV=development
RUN yarn install --frozen-lockfile --production
EXPOSE 80
CMD [ "sh", "-c", "yarn start:prod"]