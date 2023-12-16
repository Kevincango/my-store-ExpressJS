const express = require('express');
const routerApi = require('./routes/index');
const app = express();
const port = 3000;
const os = require('os');

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

app.get('/new-route', (req, res) => {
  res.send('This is jus a new route test');
});

routerApi(app);





app.listen(port, ()=> {
  console.log(`http://${getLocalExternalIP()}:${port}`);
});


