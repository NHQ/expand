var fs = require('fs')
var http = require('http')

var router = require('router')
var ecstatic = require('ecstatic')

var zlib = require('zlib')
var util = require('util')
var Form = require('formidable')
var unzip = require('unzip')
var unzipStream = require('./hands/unzipStream')
var handleCors = require('./hands/allowCORS')
//var router = require('./routes')
var next = function(){}
var route = new router
var files = ecstatic({
  root: __dirname + '/public',
  autoIndex: true
})

var server = http.createServer(
  function(req, res){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:11001')
    res.setHeader('Access-Control-Expose-Method', 'GET,PUT,POST,DELETE')
    res.setHeader('Access-Control-Allow-Credentials', true)
    var url = req.url
    route(req, res, function(req, res){
      console.log(req)
//      req.url = url
//      files(req, res)
    })    
  }
)

route.post('/upload', function(req, res, next){
  unzipStream(req)
  var form = new Form.IncomingForm()
  var path = ''
  form.uploadDir = __dirname + '/tmp'
  form.keepExtensions = true
  form.parse(req, function(err, fields, file){
    console.log(file)
    //path = file.file.domain.path
    res.writeHead(200)
    res.end(util.inspect({field: fields, files: file}))
  })
  form.onPart = function(part){
    unzipStream(part)
  }
  form.on('end', function(){
//    var f = fs.createReadStream(path)
//    f.on('error', function(err){
//      console.log(err)
//    }).on('close', function(){
//     console.log('ended')
//    })
  })
})

server.listen(11003)
