var unzip = require('./hands/unzip')

unzip('./tweets.zip', '/tmp', function(err, data){
  console.log(err, data)
})
