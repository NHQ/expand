var html = require('hyperscript')
var fileStream = require('filereader-stream')
var http = require('hyperquest')
//var drop = require('drag-and-drop-files')

var form = html('form', {
  action: '/upload'
}, html('input', {
  type: 'file',
  name: 'file'
}), html('input', {
  type: 'submit',
  value: 'select a small'
}))

form.addEventListener('change', function(e){
  console.log(e)
  var file = e.target.files[0]
  var reader = new FileReader
  reader.readAsArrayBuffer(file)
  reader.onload  = function(e){
    var buf = Buffer._augment(new Uint8Array(e.target.result))
    var post = http.post('http://localhost:11003/upload')
    fileStream(file).pipe(post)
  }
  var post = http.post('http://localhost:11003/upload')
  fileStream(file).pipe(post)

})
document.body.appendChild(form)
