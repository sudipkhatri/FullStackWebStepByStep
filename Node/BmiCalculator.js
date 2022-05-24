const express = require('express');
const bodyParse = require('body-parser');

const app = express();

//for form it is best to use urlencoded
app.use(bodyParse.urlencoded({extended:true}));

app.get('/', (req, res)=>{
    res.status(200).sendFile(__dirname + "/index.html");
})

app.post('/', (req, res)=>{

    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var result = (num1 / num2).toFixed(2);
    

    res.send('BMI Result : ' + result);
})

app.listen(3000, ()=>{
    console.log('listening to port: '+ 3000);
})