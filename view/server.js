const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((req, res) => {
  const file = req.url === '/' ? 'index.html' : req.url
  const allowedFiles = ['.html', '.css', '.js']
  const allowed = allowedFiles.find(item => item === path.extname(file))
  if (!allowed) return
  const content = fs.readFileSync(path.join(__dirname, file))
  return res.end(content)
}).listen(8080)
