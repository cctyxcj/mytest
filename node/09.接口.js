const express = require('express')

const bodyParser = require('body-parser')

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username == "123" && password == "123") {
        res.send({
            username,
            password,
            content: '成功'
        })
    } else {
        res.send({
            content: '失败'
        })
    }
})

app.listen(8847)