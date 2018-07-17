const {MongoClient, ObjectID}=require('mongodb')

MongoClient.connect('mongodb://ddexta:balamutas1@ds229621.mlab.com:29621/ddextadb',{ useNewUrlParser: true },(error,client)=>{
    if(error){
        return console.log('unable to connect to the database....')
    }
    const db=client.db('ddextadb')

    // db.collection('Todos')
    //     .deleteMany({text:'eat lunch'})
    //     .then((res)=>console.log(res))
    //     .catch((err)=>console.log(err))

    // db.collection('Todos')
    //     .deleteOne({text:'eat lunch'})
    //     .then((res)=>console.log(res))
    //     .catch((err)=>console.log(err))

    // db.collection('Todos')
    //     .findOneAndDelete({
    //         completed:false
    //     })
    //     .then((res)=>console.log(res))
    //     .catch((err)=>console.log(err))

    db.collection('Users').deleteMany({name:'Bob'})

    // db.collection('Users')
    // .findOneAndDelete({
    //     _id:ObjectID("5b4ce353f95eec2a631bd610")
    // })
    // .then((res)=>console.log(res))
    // .catch((err)=>console.log(err))
    
    // client.close()

})