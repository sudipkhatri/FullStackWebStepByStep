//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

// to chnage or to use static templates  which is ejs
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO
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

const articlesSchema = mongoose.Schema({
    title   : String,
    content : String
});

const Article = mongoose.model('Article', articlesSchema, "articles");


app.route('/articles')
.get((req, res)=>{
    Article.find(function(err, foundArticles){
        if(err){
            res.send(err);
        }
        res.send(foundArticles);
        
    })
})
.post((req, res)=>{
    // we need to get req body as input as we have teo attributes with title and content
    //console.log(req.body.title);
    //console.log(req.body.content);

    const newArticle = new Article({
        title : req.body.title,
        content : req.body.content
    });
    newArticle.save(function(err){
        if(err){
            throw err;
        }
        console.log('New Article Inserted: ', req.body.title);
        res.send('Article Inserted');
    })
})
.delete((req, res)=>{
    Article.deleteMany(function(err){
        if(err){
            throw err;
        }
        console.log('Delete Success ');
        res.send('Successfully Deleted Data.');
    });
});


app.route('/articles/:artTitle')
.get((req, res)=>{
    Article.findOne({title:req.params.artTitle}, function(error, foundArticle){
        if(error){
            res.send(error);
        }
        res.send(foundArticle);
        
    })
})
.put((req, res)=>{
    Article.updateMany(
        {title: req.params.artTitle},
        {title: req.body.title, content: req.body.content},
        {upsert: true},
        function(err){
            if(err){
                res.send(err);
            }
            res.send('Update Using Put Success !')
        }
    )
})

///////////////////////Specific Articles /////////////////////////


app.listen(3000, function() {
  console.log("Server started on port 3000");
});