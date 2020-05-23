const express = require('express')
const app = express()
app.use('/static', express.static(__dirname + '/public'));
const port = 3000;
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})
app.get('/read_me/:id', (request, response) => {
    response.sendFile(__dirname + '/read_me.html')
})
app.get('/create_article', (request, response) => {
    response.sendFile(__dirname + '/create_article.html')
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})
