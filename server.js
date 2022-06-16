const express = require('express');
const jwt = require('jsonwebtoken');
const router=require('./routes/router')
const app = express();
//app.use(router)  this is use for middleware

app.use('/api',router);
app.use('/api/posts',router);
app.use('/api/login',router);





app.listen(5000, () => console.log('Server started on port 5000'));