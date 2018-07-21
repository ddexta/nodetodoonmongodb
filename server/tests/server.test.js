const expect=require('expect')
const requestOn=require('supertest')


const {app}=require('./../server')
const {Todo}=require('./../modules/todo')
const {User}=require('./../modules/user')

const todos=[
    {
        text:'first test todo'
    },
    {
        text:'second test todo'
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