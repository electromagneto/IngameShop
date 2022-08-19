const {User, UserDetail, Item, Transaction} = require('../models/index')

class Controller{
    static loginForm(req, res){
        res.render('loginForm.ejs')
    }
    static postLogin(req,res){
        const {email, password} = req.body
        User.findOne({where: {email: `${email}`}})
    }
    static registerForm(req, res){
        res.render('registerForm.ejs')
    }
    static postRegister(req,res){
        const {name, password, email, profilePicture} = req.body
        User.create({email,password})
        .then((result) =>{
            UserDetail.create({name, profilePicture, UserId: result.id})
        })
        .then(() =>{
            res.redirect('/login')
        })
        .catch((err) =>{
            res.send(err)
        })
    }
    static home(req,res){
        Item.findAll()
        .then((result) =>{
            res.render('home.ejs', {result})
        })
        .catch((err) =>{
            res.send(err)
        })
    }
}

module.exports = Controller