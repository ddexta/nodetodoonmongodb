const mongoose=require('mongoose')
const validator=require('validator')
const jwt=require('jsonwebtoken')
const _=require('lodash')
const bcrypt=require('bcryptjs')

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:'{value} is not valid email'
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    tokens:[
        {
            access:{
                type:String,
                require:true
            },
            token:{
                type:String,
                require:true
            }
        }
    ]

})
UserSchema.methods.toJSON=function(){
    const user=this
    const userObject=user.toObject()

    return _.pick(userObject,['_id','email'])
}


UserSchema.methods.generateAuthToken=function(){
    const user=this
    const access='auth'
    const token=jwt.sign({_id:user._id.toHexString(),access},'abc123').toString()

    user.tokens=user.tokens.concat([{access,token}])
    return user.save().then(()=>{return token})
}

UserSchema.statics.findByToken=function(token){
    const User=this
    let decoded
    try{
        decoded=jwt.verify(token,'abc123')
    }catch(e){
        return Promise.reject()
    }
    return User.findOne({
        '_id':decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    })
}

UserSchema.pre('save',function(next){
    const user=this
    if(user.isModified('password')){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(user.password,salt,(err,res)=>{
                user.password=res
                next()
            })
        })
    }else{next()}
})

const User=mongoose.model('User',UserSchema)

module.exports={User}