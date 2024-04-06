var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/Database');
var db = mongoose.connection;
db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

// Define a mongoose schema for user data
var userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    phno: String,
    gender: String,
    password: String
});

// Create a mongoose model
var User = mongoose.model('User', userSchema);

app.post("/signup", (req, res) => {
    var name = req.body.name;
    var age = req.body.age;
    var email = req.body.email;
    var phno = req.body.phno;
    var gender = req.body.gender;
    var password = req.body.password;

    // Create a new user instance
    var newUser = new User({
        name: name,
        age: age,
        email: email,
        phno: phno,
        gender: gender,
        password: password
    });

    // Save the user to the database
    newUser.save(function(err) {
        if (err) {
            console.error(err);
            res.status(500).send("Error saving to database");
        } else {
            console.log("User saved successfully");
            res.redirect('signup_successful.html'); // Redirect upon successful save
        }
    });
});

app.get("/", (req, res) => {
    res.set({
        "Allow-acces-Allow-Origin": '*'
    })
    return res.redirect('index.html')
});

app.listen(3009, () => {
    console.log("Listening on port 3009");
});
