const Application = require('./app/server');
require('dotenv').config();
new Application(process.env.PORT || 3000);