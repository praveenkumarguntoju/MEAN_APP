var express = require('express');
var app = express();
// var MongoClient = require('mongodb').MongoClient;
var mongoose = require("mongoose");
// console.log(mongoose);
var morgan = require("morgan");
var fs   = require("fs");
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


// mangoose http._connectionListener(socket);

mongoose.connect('mongodb://127.0.0.1:27017/my_database');

 var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', function() {
  // we're connected!
  console.log("connection succesful");
});

// Connect to the db
//  MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
//     if(!err) {
//         console.log("We are connected");
//         db.createCollection("DriverDetail", { capped : true, autoIndexId : true, size :
//             6142800, max : 10000 } );
//         return db;
//       }
// });

// var db = MongoClient.connection;




var Schema = mongoose.Schema;
//
// var blogSchema = new Schema({
//   title:  String,
//   author: String,
//   description:   String,
//   hidden: Boolean
//
// });
//
var driverSchema = new Schema({
    DRVFNAME:String,
    DRVLNAME:String,
    DRVAGE:Number,
    CARNUM:{
        type:String,
        unique:true
    },
    CARNAME:String,
    ADDRS1:String,
    ADDRS2:String,
    CITY:String,
    ZIPCODE:Number,
    COUNTRY:String,
    PHNO:Number
})


// var BookDetail = mongoose.model('BookDetail',blogSchema);
//   var docsdata ;
//  // BookDetail.find({}, function (err, docs) {
//  //    console.log(docs);
//  // });
// //
//
var driverDetails = mongoose.model('driverDetails',driverSchema);





var file = fs.createWriteStream(__dirname + "/acess.log", {flags :'a'});
app.use(morgan('combined',{stream:file}));

app.get('*', function (req, res) {
   if(req.path == '/'){
     res.sendFile( __dirname + "/" + "index.html" );
   }else
   {
     res.sendFile( __dirname + req.path);
   }
});
app.post('/app',function (req, res) {
   console.log(req.body)
   var action = req.body.action;
   var data   = req.body.data;
switch(action) {
    case 'create':
        driverDetails.create(data, function (err) {
                 if (err) {
                       console.log(err);
                     res.send({message :err });
                       }
                      });
           console.log("created");
            var docsdata;
        // driverDetails.find({}, function (err, docs) {
        //               docsdata = docs;
        //               res.send({confirm : "created",createdData :docsdata });
        //           });
            
        break;
    case n:
        
        break;
    default:
       
}
})







// app.post('/create', function(req, res) {
//       debugger;
//       console.log("called create");

//     res.send(user_id + ' ' + token + ' ' + geo);
// });


var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})