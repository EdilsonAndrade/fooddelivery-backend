const express = require('express');
const UserController = require('./controllers/UserController');
const ActivationController = require('./controllers/ActivationController');
const AddressesController = require('./controllers/AddressesController');
const routes = express.Router();

routes.post('/sessions', UserController.store);
routes.get('/sessions', UserController.index);
routes.get('/activations', ActivationController.index);
routes.post('/activations', ActivationController.store);
routes.put('/sessions', UserController.update);
routes.post('/addresses', AddressesController.store);
routes.put('/addresses', AddressesController.update)
routes.get('/addresses', AddressesController.index);


module.exports = routes;
