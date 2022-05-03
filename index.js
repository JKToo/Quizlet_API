const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const res = require('express/lib/response')

const app = express()   //Calling express and saving as app

//Listen and if visited, we get response
app.get('/', (req,res) => {
    res.json('Testing API')
})

app.listen(PORT, () => console.log('server running on ' + PORT)) //Backend

