const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    //res response 回应
    res.send('express 开启的网页')
})
app.listen(3002)

// const express = require('express')
// const app = express()
 
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })
 
// app.listen(3000)