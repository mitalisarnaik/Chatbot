var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });
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

    // Save the new document to the database
    newDetails.save(function (err) {
        if (err) {
            console.error("Error saving data to database:", err);
            return res.status(500).send("Error saving data to database");
        } else {
            console.log("Record inserted successfully:", newDetails);
            return res.redirect('/main.html'); // Redirect to main.html upon successful insertion
        }
    });
});

app.get('/', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('signup.html');
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

