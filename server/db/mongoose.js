const mongoose= require('mongoose')
mongoose.Promise=global.Promise
mongoose.connect('mongodb://ddexta:balamutas1@ds229621.mlab.com:29621/ddextadb',{ useNewUrlParser: true })
// const db=mongoose.connection
// db.on('error',console.error.bind(console,'connection error'))
module.exports ={
    mongoose
}