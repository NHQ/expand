var fs = require('fs')
var unzip = require('unzip2')
var fstream = require('fstream')
var path = require('path')
var concat = require('concat-stream')

module.exports = function(i,o,c){
  //var ws = fstream.Writer(o)
  var uz = unzip.Parse()
  var f = fs.createReadStream(i)
  f.pipe(uz)//.pipe(ws)
  var flag = 0
  var profile = {}
  profile.tweets = []
  uz.on('entry', function(e){
    if(e.path.match('data/js/')){
      if(e.path.match('data/js/tweets/')){
        // JSONify 
        flag++
        e.pipe(concat(function(data){
          data = data.toString()
          var a  = data.slice(data.indexOf('['))
          profile.tweets.push(JSON.parse(a))
          --flag
        }))
      }
      else if(path.basename(e.path)=='user_details.js'){
        flag++
        e.pipe(concat(function(data){
          var a = data.toString().slice(data.toString().indexOf('{'))
          profile.user = JSON.parse(a)
          --flag
        }))        
      }
    }
    else{
      e.autodrain()
    }
  })
  f.on('error', function(err){
    c(err, null)
  })
  uz.on('close', function(){
    c(null, profile)
  })
}
