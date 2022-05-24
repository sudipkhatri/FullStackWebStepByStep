const express = require('express');

const app = express();

//methods 

app.get('/', (req, res)=>{
    res.send('<h1>Hello World </h1>')
});

app.get('/about', (req, res)=>{
    res.send('<h1> I am Noob </h1>')
})
app.listen(8000, ()=>{

});