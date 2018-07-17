// const MongoClient=require('mongodb').MongoClient
const {MongoClient, ObjectID}=require('mongodb')

// let obj=new ObjectID();
// console.log(obj)

MongoClient.connect('mongodb://ddexta:balamutas1@ds229621.mlab.com:29621/ddextadb',{ useNewUrlParser: true },(error,client)=>{
    if(error){
       return console.log('unable to connect')
    }
    console.log('connected to ddextas mongodb')
    const db=client.db('ddextadb')
    // db.collection('Todos').insertOne({
    //     text:'something to do v2',
    //     completed:false
    // },(err,res)=>{
    //     if(err){
    //         return console.log('unable to add new collection',err)
    //     }
    //     console.log(JSON.stringify(res.ops,undefined,2))
    // })

    // db.collection('Users').insertOne({
    //     name:'Bob',
    //     age:16,
    //     location:'USA'
    // },(err,res)=>{
    //     if(err){
    //         return console.log('unable to add new collection',err)
    //     }
    //     // console.log(JSON.stringify(res.ops,undefined,2))
    //     console.log(res.ops[0]._id.getTimestamp()) 
    // })
    client.close()
})