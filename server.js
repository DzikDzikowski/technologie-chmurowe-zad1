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
        res.end(`<h3>Miasto: ${city}</h3><p>Temp: 12°C</p><a href="/">Wstecz</a>`);
    }
});

server.listen(port, '0.0.0.0');