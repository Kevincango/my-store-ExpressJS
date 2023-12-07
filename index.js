const os = require('os');
const express = require('express');
const app = express();
const port = 3000;

function getLocalExternalIP() {
  const networkInterfaces = os.networkInterfaces();
  for (let interface in networkInterfaces) {
    for (let interfaceInfo of networkInterfaces[interface]) {
      if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
        return interfaceInfo.address;
      }
    }
  }
  return null;
}


app.get('/', (req, res) => {
  res.send('Hello, my first server on Express');
});

app.get('/kevin', (req, res) => {
  res.json({
    name: 'Kevin',
    age: 25,
  });
});

app.listen(port, ()=> {
  console.log(`http://${getLocalExternalIP()}:${port}`);
});


