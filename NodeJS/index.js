/* Anni: Server & DB; Leah: Log in; Julia: SEO; Jannik: IP Addresses, Certificates, SSL, & Cors; */
require('./config/config');
require('./db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const ip = require('ip');
const fs = require('fs');
const https = require('https');

const logger = require('./logger');
const rtsIndex = require('./routes/index.router');
const productController = require('./controllers/productController.js'); // um router aus controller zu nutzen
const itemController = require('./controllers/itemController.js');

/*
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
*/

let credentials;

try {
    const privateKey = fs.readFileSync('/etc/nginx/ssl/key.key', 'utf-8');
    const certificate = fs.readFileSync('/etc/nginx/ssl/cert.crt', 'utf-8');
    credentials = {key: privateKey, cert: certificate};
} catch (e) {
    logger.log('error', e);
}

const app = express();

app.use(bodyParser.json());

/*
app.use(bodyParser.urlencoded({
    extended: false
}));  

app.use(cookieParser());

app.use(csrf({
  cookie:{
    key: 'XSRF Token',
    path: '/',
    httpOnly: false, 
   // secure: false, 
   // signed: false, 
   // maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

 app.use((req, res, next) => {
  const csrfTokenToSendToFrontEnd = req.csrfToken();
  console.log('csrfTokenToSendToFrontEnd: ', csrfTokenToSendToFrontEnd);
  res.cookie('XSRF-TOKEN', csrfTokenToSendToFrontEnd);
  next();
});

// here requires the api file with all your rest apis (not static paths)
// const routesAPI = require('./routes/index.router.js')(express, passport);
app.use('/api', rtsIndex);

app.use((err, req, res, next) => {
    if (err.code !== 'EBADCSRFTOKEN') {
      return next(err);
    }
    res.status(403).json({
      message: 'error'
    });
  });
*/

let ipAddress = ip.address();

if ((ipAddress.indexOf('141.62.75.61')) === -1) { ipAddress = 'http://localhost:4200'; }
else { ipAddress = 'https://webspec61.mi.hdm-stuttgart.de'; }

const corsOptions = {
  origin: ipAddress,
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(passport.initialize());
app.use('/api', rtsIndex);

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    let valErrors = [];
    Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
    res.status(422).send(valErrors)
  } else {
    logger.log('error', err);
  }
});

const httpsServer = https.createServer(credentials, app);

try {
  if (ipAddress.indexOf('localhost') === -1 ) {
    httpsServer.listen(3000, () => logger.log('info', 'Server started at port : 3000'));
  } else {
    app.listen(3000, () => logger.log('info', 'Server started at port : 3000'));
  }
} catch (e) {
  logger.log('error', e)
}

app.use('/products', productController);
app.use('/items', itemController);