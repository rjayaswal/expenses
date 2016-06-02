var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require("path");
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var logged_user_email = 'gaurav@test.com';
var logged_user_password = 'test123';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect('mongodb://guest:test123@ds045454.mlab.com:45454/user');

var schema = new Schema({
    username: String,
    desc: String,
    amount: Number,
    tx_date: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
});

//expense Item model
var Item = mongoose.model('sys_expense', schema);



app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/login.html');
});

app.get('/expenses', function(req, res) {
    Item.find({
        'username': logged_user_email
    }, function(err, rows) {
        // rowss is an array
        res.send(rows);
    });

});

app.post('/home', function(req, res) {
    var email = req.body.email;
    var pwd = req.body.pwd;
  if (email == logged_user_email && pwd == logged_user_password) {
    console.log("login details:" + email + pwd);
    res.sendFile(__dirname + '/public/home.html');
  }
  else
    res.send("Login Failed");

});

app.get('/home', function(req, res) {
    var email = req.body.email;
    var pwd = req.body.pwd;
    res.sendFile(__dirname + '/public/home.html');

});

app.post('/add', function(req, res) {
    var item = req.body.row;
    //console.log('adding item ' + JSON.stringify(item));

    var eRecord = new Item(item);
    eRecord.save(function(err) {
        if (err) {
            console.log('Could not save item in DB');
        } else {
            console.log('item got saved in db ' + JSON.stringify(eRecord));
            res.end();
        }
    });


});


app.listen(9000, function() {
    console.log('listening on port ' + 9000);
});