const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const res = require('express/lib/response')
const { contentDisposition } = require('express/lib/utils')

const content =[
    {
        name: 'quizlet',
        address: 'https://quizlet.com/ca/558645040/csc-chapter-7-flash-cards/',
        base: 'quizlet.com'
    },
]

const app = express()   //Calling express and saving as app
var answer = ""
var question = ""
const material = []
const t1 = []
const t2 = []
var i = 0

content.forEach(site => {
    axios.get(site.address)
    .then(response => {
    
        const html = response.data
        const $ = cheerio.load(html) //Allows to pick out elements

        var size = '.SetPageTerm-wordText'.length
        $('.SetPageTerm-wordText', html).each(function () {
                 question = $(this).text() 
                 var answer = ""
               t1.push(question)
                // $('a.SetPageTerm-definitionText', html).each(function () 
        
              
            $("a[class$='SetPageTerm-definitionText']").each(function (index){                
            
                answer = $(this).text()             
                t2.push(answer)
            })                        
           
                material.push({               
                    question: t1[i],                
                    answer: t2[i],     
                })            
                i++
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
