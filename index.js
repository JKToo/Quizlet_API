const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const res = require('express/lib/response')
const { contentDisposition } = require('express/lib/utils')


const app = express()   //Calling express and saving as app

const articles = []


//Listen and if visited, we get response
app.get('/', (req,res) => {
    res.json('Testing API')
})

app.get('/news', (req, res) => {
    axios.get('https://www.theguardian.com/environment/climate-crisis')  //Grabs HTML
    .then((response) => {
        const html = response.data
       const $ = cheerio.load(html) //Allows to pick out elements

       $('a:contains("climate")', html).each(function () {
           const title = $(this).text()
           const url = $(this).attr('href')

           articles.push({
               title,
               url
           })
       })
       res.json(articles)
    }).catch((err) => console.log(err))
})

app.listen(PORT, () => console.log('server running on ' + PORT)) //Backend

