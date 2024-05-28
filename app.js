const express = require('express');
const app = express();
const port = 3000;

const postsRouter = require('./routers/posts.js');
const homeRouter = require('./routers/home.js');


app.use(express.static('public'));

app.use('/', homeRouter);

app.use('/posts', postsRouter);

app.listen(port, () => {
    console.log('Server Online')
});
