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

})

app.delete('/favourites/', async function(req, res) {
    const deleteBook = await favourites.deleteById(req.body.id)

    res.status(deleteBook).send();
})

app.post('/favourites/create', async function(req, res) {
    
    const create = await favourites.create(req.body.id,req.body.title,req.body.author,req.body.isbn)

    res.status(create).send();
})


app.get('/list/', async function(req, res) {
    let favouriteBooks = await favourites.findAll();

    res.render('books-list.handlebars',
    {
        title: "Book List",
        books:favouriteBooks
    })
})


app.get('/edit/:id', async function(req, res) {

    const book = await favourites.findById(req.params.id.toString());
    
    if(book.id==-1){
        res.status(409).send('Id Not Found')
        return
    }
    res.render('book-edit.handlebars',book)

})

app.post('/edit/', async function(req, res) {

    console.log(req.body.id)
    const updated = await favourites.update(req.body.id,req.body.title,req.body.author,req.body.review)
    
    res.status(200).send("ok");
})  


app.listen(port, () => console.log(`🚀🚀🚀🚀🚀server is running on port 8080🚀🚀🚀`));