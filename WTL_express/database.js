

var express = require("express");
var bodyParser = require("body-parser");
var axios = require("axios");
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection error:"));
db.once('open', function () {
    console.log("Connected to MongoDB");
});
var app = express();

app.use(bodyParser.json());
app.use(express.static('public', {
    // Specify the default MIME type for JavaScript files
    setHeaders: function(res, path, stat) {
        if (path.endsWith('.js')) {
            res.set('Content-Type', 'text/javascript');
        }
    }
}));
app.use(bodyParser.urlencoded({
    extended: true
}));

// Define a Mongoose schema for the data
const detailsSchema = new mongoose.Schema({
    username: String,
    age: Number,
    password: String,
    phone: String
});

// Define a Mongoose model based on the schema
const Details = mongoose.model('Details', detailsSchema);

app.post('/signup', function (req, res) {
    var username = req.body.username;
    var age = req.body.age;
    var password = req.body.password;
    var phone = req.body.phone;
    
    // Create a new Details document
    var newDetails = new Details({
        username: username,
        age: age,
        password: password,
        phone: phone
    });
    console.log("Data Called")
    // Save the new document to the database
    newDetails.save().then(
        ()=>{
            console.log("Record inserted successfully:", newDetails);
            return res.redirect('/chatwindow.html');
        }
    )
    .catch(
        (err)=>{
            console.log(err);
        }
    )

});
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log('Received username:', username);
    console.log('Received password:', password);

    // Find a user in the database using Mongoose model
    Details.findOne({ username: username, password: password })
        .then(user => {
            if (user) {
                // Login successful
                console.log('Login successful for user:', user);
                return res.redirect('/chatwindow.html');
            } else {
                // Login unsuccessful
                console.log('Login unsuccessful. Invalid username or password.');
                return res.status(401).json({ success: false, message: 'Invalid username or password' });
            }
        })
        .catch(err => {
            console.error('Error finding user:', err);
            return res.status(500).json({ success: false, message: 'Error finding user' });
        });
});





app.get('/public/', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('/public/index.html');
});

var server = app.listen(5500, function () {
    console.log("Server listening at port 5500");
});

// Event listener for HTTP server "error" event.
server.on("error", function (error) {
    console.error("Server error:", error);
});

// Event listener for HTTP server "close" event.
server.on("close", function () {
    console.log("Server closed");
});

