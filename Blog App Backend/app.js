const express = require('express');
const bodyParser = require('body-parser'); 
const router = require('./routes/Blogs');
const app = express();
const port = 8080;
app.use(bodyParser.json()); 


app.use((req, res, next) => {
    console.log('listening on port',port);
    console.log('host: ',req.hostname);
    console.log('path: ',req.path);
    console.log('method: ',req.method);
    next();
})

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}]`);
    next();
  });
  app.use('/',router )


app.listen(port);