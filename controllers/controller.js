const {User, UserDetail, Item, Transaction} = require('../models/index')
const bcryptjs = require('bcryptjs')
class Controller{
    static loginForm(req, res){
        res.render('loginForm.ejs')
    }
    static postLogin(req,res){
        const {email, password} = req.body
        User.findOne({where: {email: `${email}`}})
        .then(user =>{
            if(user){
            const isValidPassword = bcryptjs.compareSync(password,user.password)
            if(isValidPassword && user.role === true){
                return res.redirect('/adminHome')
            }else if(isValidPassword){
                return res.redirect(`/main/${user.id}`)
            } else {
                const error = "Invalid email or password"
                return res.redirect(`/login?error =${error}`)
            }
            }else{
            const error = "Username not found"
            return res.redirect(`/login?error =${error}`)
        }
        })
        .catch(err=>{
            res.send(err)
        })
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
    static main(req,res){
        let id = req.params.UserId
        Item.findAll()
        .then((result) =>{
            res.render('shop.ejs', {result,id})
        })
    }
    static userProfile(req,res){
        let id = req.params.UserId
        UserDetail.findOne({include: User, where: {id: `${+id}`}})
        .then((result) =>{
            // res.send(result)
            res.render('userProfile', {result})
        })
        .catch((err) =>{
            res.send(err)
        })
    }
    static transactionHistory(req,res){
        let id = req.params.UserId
        Transaction.findAll({include: Item, where:{UserId: `${+id}`}})
        .then((result) =>{
            res.render('transactionHistory.ejs',{result, id})
        })
        .catch((err) =>{
            res.send(err)
        })
    }
    static editUserDetail(req,res){
        let id = req.params.UserId
        UserDetail.findOne({include: User, where:{id: `${+id}`}})
        .then((result) =>{
            res.render('editUser.ejs', {result, id})
        })
        .catch((err) =>{
            res.send(err)
        })
    }
    static postEditUser(req,res){
        const {name, newPassword, email, profilePicture, password} = req.body
        const id = req.params.UserId
        let pass
        if(!newPassword){
            pass = password
        }else{
            pass = newPassword
        }
        UserDetail.findOne({where: {id: `${+id}`}})
        .then(() =>{
            UserDetail.set({name,profilePicture},{where:{id: `${+id}`}})
        })
        .then((result) =>{
            res.send(result)
            // User.set({email, password:pass}, {where: {UserId: `${+result.UserId}`}})
        })
        .then((result) =>{
            res.redirect(`/userDetail/${result.UserId}`)
        })
        .catch((err) =>{
            res.send(err)
        })
    }
    static buy(req,res){
        const {quantity} = req.body
        const UserId = req.params.UserId
        const ItemId = req.params.ItemId
        Item.findOne({where: {id: `${ItemId}`}})
        .then((result) =>{
            let total = (+quantity) * (+result.price)
            Transaction.create({quantity: (+quantity),total,ItemId, UserId})
            .then((result2)=>{
                res.redirect(`/confirm/${result2.id}`)
            })
        })
        
        .catch((err) =>{
            res.send(err)
        })
    }
    static confirm(req,res){
        let id = req.params.TransactionId
        Transaction.findOne({include: Item, where: {id: `${id}`}})
        .then((result) =>{
            res.render('confirmBuy.ejs', {result})
        })
        .catch((err) =>{
            res.send(err)
        })
    }
    static cancelTransaction(req,res){
        let id = req.params.TransactionId
        let userId = req.params.UserId
        Transaction.destroy({where: {id: `${+id}`}})
        .then(()=>{
            res.redirect(`/main/${userId}`)
        })
        .catch((err) =>{
            res.send(err)
        })
    }
    static adminHome(req,res){
        Item.findAll()
        .then((result) =>{

        })
        .catch((err) =>{
            res.render(err)
        })
    }
    static postConfirm(req,res){
        let id = req.params.TransactionId
        Transaction.findOne({where: {id: `${id}`}})
        .then((result) =>{
            res.redirect(`/main/${result.UserId}`)
        })
        .catch((err) =>{
            res.send(err)
        })
    }
}

module.exports = Controller