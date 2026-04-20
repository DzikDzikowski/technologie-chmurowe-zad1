FROM node:20-alpine AS builder
WORKDIR /app
COPY server.js .

FROM node:20-alpine
LABEL org.opencontainers.image.authors="Hubert Szydłowski"
WORKDIR /app
COPY --from=builder /app/server.js .
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/ || exit 1

USER node
EXPOSE 8080
CMD ["node", "server.js"]