const express = require('express')
const app = express()
const port = process.env.PORT || 3000
// const fs = require('fs')
const data = require('./data.js')
const bodyParser = require('body-parser')


app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.json({'data':data})
})

app.get('/:id', (req, res, next)=>{
    let id = req.params.id
    let result = data.filter(colony => +id === colony.id)
    if (result.length === 0){
        next(error)
    } else {
        res.send({'result':result[0]})
    }
})

app.use((err, req, res, next)=>{
    res.status(500).send({'error': 'No matching ID'})
})
app.use((req, res)=>{
    res.status(404).send({'error': 'Nothing here. Huh.'})
})

const listener = ()=> console.log(`Port Party on Port ${port}`)

app.listen(port, listener)
