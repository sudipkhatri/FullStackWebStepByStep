//jshint esversion:6
const express = require('express')
const bodyParser = require('body-Parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
var session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var findOrCreate = require('mongoose-findorcreate')




const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}))
app.use(session({
    secret : 'our secret',
    resave : false,
    saveUninitialized : false
}))

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

mongoose.connect("mongodb://127.0.0.1:27017/userDB",
 {
    useNewUrlParser : true,
    maxPoolSize : 10,
    family : 4,
    useUnifiedTopology: true
 },
 function(err){
    if(err){
        throw err;
    }
    console.log('SuccesFully Connected To database. ')
 });

 
 const userSchema = new mongoose.Schema({
     email: String,
     password : String,
     googleId : String
 });

//mongoose.set('useCreateIndex', true);
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new GoogleStrategy({
    clientID: '1066378903214-5kl0dt60966hes3mgo4fp5pcvv15vl5c.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


app.get('/', function(req, res){
    res.render("home")
});

app.get('/auth/google', function(req, res){
    passport.authenticate('google', { scope: ['profile'] })
});

app.get('/auth/google/secrets', passport.authenticate('google', {failureRedirect : '/login'}),function(req, res){
    res.redirect('/secrets')
})

app.get('/login', function(req, res){
    res.render("login")
});

app.get('/register', function(req, res){
    res.render("register")
});

app.get('/secrets', function(req, res){
    if(req.isAuthenticated()){
        res.render('secrets');
    }
    else{
        res.redirect('/login');
    }
    
});

app.get('/logout', function(req, res){
    req.logOut();
    res.redirect('/login');
})
app.post("/register", (req, res)=>{

    User.register({username : req.body.username}, req.body.password, function(err, user){
        if(err){
            console.log(err)
            res.redirect('/register')
        }
        else{
            passport.authenticate("local")(req, res, function(){
                res.redirect('/secrets');
            })
        }
    })
    
    
})

app.post('/login', (req, res)=>{

    const user = new User({
        username : req.body.username,
        password : req.body.password
    })
    req.login(user, function(err){
        if(err){
           console.log(err)
        }
        else{
           passport.authenticate("local", { failureRedirect: '/login' })(req, res, function(){
                res.redirect('/secrets');
            }) 
        }
    })
})
app.listen(3000, (err)=>{
    if(err){console.log(err)}
    console.log('Server Listening to Port, 3000.')
});
