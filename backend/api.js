const http = require('http');
const fs = require('fs');
const path = require('path');

// Define o caminho para o arquivo JSON que armazena os CEPs.
const cepsFilePath = path.join(__dirname, '..', 'data', 'ceps.json');

// Cria o servidor HTTP e define o roteamento de requisições.
const server = http.createServer((req, res) => {
    // Rota para salvar um novo endereço.
    if (req.url === '/api/save' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newAddress = JSON.parse(body);
            newAddress.dataHora = new Date().toISOString();

            // Lê o arquivo JSON existente para verificar duplicidade.
            fs.readFile(cepsFilePath, 'utf8', (err, data) => {
                if (err && err.code !== 'ENOENT') {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Erro ao ler o arquivo de dados.' }));
                    return;
                }

                const ceps = data ? JSON.parse(data) : [];

                // Verifica se o CEP já foi cadastrado.
                const cepExists = ceps.some(cep => cep.cep === newAddress.cep);
                if (cepExists) {
                    res.writeHead(409, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'CEP já cadastrado.' }));
                    return;
                }

                ceps.push(newAddress);

                // Salva o array atualizado de volta no arquivo JSON.
                fs.writeFile(cepsFilePath, JSON.stringify(ceps, null, 2), err => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Erro ao salvar o endereço.' }));
                        return;
                    }

                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Endereço salvo com sucesso!' }));
                });
            });
        });
    } else if (req.method === 'GET') {
        // Roteamento para servir os arquivos estáticos do frontend (HTML, CSS, JS).
        let reqUrl = req.url.split('?')[0];
        if (reqUrl === '/') {
            reqUrl = '/index.html';
        }
        let filePath = path.join(__dirname, '..', reqUrl);

        const extname = path.extname(filePath);
        let contentType = 'text/html';
        switch (extname) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.png':
                contentType = 'image/png';
                break;
        }

        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code == 'ENOENT') {
                    res.writeHead(404);
                    res.end('File not found');
                } else {
                    res.writeHead(500);
                    res.end('Server error');
                }
            }
            else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    } else {
        // Resposta para rotas não encontradas.
        res.writeHead(404);
        res.end('Not Found');
    }
});

const PORT = 3000;
// Inicia o servidor e escuta na porta definida.
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
