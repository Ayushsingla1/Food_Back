const express = require('express');
const app = express();
const cookieparser = require('cookie-parser');
const cors = require("cors");
require('dotenv').config();
app.use(express.json());
app.use(cookieparser())

app.use(cors());
const db = require('./config/database');
db();

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}`)
})

const routes = require('./route/routes')
app.use('/api/v1',routes);


