const express = require('express');
const https = require('https')
const bodyParse = require('body-parser');
const app = express();

app.use(bodyParse.urlencoded({extended:true}))
// first res is where client is requesting data to our server

app.get('/', (req, res) =>{
     res.sendFile(__dirname + '/index.html');
    //res.send("Up And Running ") this will throw an error as response can be send once at a time and it is already send above
});

app.post('/', (req, res)=>{
    
    const location = req.body.locationName;
    console.log(location);
    const apiKey = "77af1b8c68065e197f51ef23b29f4b75";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;    
    // Requesting data from weatheAPI 
    https.get(url, (response)=>{
        console.log(response.statusCode)

        response.on("data", (data)=>{
            const weatherData = JSON.parse(data);
            //console.log(weatherData);
            const blockData = weatherData.weather[0].main;
            const temp = weatherData.main.temp;
    

            // can do weatherData.main.pressure to manipulate data
            res.write(`The temperature is ${temp}`)
            res.send()
        })
    })
})



app.listen(3000, ()=>{
    console.log("server running on PORT", 3000);
});