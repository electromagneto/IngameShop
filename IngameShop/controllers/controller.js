const { User, Profile, Item, Transaction } = require('../models')

class Controller{
    static loginForm(req, res){
        res.render('loginForm.ejs');
    }
    static postLogin(req,res){
        const {email, password} = req.body;
        User.findOne({where: {email: `${email}`}});
    }
    static registerForm(req, res){
        res.render('registerForm.ejs')
    }
    static postRegister(req,res){
        const {name, password, email, profilePicture} = req.body;
        User.create({email,password})
        .then((result) =>{
            Profile.create({name, profilePicture, UserId: result.id})
        })
        .then(() =>{
            res.redirect('/login');
        })
        .catch((err) =>{
            res.send(err);
        });
    }

    static home(req,res){
        Item.findAll()
        .then((result) =>{
            res.render('home.ejs', {result});
        })
        .catch((err) =>{
            res.send(err);
        });
    }
}

module.exports = Controller