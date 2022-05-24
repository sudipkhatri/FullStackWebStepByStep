var mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/myDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful!");
});

var schema = mongoose.Schema({
  name: String,
  age: Number
});

var Model = mongoose.model("model", schema, "myCollection");

var doc1 = new Model({ name: "John", age: 21 });

doc1.save(function(err, doc) {
  if (err) return console.error(err);
  console.log("Document inserted succussfully!");
});