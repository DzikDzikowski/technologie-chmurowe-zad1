Sprawozdanie z zadania 1 Technologie Chmurowe

Autor: Hubert Szydłowski

GitHub Repo: 

https://github.com/DzikDzikowski/technologie-chmurowe-zad1

DockerHub: 

https://hub.docker.com/repository/docker/hubszy/zadanie1/general

1. Opis:

Aplikacja napisana w środowisku Node do sprawdzania pogody. Podaje informacje w logach o informację o dacie uruchomienia, imieniu i nazwisku autora programu oraz porcie TCP.

2. Dockerfile:

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

Zastosowałem wieloetapowe budowanie oraz obraz bazowy Alpine z racji na jego mały rozmiar. 

3. Server.js

const http = require('http');

const author = "Hubert Szydlowski";
const port = 8080;
const startTime = new Date().toLocaleString();

console.log(`Data: ${startTime}`);
console.log(`Autor: ${author}`);
console.log(`Port: ${port}`);

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    if (req.url === '/') {
        res.end(`
            <h1>Zadanie 1</h1>
            <p>Autor: ${author}</p>
            <form action="/pogoda">
                <select name="city">
                    <option value="Lublin">Lublin</option>
                    <option value="Warszawa">Warszawa</option>
                </select>
                <button type="submit">OK</button>
            </form>
        `);
    } else if (req.url.startsWith('/pogoda')) {
        const urlParams = new URL(req.url, `http://${req.headers.host}`);
        const city = urlParams.searchParams.get('city') || 'Nieznane';
        res.end(`<h3>Miasto: ${city}</h3><p>Temp: 12 stopni Celsjusza</p><a href="/">Wstecz</a>`);
    }
});

server.listen(port, '0.0.0.0');

4. Użyte polecenia:

Docker build:

![Docker build](<Docker_build.png>)

Docker images - rozmiar obrazu:

![Docker images - rozmiar obrazu](<Docker_images.png>)

Docker history - warstwy:

![Docker history - warstwy (10)](<Docker_history.png>)

Uruchomienie kontenera i logi:

![Uruchomienie kontenera i logi](<run.png>)
