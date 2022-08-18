const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const route = require('./routers/base.js');
const app = express()
const port = 3000;

app.use(cors());
app.use(parser.json());
app.use(route);

app.listen(port,()=> console.log(`server is running on port: ${port}`))
