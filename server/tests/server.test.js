const expect=require('expect')
const requestOn=require('supertest')
const {ObjectID}=require('mongodb')

const {app}=require('./../server')
const {Todo}=require('./../modules/todo')
const {User}=require('./../modules/user')

const todos=[
    {
        text:'first test todo',
        _id:new ObjectID()
    },
    {
        text:'second test todo',
        _id:new ObjectID()

    }
]

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos)
    }).then(()=>done())
})

describe('post todos',()=>{
    it('should create a new todo',(done)=>{
        const text='test todo text'
        requestOn(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text)
            })
            .end((err,res)=>{
                if(err){
                    return done(err)
                }
                Todo.find({text}).then((todos)=>{
                    expect(todos.length).toBe(1)
                    expect(todos[0].text).toBe(text)
                    done()
                }).catch(e=>done(e))
            })
    })
    it('should not create todo with invalid body data',(done)=>{
        requestOn(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res)=>{
                if(err){
                    return done(err)
                }
                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(2)
                    done()
                }).catch(e=>done(e))
            })
    })
})
describe('get todo',()=>{
    it('should get all todos',(done)=>{
        requestOn(app)
            .get('/todos')
            .expect(200)
            .expect((res)=>{
                expect(res.body.todos.length).toBe(2)    
            })
            .end(done)
})
})

describe('get todo by id',()=>{
    it('should return todo by id',(done)=>{
        requestOn(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done)
    })
    it('should return 4040 if todo not found',(done)=>{
        const newID=new ObjectID().toHexString()
        requestOn(app)
            .get(`/todos/${newID}`)
            .expect(404)
            .end(done)
    })
    it('should return 404 for non object ids',(done)=>{
        requestOn(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done)
    })
})