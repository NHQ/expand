var fs = require('fs')
var zlib = require('zlib')
var util = require('util')
var api = require('restify')
var Form = require('formidable')
var unzip = require('unzip2')
var fstream = require('fstream')
var path = __dirname + '/tweets.zip'

module.exports = function(i,o,c){
  var ws = fstream.Writer(o)
  fs.createReadStream(i).pipe(unzip.Parse()).pipe(ws)
  ws.on('close', function(){
    console.log('emd')
  })
}

module.exports(path, __dirname + '/twtr')

