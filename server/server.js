const mongoose= require('mongoose')
// mongoose.Promise=global.Promise
mongoose.connect('mongodb://ddexta:balamutas1@ds229621.mlab.com:29621/ddextadb',{ useNewUrlParser: true })
const db=mongoose.connection
db.on('error',console.error.bind(console,'connection error'))
db.once('open',()=>{
const Todo= mongoose.model('Todo',{
    text:{
        type:String
    },
    completed:{
        type:Boolean
    },
    completedAt:{
        type:Number
    }
})

const newTodo=new Todo({
    text:'Cook dinner'
})
const newTodo2=new Todo({
    text:'code a code',
    completed:true,
    completedAt:0
})
newTodo.save().then((res)=>console.log('saved todo',res)).catch((err)=>console.log('unable to save',err))
newTodo2.save()
})