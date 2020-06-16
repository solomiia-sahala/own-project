const express = require('express')
const app = express()
app.use('/static', express.static(__dirname + '/public'));
const port = process.env.PORT || 3000;
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})
app.get('/read_me/:id', (request, response) => {
    response.sendFile(__dirname + '/read_me.html')
})
app.get('/create_article', (request, response) => {
    response.sendFile(__dirname + '/create_article.html')
})
app.get('/sing_up', (request, response) => {
    response.sendFile(__dirname + '/sing_up.html')
})

app.get('/user_profile/:id', (request, response) => {
    response.sendFile(__dirname + '/my_profile.html')
})
app.get('/user_articles/:id', (request, response) => {
    response.sendFile(__dirname + '/user_articles.html')
})

app.get('/help', (request, response) => {
    response.sendFile(__dirname + '/help.html')
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})
