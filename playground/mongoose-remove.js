const {ObjectID}=require('mongodb')
const {mongoose}=require('./../server/db/mongoose')
const {Todo}=require('./../server/modules/todo')
const {User}=require('./../server/modules/user')

// Todo.remove({}).then((res)=>console.log(res))

// Todo.findOneAndRemove({}).then((res)=>console.log(res))
// Todo.findByIdAndRemove({}).then((res)=>console.log(res))
// Todo.findOneAndRemove({id:numbers}).findOneAndRemove..
Todo.findByIdAndRemove('5b536c1f0f06e4e36358f8ba').then((res)=>console.log(res))