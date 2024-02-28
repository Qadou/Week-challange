const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/userRoutes')
const port =8080;



app.use(bodyParser.json());
app.use('/',router)






app.listen(port,console.log(`the app is listening in ${port}`));