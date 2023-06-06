//T not get cors issues
const cors = require("cors")
const fruits = require('./fruits.json')
const express = require("express")
const app = express()
// const port = 3000

// const logger = require("./logger")
// app.use(logger)

//adding express json (can be used anywhere)
app.use('/fruits',express.json())

//creating main page
app.get('/', (request,response) => {
    response.send("Hello Fruit API")
})

app.get('/fruits', (request,response) => {
    response.send(fruits)
})
app.get('/fruits/:name', (request,response) => {
    // response.send(`Return a fruit with name of ${request.params.name}`)
    const name = request.params.name.toLowerCase()
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == name)
    if(fruit == undefined){
        //Do something
        response.status(404).send()
    }else{
        response.send(fruit)
    }
})
//create fruit function
app.post('/fruits', (request,response) => {
    //check if fruit is in json
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == request.body.name.toLowerCase())
    if(fruit !== undefined){
        response.status(409).send()
    }else{
         //Add the fruit to JSON
         fruits.push(request.body)
         response.status(201).send(request.body)
    }
//     const fruit = request.body
//     console.log(fruit)
//     //Add the fruit
//     response.send("New Fruit Created")
})

app.delete('/fruits/:name', (request,response) => {
    //see if it exists 
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == request.params.name.toLowerCase())
    if(fruit == undefined){
   //can not delete nothing
   response.status(404).send()
    }else{
        //Delete part
        const indexToDelete = fruits.indexOf(fruit)
        fruits.splice(indexToDelete, 1)
        //To Do
        response.status(204).send()
        //optional fruits.splice(fruits.indexOf(fruit), 1)
    }
 
})

// app.listen(port, () => {
//     console.log(`Fruity Api listening on port ${port}`)
// })

module.exports = app