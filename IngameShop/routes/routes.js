'use strict';

const routes = require('express').Router()
const Controller = require('../controllers/controller')

routes.get('/', Controller.home);
routes.get('/:UserId', Controller.userById);
routes.get('/register',Controller.registerForm);
routes.post('/register', Controller.postRegister);
routes.get('/login', Controller.loginForm);
routes.post('/login', Controller.postLogin);
routes.get('/logout');
routes.get('/profile/:UserId', Controller.profileById);

module.exports = routes