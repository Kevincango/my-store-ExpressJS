const express = require('express');
const routerApi = require('./routes/index');
const { logErrors, errorHandler, boomErrorsHandler, ormErrorHandler} = require('./middlewares/error.handlers');
const app = express();
const port = process.env.PORT || 3000;
const os = require('os');
const cors = require('cors');
app.use(express.json());

const whiteList = ['http://127.0.0.1:5500'];
const options = {
  origin: (origin, callback) => {
    if(whiteList.includes(origin) || !whiteList.includes(origin)){
      callback(null, true);
    }else{
      callback(new Error('Connection not allowed!'));
    }
  }
}
app.use(cors(options));

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

app.get('/api', (req, res) => {
  res.send('Hello, my first server on Express');
});

app.get('/api/new-route', (req, res) => {
  res.send('This is jus a new route test');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorsHandler);
app.use(errorHandler);


app.listen(port, ()=> {
  console.log(`http://${getLocalExternalIP()}:${port}`);
});


