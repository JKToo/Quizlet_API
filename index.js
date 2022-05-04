const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const res = require('express/lib/response')
const { contentDisposition } = require('express/lib/utils')

const newspapers =[
    {
        name: 'indeed',
        address: 'https://www.indeed.com/jobs?q=software%20engineer%20intern&from=googlesl&vjk=44a0d1e66ce41202',
        base: 'indeed.com'
    },
    // {
    //     name: 'glassdoor',
    //     address: 'https://www.glassdoor.com/Job/software-engineer-intern-jobs-SRCH_KO0,24.htm',
    //     base: ''
    // },
]

const app = express()   //Calling express and saving as app

const articles = []

const jobs = "job "
var replaced = jobs.split(' ').join('_')
newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html) //Allows to pick out elements
        $('a:contains("Internship")', html).each(function () {
            const url = $(this).attr('href')   
           
            $('h2:contains("")', html).each(function () {
            const title = $(this).text() 
                      
            articles.push({
                title,
                url: newspaper.base + url,
                source: newspaper.name,
            })
        })
    })
    })
})

//Listen and if visited, we get response
app.get('/', (req,res) => {
    res.json('Testing API')
})

app.get('/news', (req, res) => {

  res.json(articles)

})

app.listen(PORT, () => console.log('server running on ' + PORT)) //Backend

