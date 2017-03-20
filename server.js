var express = require('express');
var app = express();
var fpath = require('path');
// var MongoClient = require('mongodb').MongoClient;
var mongoose = require("mongoose");
// console.log(mongoose);
var morgan = require("morgan");

var exfileUpload = require('express-fileupload');
app.use(exfileUpload());


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
    PHNO:Number,
    picFile:{type:String}
},{ strict: false })


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
    console.log(req.path);
   var path = req.path;
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
   var fname  = req.body.fileName;
switch(action) {
    case 'create':

        driverDetails.update(
            {picFile:data.picFile},
            function(err, numberAffected){
            });

        driverDetails.create(data, function (err) {
             if (err) {
                       console.log(err);
                       return handleError(err);
                          }else{
                     res.send({confirm : "created" });
                     console.log("created");

                        }

                      });


            
        break;
    case 'getData':
        console.log('app');
            var docsdata;
            console.log(driverDetails);
            driverDetails.find({}, function (err, docs) {
                docsdata = docs;
                console.log(docsdata);
                res.send({driverData: docsdata});
            });
         break;

    case 'getDetail':
        console.log(data);
        driverDetails.find({CARNUM:data}, function (err, docs) {
            docsdata = docs;
            console.log(docsdata);
            if(docsdata){
                res.send({driverDetail: docsdata[0]});
            }

        });
        break;
    case 'upLoad':
        console.log('upload');


        function decodeBase64Image(dataString) {
               var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};

        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');

        return response;
        };
        var imageBuffer = decodeBase64Image(data);
        var newPath = __dirname + "/app/images/" + fname;
        fs.writeFile(newPath, imageBuffer.data, function(err) {
                res.send({confirm : "uploaded" , filename:fname });
             });










       // console.log( data.file.path);
       //  var tempPath = data.file.path;
       //  console.log(tempPath);
       //  var targetPath = fpath.resolve('./app/images');
       //  console.log(targetPath);
       //
       //      fs.rename(tempPath, targetPath, function(err) {
       //          if (err) throw err;
       //          console.log("Upload completed!");
       //      });
       //  if (!data)
       //       return res.status(400).send('No files were uploaded.');
       //  console.log(data);
       //
       //  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
       // var sampleFile = data.sampleFile;
       //
       //  console.log('sampleFile');
       //  console.log(sampleFile.mv);
       //
       //  // Use the mv() method to place the file somewhere on your server
       //  sampleFile.mv('./app/images/filename.jpg', function(err) {
       //      if (err)
       //          return res.status(500).send(err);
       //
       //      res.send('File uploaded!');
       //  });


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