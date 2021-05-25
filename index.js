const express = require('express')
const path = require('path')
const app = express()
const port = 8080

app.use('/static/', express.static(__dirname + '/public'))

app.use(express.urlencoded({extended:false}))

app.use(express.json())

app.get('/',function (req, res){
    let options = {
        root: path.join(__dirname,'public')
    }

    res.sendFile('index.html',options,function (err){
        console.log(err)
    })
})

app.listen(port, () => console.log(`🚀🚀🚀🚀🚀server is running on port 8080🚀🚀🚀`));