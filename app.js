// DANS LE FICHIER package.json
// Start => lance l'application
// dev => lance nodemon

/**
 * Job-dating Application main file
 */

const express = require('express')
const app = express()
const connectdb = require('./src/db/dbconnect')
const parser = require('body-parser');

const port = 5000

app.listen(port, () => {
    console.log('nodeJS API listering on port ' + port)
        // DB Connect
    connectdb()
        .then(() => {
            console.log('Succefull connected to MongoDB!')
        })
        .catch((err) => {
            console.log(`Oooops, something went wrong ....${err}`)
        })
})

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.get('/', (req, res) => {
    res.send('<h1>Job Dating</h1>')
})

const crud = require('./src/api/api.crud')

app.post('/api/create', crud.create)

app.get('/api/:model', crud.getAll)

app.get('/api/:model/:id', crud.getOne)

app.put('/api/update/:id', crud.update)

app.delete('/api/delete/:model/:id', crud.delete)