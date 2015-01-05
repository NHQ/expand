module.exports = function(res, res){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:11001')
  res.setHeader('Access-Control-Expose-Method', 'GET,PUT,POST,DELETE')
  res.setHeader('Access-Control-Allow-Credentials', true)
}
