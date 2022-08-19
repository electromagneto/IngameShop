const routes = require('express').Router()
const Controller = require('../controllers/controller')

routes.get('/', Controller.home)
routes.get('/main/:UserId',Controller.main)
routes.get('/register',Controller.registerForm)
routes.post('/register', Controller.postRegister)
routes.get('/login', Controller.loginForm)
routes.post('/login', Controller.postLogin)
routes.get('/logout', Controller.loginForm)
routes.get('/userDetail/:UserId', Controller.userProfile)
routes.get('/transactionHistory/:UserId', Controller.transactionHistory)
routes.post('/buy/:UserId/:ItemId', Controller.buy)
routes.get('confirm/:TransactionId',)
routes.post('confirm/:TransactionId',)
routes.get('/adminHome',)

module.exports = routes