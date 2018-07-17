const {MongoClient, ObjectID}=require('mongodb')

MongoClient.connect('mongodb://ddexta:balamutas1@ds229621.mlab.com:29621/ddextadb',{ useNewUrlParser: true },(error,client)=>{
    if(error){
        return console.log('unable to connect to the database....')
    }
    const db=client.db('ddextadb')

    // db.collection('Todos').findOneAndUpdate({
    //     _id:ObjectID('5b4e157b6671d1a538836483')
    // },{
    //     $set:{
    //         completed:true
    //     }
    // },{returnOriginal: false})
    // .then((res)=>console.log(res))
    // .catch((err)=>console.log(err))

    db.collection('Users').findOneAndUpdate({
        _id:ObjectID('5b4ce005387c84286988cea2')
    },{
        $set:{
            name:'George'
        },
        $inc:{
            age:2
        }
    },{returnOriginal: false})
    .then((res)=>console.log('name updated and age incremented'))
    .catch((err)=>console.log(err))


    // client.close()

})