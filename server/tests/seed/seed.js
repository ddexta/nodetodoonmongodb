const {ObjectID}=require('mongodb')
const {Todo}=require('./../../modules/todo')
const {User}=require('./../../modules/user')
const jwt=require('jsonwebtoken')


const userOneId=new ObjectID()
const userTwoId=new ObjectID()
const users=[
    {
        _id:userOneId,
        email:'kk@mal.com',
        password:'useronepass',
        tokens:[
            {
                access:'auth',
                token:jwt.sign({_id:userOneId.toHexString(),access:'auth'},process.env.JWT_Secret).toString()
            }
        ]
    },
    {
        _id:userTwoId,
        email:'jj@mal.com',
        password:'usertwopass',
        tokens:[
            {
                access:'auth',
                token:jwt.sign({_id:userTwoId.toHexString(),access:'auth'},process.env.JWT_Secret).toString()
            }
        ]
    }
]

const todos=[
    {
        text:'first test todo',
        _id:new ObjectID(),
        _creator:userOneId
    },
    {
        text:'second test todo',
        _id:new ObjectID(),
        completed:true,
        completedAt:333,
        _creator:userTwoId

    }
]
const populateTodos=(done)=>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos)
    }).then(()=>done())
}

const populateUsers=(done)=>{
    User.remove({}).then(()=>{
        const userOne=new User(users[0]).save()
        const userTwo=new User(users[1]).save()
        return Promise.all([userOne,userTwo])

    }).then(()=>done())
}

module.exports={
    todos,populateTodos,users,populateUsers
}