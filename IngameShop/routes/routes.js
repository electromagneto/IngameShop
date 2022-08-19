const routes = require('express').Router()
const Controller = require('../controllers/controller')

routes.get('/', Controller.home)
routes.get('/:UserId')
routes.get('/register',Controller.registerForm)
routes.post('/register', Controller.postRegister)
routes.get('/login', Controller.loginForm)
routes.post('/login', Controller.postLogin)
routes.get('/logout')
routes.get('/userDetail/:UserId')

module.exports = routes