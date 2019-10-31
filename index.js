
console.log('this is working');

const express = require('express');

// const Posts = require('./data/db.js');

const postsRouter = require('./posts/postsRouter.js');

const server = express();

server.use(express.json());


server.use('/api/posts', postsRouter)

const port = 8000

server.listen(port, () => console.log(`listening on port ${port}`))