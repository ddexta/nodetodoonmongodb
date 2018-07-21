const {mongoose}=require('./db/mongoose')
const express=require('express')
const bodyParser=require('body-parser')
const {ObjectID}=require('mongodb')

const port=process.env.PORT || 3000

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

app.get('/todos/:id',(req,res)=>{
    const id=req.params.id
    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }
    Todo.findById(id)
        .then((todo)=>{
            if(!todo){ return res.status(404).send()}
            res.send({todo})
        })
        .catch((err)=>res.status(400).send())
    
})

app.listen(port,()=>console.log(`started server on ${port}`))

module.exports={
    app
}
