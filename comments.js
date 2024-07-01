// Create web server that listens on port 3000 and serves up a static html page
// When the user visits the page, they should be able to view all comments that have been posted
// When the user submits a new comment, the page should update with the new comment
// Use the comments array in comments.js to store and retrieve comments

const http = require('http');
const fs = require('fs');
const comments = require('./comments');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile('./index.html', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404 Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url === '/comments') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(comments));
  } else if (req.url === '/new-comment' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const newComment = JSON.parse(body);
      comments.push(newComment);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(comments));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('404 Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
