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

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    
    const url = new URL(req.url, `http://${req.headers.host}`);
    const city = url.searchParams.get('city');

    let weatherInfo = '';
    if (city) {
        const temp = Math.floor(Math.random() * 30);
        weatherInfo = `<h2>Pogoda dla: ${city}</h2><p>Temperatura: ${temp}°C</p><a href="/">Powrót</a>`;
    } else {
        weatherInfo = `
            <form id="weatherForm">
                <label>Wybierz kraj:</label>
                <select id="country" onchange="updateCities()">
                    <option value="">--Wybierz--</option>
                    <option value="Polska">Polska</option>
                    <option value="Niemcy">Niemcy</option>
                </select>
                <br><br>
                <label>Wybierz miasto:</label>
                <select id="city" name="city" disabled>
                    <option value=""> Najpierw wybierz kraj </option>
                </select>
                <br><br>
                <button type="submit">Sprawdź pogodę</button>
            </form>

            <script>
                const citiesByCountry = {
                    "Polska": ["Warszawa", "Lublin", "Kraków"],
                    "Niemcy": ["Berlin", "Monachium", "Hamburg"]
                };

                function updateCities() {
                    const countrySelect = document.getElementById('country');
                    const citySelect = document.getElementById('city');
                    const selectedCountry = countrySelect.value;

                    citySelect.innerHTML = '';
                    if (selectedCountry) {
                        citySelect.disabled = false;
                        citiesByCountry[selectedCountry].forEach(city => {
                            let opt = document.createElement('option');
                            opt.value = city;
                            opt.innerHTML = city;
                            citySelect.appendChild(opt);
                        });
                    } else {
                        citySelect.disabled = true;
                    }
                }
            </script>
        `;
    }

    res.end(`
        <h1>Aplikacja Pogodowa</h1>
        <p>Autor: Hubert Szydlowski</p>
        ${weatherInfo}
    `);
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Data: ${new Date()}`);
    console.log(`Autor: Hubert Szydlowski`);
    console.log(`Port: ${PORT}`);
});

4. Użyte polecenia:

Docker build:

![Docker build](<Docker_build.png>)

Docker images - rozmiar obrazu:

![Docker images - rozmiar obrazu](<Docker_images.png>)

Docker history - warstwy:

![Docker history - warstwy (10)](<Docker_history.png>)

Uruchomienie kontenera i logi:

![Uruchomienie kontenera i logi](<run.png>)
