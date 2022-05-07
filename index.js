const PORT = 3000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const res = require('express/lib/response')
const { contentDisposition } = require('express/lib/utils')

const content =[
    {
        name: 'quizlet',
        address: 'https://quizlet.com/ca/558645040/csc-chapter-7-flash-cards/',
        base: 'https://quizlet.com/'
    },
]

const app = express()   //Calling express and saving as app



//Listen and if visited, we get response
app.get('/', (req,res) => {
    res.json('Testing API')
})


//Passing ID
app.get('/quiz/:quizURL(*)', async(req, res) => {

    const quizletId = req.params.quizURL
    
    for(var i = 0; i < content.length; i++){
        var temp = content[i]
    }

    const url = temp.base + quizletId
    // console.log(url)
    // console.log(content[0].address)

    content[0].address = url
    console.log(content[0].address)

    

    axios.get(content[0].address)
    .then(response => {
    
        const html = response.data
        const $ = cheerio.load(html) //Allows to pick out elements
        var questionArr = []
        var answerArr = []
        var quizletArr = []
        var questions
        var answers
        var j = 0
        $('.SetPageTerm-wordText', html).each(function () {
                 questions = $(this).text() 
                 questionArr.push(questions)
                // $('a.SetPageTerm-definitionText', html).each(function () 
        
              
            $("a[class$='SetPageTerm-definitionText']").each(function (index){                
            
                answers = $(this).text()             
                answerArr.push(answers)
            })                        
           
            quizletArr.push({               
                    question: questionArr[j],                
                    answer: answerArr[j],     
                })            
                j++
                

         })  
               
    res.json(quizletArr)
            
    })

})


app.listen(PORT, () => console.log('server running on ' + PORT)) //Backend
