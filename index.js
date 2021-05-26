const express = require('express')
const path = require('path')
const favourites = require('./models/FavouriteBook')
const app = express()
const port = 8080

var exphbs = require('express-handlebars')


app.use('/static/', express.static(__dirname + '/public'))

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: false }))

app.use(express.json())







app.get('/', function(req, res) {
    let options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('index.html', options, function(err) {
        console.log(err)
    })

    // res.render('example.handlebars',
    // {
    //     title: "okkkk"
    // })
})

app.delete('/favourites/', async function(req, res) {

    const deleteBook = await favourites.deleteById(req.body.id)
    
    res.status(201).send("ok");
})

app.post('/favourites/create', async function(req, res) {
    console.log(req.body)
    const create = await favourites.create(req.body.id,req.body.title,req.body.author)
    
    res.status(201).send(create.toString());
})

app.get('/favourites/', async function(req, res) {
    // let favouriteBooks = await favourites.findAll();

    let create = favourites.findById(26);
    console.log(create + "dd")

    // res.render('example.handlebars',
    // {
    //     title: "okkkk"
    // })
})


app.get('/list/', async function(req, res) {
    let favouriteBooks = await favourites.findAll();

    res.render('books-list.handlebars',
    {
        title: "Book List",
        books:favouriteBooks
    })
})


app.listen(port, () => console.log(`🚀🚀🚀🚀🚀server is running on port 8080🚀🚀🚀`));