const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('./cors.js')
var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/";
var url ="mongodb://heroku_w6x1nwgt:s6dnouvvbgao55prlurd9tj9lh@ds053080.mlab.com:53080/heroku_w6x1nwgt"
let products = "";

app.use(cors.permission)

app.get("/", (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;

    var dbo = db.db("heroku_w6x1nwgt");
    dbo.collection("Products").find({}).toArray(function (err, result) {
      if (err) throw err;

      console.log("db donected");
      res.json(result);
      db.close();
    });

  });
});

app.get('/add', (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;

    console.log("db donected");
    var dbo = db.db("heroku_w6x1nwgt");

    id = parseInt(req.query.id, 10);
    console.log(typeof parseInt(req.query.id));
    console.log(id);

    dbo.collection("Products").findOne({ id: id }, function (err, result) {
      if (err) throw err;

      console.log(JSON.stringify(result) );
      res.json(result);
      db.close();
    });
  });


  console.log('hello');

});


const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});