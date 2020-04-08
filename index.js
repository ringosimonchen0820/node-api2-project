const express = require('express');
const server = express();
const postsRouter = require('./data/db.router');

server.use(express.json());
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
    res.send(`
        <h1> Lambda Posts API </h>
        <p>  Welcome to the Lambda Posts API </p>
    `);
});

const port = 5000;
server.listen(port, () => {
    console.log(`\n***=== SERVER RUNNING ON http://localhost:${port} ===***\n`);
});