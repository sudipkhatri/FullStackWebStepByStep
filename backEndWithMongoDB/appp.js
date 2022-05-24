const mongoose = require("mongoose");

var db = mongoose.connect("mongodb://127.0.0.1:27017/newDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true
}, function(err){
    if(err){
        console.log('Error Connceting to db.')
    }
    console.log('succesfully connected to db');
});


var schema = mongoose.Schema({
  name: String,
  age: Number
});

var Model = mongoose.model("model", schema, "myCollection");

var doc1 = new Model({ name: "JohnSmith", age: 23 });

doc1.save(function(err, doc) {
  if (err) return console.error(err);
  console.log("Document inserted succussfully!");
  mongoose.connection.close()
});


