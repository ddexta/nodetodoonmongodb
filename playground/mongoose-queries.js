const {ObjectID}=require('mongodb')
const {mongoose}=require('./../server/db/mongoose')
const {Todo}=require('./../server/modules/todo')
const {User}=require('./../server/modules/user')


// const id='5b534316b8d1941f706824ef11'
// if(!ObjectID.isValid(id)){
//     console.log('id is not valid..')
// }
// Todo.find({
//     _id: id
// }).then((todos)=>{
//     console.log('todos ',todos)
// })

// Todo.findOne({
//     _id: id
// }).then((todo)=>{
//     console.log('todo ',todo)
// })

// Todo.findById(id).then((todo)=>{
//     if(!todo){return console.log("id not found..")}
//     console.log('todo by id',todo)
// }).catch((err)=>console.log(err))


User.findById('5b50adc31bd8591592dfebd6')
    .then((user)=>{
        if(!user){
            return console.log("id not found..")
        }
        console.log('user by id',user)
    })
    .catch((err)=>console.log(err))
    