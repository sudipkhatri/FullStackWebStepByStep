const express = require('express')
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let today = new Date();
    var currentDay = today.getDay();
    var day = weekday[currentDay];
   

    res.render('list', {kindOfDay : day})

   
})

app.listen(3000, ()=>{
    console.log('Listening on Server', 3000);
})