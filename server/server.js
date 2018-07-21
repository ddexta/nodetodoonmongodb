const {mongoose}=require('./db/mongoose')
const express=require('express')
const bodyParser=require('body-parser')


const{Todo}=require('./modules/todo')
const{User}=require('./modules/user')

const app=express()
app.use(bodyParser.json())


app.post('/todos',(req,res)=>{
    const todo=new Todo({
        text:req.body.text
    })
    todo.save().then((doc)=>{
        res.send(doc)
    }).catch(e=>res.status(400).send(e))
})

app.get('/todos',(req,res)=>{
    Todo.find()
        .then((todos)=>res.send({todos}))
        .catch((err)=>{res.status(400).send(err)})
})

app.listen(3000)

module.exports={
    app
}
