const env=process.env.NODE_ENV || 'development'
console.log('env-----------',env)

if(env==='development' || env==='test'){
    const config=require('./config.json')
    const envConfig=config[env]
    Object.keys(envConfig).forEach((key)=>{
        process.env[key]=envConfig[key]
    })
}
// if(env==='development'){
//     process.env.PORT=3000
//     process.env.MONGODB_URI='mongodb://ddexta:balamutas1@ds229621.mlab.com:29621/ddextadb'
// }else if(env==='test'){
//     process.env.PORT=3000
//     process.env.MONGODB_URI='mongodb://ddexta:balamutas1@ds257241.mlab.com:57241/ddextatesting'

// }