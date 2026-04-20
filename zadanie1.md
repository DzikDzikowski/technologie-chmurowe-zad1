Sprawozdanie z zadania 1 Technologie Chmurowe

Autor: Hubert Szydłowski

GitHub Repo: 

https://github.com/DzikDzikowski/technologie-chmurowe-zad1

DockerHub: 

https://hub.docker.com/repository/docker/hubszy/zadanie1/general

1. Opis:

Aplikacja napisana w środowisku Node do sprawdzania pogody. Wymaga logowania danych autora zgodnie z poleceniem. 

2. Dockerfile:

FROM node:20-alpine AS builder
WORKDIR /app
COPY server.js .

FROM node:20-alpine
LABEL org.opencontainers.image.authors="Hubert Szydłowski"
WORKDIR /app
COPY --from=builder /app/server.js .
EXPOSE 8080
CMD ["node", "server.js"]

Zastosowałem wieloetapowe budowanie oraz obraz bazowy Alpine z racji na jego mały rozmiar. 

3. Użyte polecenia:

Docker build:

![Docker build](<Docker_build.png>)

Docker images - rozmiar obrazu:

![Docker images - rozmiar obrazu](<Docker_images.png>)

Docker history - warstwy:

![Docker history - warstwy (10)](<Docker_history.png>)

Uruchomienie kontenera i logi:

![Uruchomienie kontenera i logi](<run.png>)
