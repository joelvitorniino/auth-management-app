import express from 'express';

const app = express();

app.get('/', (request: express.Request, response: express.Response) => {
    response.send("Hello, World!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});