const http = require('http');
const fs = require('fs');
const path = require('path');
let body = '';

const server = http.createServer((request, response) => {

  const { url } = request;
  if (url === '/upload') {
    request.on('data', (chunk) => {
      body = chunk.toString();
    }).on('end', () => {
      response.on('error', (err) => {
        console.error(err);
      });
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(body);
      response.end();
    });
  }

  let filePath = '../client-side' + url;
  if (filePath == '../client-side/') {
    filePath = '../client-side/todoList.html';
  }
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css'
  };
  const contentType = mimeTypes[extname] || 'application/octet-stream';
  fs.readFile(filePath, function (error, content) {
    if (error) {
      if (error.code == 'ENOENT') {
        fs.readFile('./404.html', function (content) {
          response.writeHead(404);
          response.end('Not Found');
        });
      }
      else {
        response.writeHead(500);
        response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
      }
    }
    else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });
});
server.listen(8080);
console.log('Server running at http://127.0.0.1:8080/');