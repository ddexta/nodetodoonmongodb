const jwt=require('jsonwebtoken')

const data={
    id:4
}

const token=jwt.sign(data,'123abc')

// console.log(token)
 const decoded=jwt.verify(token,'123abc')
 console.log(decoded)













// const {SHA256}=require('crypto-js')

// const message='i am user number three'
// const hash= SHA256(message).toString()

// console.log('message '+message)
// console.log('message hash  '+hash)

// const data={
//     id:4
// }
// const token={
//     data,
//     hash:SHA256(JSON.stringify(data)+'somesecret').toString()
// }

// token.data.id=5
// token.hash=SHA256(JSON.stringify(token.data)).toString()
// const resultHash=SHA256(JSON.stringify(token.data)+'somesecret').toString()
// if(resultHash===token.hash){
//     console.log('data was not changed')

// }else{
//     console.log('data was change. dio not trust')
// }
