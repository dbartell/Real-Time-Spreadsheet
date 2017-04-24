/**
 * Module dependencies.
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const chalk = require('chalk');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env.example' });

/**
 * Controllers (route handlers).
 */
const shippingController = require('./controllers/shipping');

/**
 * Create Express server.
 */
const app = express();


/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 4949);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


/**
 * Primary app routes.
 */
app.put('/api/shipping', shippingController.getPostage);
app.put('/api/sheet/:id', shippingController.updateRow)
/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env')); 
});

module.exports = app;
