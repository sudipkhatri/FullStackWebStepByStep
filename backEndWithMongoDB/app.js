const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/final', 
{
    maxPoolSize : 10,
    useNewUrlParser : true,
    useUnifiedTopology: true,
    family: 4
}, 
function(err){
    if(err){
        console.log('Error In Connection ! !');
    }
    console.log('success');
})

const schema = mongoose.Schema({
    name : String,
    age  : Number
})

const Person = mongoose.model('Person', schema, 'personList');

const ram = new Person({
    name : 'ram',
    age  : 20
})

ram.save(function(err){
    if(err){
        console.log(err);
    }
    console.log('Data Inserted Successfully');
    mongoose.connection.close();
})