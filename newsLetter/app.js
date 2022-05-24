const express = require('express');
const bodyParser = require('body-parser');
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/signup.html");
})

app.post('/', (req, res)=>{

    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    console.log(fname + " " + lname + " " + email);

    const data = {
        members: [
            {
                email_address:email,
                staus : "subscribed",
                FNAME : fname,
                LNAME : lname
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/2cf7f7e4f8";
    const options = {
        method : "POST",
        auth   : "sudip:3495367dba5e21f3894fb64224ac7626-us14"
    }

    const request = https.request(url, options, (response)=>{

        response.on("data", (data)=>{
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData);
    console.log(res.statusCode)
    request.end();
    //res.send('post request successful')
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log('Listening to Port: ', 3000);
})

//3495367dba5e21f3894fb64224ac7626-us14

// list id 2cf7f7e4f8