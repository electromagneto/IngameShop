const express = require('express')
const app = express()
const routes = require('./routes/routes')
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(routes)

app.listen(port, (err, res) =>{
    if(err){
        console.log(err)
    }else{
        console.log("App In-game Currency Shop is at port 3000")
    }
})