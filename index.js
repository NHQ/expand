var fs = require('fs')
var zlib = require('zlib')
var util = require('util')
var api = require('restify')
var Form = require('formidable')
var unzip = require('unzip')

//var router = require('./routes')
var server = api.createServer()

server.use(api.CORS())
server.use(api.queryParser())

server.post('/upload', function(req, res, next){
  var form = new Form.IncomingForm()
  var path = ''
  form.uploadDir = __dirname + '/data/uploads'
  form.keepExtensions = true
  form.parse(req, function(err, fields, file){
    console.log(file)
    path = file.file.domain.path
    res.send(200, util.inspect({field: fields, files: file}))
  })
  form.on('end', function(){
    console.log('unzip')
    var f =fs.createReadStream(path).pipe(unzip.Extract({
      path: __dirname + 'data' 
    })).on('error', function(err){
      console.log(err)
    }).on('close', function(){
      console.log('ended')
    })
    f.on('error', function(err){console.log(err)})
    /*
    zlib.unzip(path, function(err, dir){
      if(err) console.log(err)
      else{
              
      }
      console.log(err, util.inspect({dir: dir}))
    })
    */
  })
})

server.get('/', function(req, res, next){
 // res.writeHead(200, {'Content-Type' : 'text/html'})
  fs.createReadStream('./public/index.html').pipe(res)
//  next()
})

server.listen(11001)
