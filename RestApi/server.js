//const express = require('express');
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB",
{
    useNewUrlParser : true,
    maxPoolSize : 10,
    family : 4,
    useUnifiedTopology: true
},

function(err){
    if(err){
        console.log(err);
    }
    console.log('database connection success');
});

const schema = mongoose.Schema({
    title   : String,
    content : String
});

const Wiki = mongoose.model('wiki', schema, "articles");

const data = new Wiki({
    title : "Carabbein of sea",
    content: "jjsaj ajshjd  akjshd klash klasdjf alkjfh"
});

data.save(function(err){
    if(err){
        throw err;
    }
    console.log('Data inserted succesfully');
    mongoose.connection.close();
})
