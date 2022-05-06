const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const res = require('express/lib/response')
const { contentDisposition } = require('express/lib/utils')

const content =[
    {
        name: 'quizlet',
        address: 'https://quizlet.com/124679225/elementary-chinese-lesson-6-dialogue-vocabulary-1-flash-cards/',
        base: 'quizlet.com'
    },
]

const app = express()   //Calling express and saving as app
var answer = ""
var question = ""
const material = []

var count = 0

content.forEach(site => {
    axios.get(site.address)
    .then(response => {
        
        const html = response.data
        const $ = cheerio.load(html) //Allows to pick out elements
        // console.log('a.SetPageTerm-definitionText'.length)
        // console.log('a.SetPageTerm-wordText'.length)
        var size = '.SetPageTerm-wordText'.length
        $('.SetPageTerm-wordText', html).each(function () {
                 question = $(this).text() 
                 var answer = ""
               
                // $('a.SetPageTerm-definitionText', html).each(function () 
        
                
            $("span[class$='TermText notranslate lang-zh-TW']").each(function (index){
                
                    answer = $(this).text()                      
                   
                material.push({               
                    question: question,                
                    answer: answer,     
                }) 
                
            })                        
           
               
         })  
                 
               
    })

})

//Listen and if visited, we get response
app.get('/', (req,res) => {
    res.json('Testing API')
})

app.get('/quiz', (req, res) => {

  res.json(material)

})

app.listen(PORT, () => console.log('server running on ' + PORT)) //Backend
  //     var company = $(this).text()
  //         company = $(this).
    //         $('h2:contains("")', html).each(function () {
    //         const title = $(this).text() 
    
            // var type = $(this).parents('.SetPageTerms-term').children('.TermText notranslate lang-en').first().text()
               
                // var question = $(this)("a.SetPageTerm-wordText")