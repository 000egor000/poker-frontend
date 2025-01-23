FROM node:18.17.0 AS base
WORKDIR /app
COPY ./package.json .
COPY ./package-lock.json .

FROM base as build
COPY . .
RUN npm install
RUN npm run build

FROM base AS dev
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/pages /app/pages
COPY --from=build /app/public /app/public
COPY --from=build /app/.next /app/.next
COPY --from=build /app/next.config.js /app/next.config.js

FROM base as prod
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/pages /app/pages
COPY --from=build /app/public /app/public
COPY --from=build /app/.next /app/.next
COPY --from=build /app/next.config.js /app/next.config.js
