const express = require('express');
const app = express();

app.get('/',(req,res)=>{
res.send('API  running ');
});

const PORT = process.env.Port || 5000;

app.listen(PORT,console.log(`listening on port ${PORT}`));

