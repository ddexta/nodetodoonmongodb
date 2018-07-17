const {MongoClient, ObjectID}=require('mongodb')

MongoClient.connect('mongodb://ddexta:balamutas1@ds229621.mlab.com:29621/ddextadb',{ useNewUrlParser: true },(error,client)=>{
    if(error){
        return console.log('unable to connect to the database....')
    }
    const db=client.db('ddextadb')

    // db.collection('Todos')
    //     .find({
    //         _id:new ObjectID('5b4cdedc62ff1a27985c5ff5')
    //     })
    //     .toArray()
    //     .then((docs)=>{
    //         console.log('todos list:')
    //         console.log(JSON.stringify(docs,undefined,2))
    //     })
    //     .catch((err)=>{
    //         console.log('unable to fetch documents...',err)
    //     })

    // db.collection('Todos')
    //     .find()
    //     .count()
    //     .then((count)=>{
    //         console.log('todos count:' ,count)
    //     })
    //     .catch((err)=>{
    //         console.log('unable to fetch documents...',err)
    //     })
    db.collection('Users').find({
        name:'Bob'
    }).toArray()
    .then((res)=>{
        console.log(JSON.stringify(res,undefined,2))
    })
    .catch((err)=>console.log('unable to query all users...'))


    console.log('connected to ddextadb database...')
    // client.close()
})