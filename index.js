var fs = require('fs')
var zlib = require('zlib')
var util = require('util')
var api = require('restify')
var Form = require('formidable')
var unzip = require('unzip')
var unzipStream = require('./hands/unzipStream')
//var router = require('./routes')
var server = api.createServer()
server.use(api.CORS())
server.use(api.queryParser())

server.post('/upload', function(req, res, next){
  var form = new Form.IncomingForm()
  var path = ''
  form.uploadDir = __dirname + '/tmp'
  form.keepExtensions = true
  form.parse(req, function(err, fields, file){
    console.log(file)
    //path = file.file.domain.path
    res.send(200, util.inspect({field: fields, files: file}))
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

server.get('/', function(req, res, next){
 // res.writeHead(200, {'Content-Type' : 'text/html'})
  fs.createReadStream('./public/index.html').pipe(res)
//  next()
})

server.listen(11001)
