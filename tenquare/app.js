const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
app = express()
const router = require(path.join(__dirname,"./router"))

nunjucks.configure(path.join(__dirname,"./view"),{
    autoexcape:true,
    express:app,
    watch:true
})

app.use("/public/",express.static(path.join(__dirname,"./public/")))

app.use(router)
// app.get('/',(req,res,next)=>{
//     // res.send('hallo word')
//     res.render('index.html',{
//         foo:'bar'
//     })
// })
app.listen(3000,()=>{
    console.log("开启成功")
    console.log("http://localhost:3000")

})