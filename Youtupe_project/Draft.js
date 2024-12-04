const http = require('http');
const server = http.createServer((req, res) => {
    res.end('Server is running on port 8080');
});
server.listen(8080, () => console.log('Server is running on port 8080'));
