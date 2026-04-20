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