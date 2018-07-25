const expect=require('expect')
const requestOn=require('supertest')
const {ObjectID}=require('mongodb')

const {app}=require('./../server')
const {Todo}=require('./../modules/todo')
const {User}=require('./../modules/user')
const {todos,populateTodos,users,populateUsers}=require('./seed/seed')

beforeEach(populateUsers)
beforeEach(populateTodos)

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
describe('deletion of single todo',()=>{
    it('shoould delete and return todo by id',(done)=>{
        requestOn(app)
            .delete(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end((err,res)=>{
                if(err){
                    return done(err)
                }
                Todo.findById(todos[0]._id.toHexString())
                    .then((todo)=>{
                        expect(todo).toBeFalsy()
                        done()
                    })
                    .catch(e=>done(e))
            })
    })
    it('should return 404 if todo not found',(done)=>{
        const newID=new ObjectID().toHexString()
        requestOn(app)
            .delete(`/todos/${newID}`)
            .expect(404)
            .end(done)
    })
    it('should return 404 invalid object ids',(done)=>{
        requestOn(app)
            .delete('/todos/123')
            .expect(404)
            .end(done)
    })
})

describe('patching test',()=>{
    it('should upadte text ',(done)=>{
        const id=todos[0]._id.toHexString()
        const newData={text:'updated',completed:true}
        requestOn(app)
            .patch(`/todos/${id}`)
            .send(newData)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toEqual(newData.text)
                expect(res.body.todo.completed).toBeTruthy()
                expect(typeof res.body.todo.completedAt).toBe('number')
            })
            .end(done)
    })

    it('should uclear completedat when todo is not conpleted',(done)=>{
        const id=todos[1]._id.toHexString()
        const newData={text:'updated',completed:false}
        requestOn(app)
            .patch(`/todos/${id}`)
            .send(newData)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toEqual(newData.text)
                expect(res.body.todo.completed).toBeFalsy()
                expect(res.body.todo.completedAt).toBeFalsy()
            })
            .end(done)
    })
})

describe('GET /users/me',()=>{
    it('should return user if authenticated',(done)=>{
        requestOn(app)
            .get('/users/me')
            .set('x-auth',users[0].tokens[0].token)
            .expect(200)
            .expect((res)=>{
                expect(res.body._id).toBe(users[0]._id.toHexString())
                expect(res.body.email).toBe(users[0].email)
            })
            .end(done)

    })
    it('should return 401 if not authenticated',(done)=>{
        requestOn(app)
            .get('/users/me')
            .expect(401)
            .expect((res)=>{
                expect(res.body).toEqual({})
            })
            .end(done)

    })
})

describe('POST /users',()=>{
    it('should create a user if authenticated',(done)=>{
        const email='exa@mail.com'
        const password='123123'
        requestOn(app)
            .post('/users')
            .send({email,password})
            .expect(200)
            .expect((res)=>{
                expect(res.headers['x-auth']).toBeTruthy()
                expect(res.body.email).toBe(email)
                expect(res.body._id).toBeTruthy()

            })
            .end((err)=>{
                if(err){return done(err)}

                User.findOne({email}).then((user)=>{
                    expect(user).toBeTruthy()
                    expect(user.password).not.toBe(password)
                    done()
                }).catch((err)=>done(err))
                
            })

    })
    it('should return validation errors if request invalid',(done)=>{
        const email='exa@mailcom'
        const password='1123'
        requestOn(app)
            .post('/users')
            .send({})
            .expect(400)
            .end(done)
    })
    it('should not create user if email in use',(done)=>{
        const email=users[0].email
        const password='123123'
        requestOn(app)
            .post('/users')
            .send({email,password})
            .expect(400)
            .end(done)    
        })
})

describe('POST /login',()=>{
    it('should token come back if valid email and password',(done)=>{
        const email=users[1].email
        const password=users[1].password
        requestOn(app)
            .post('/users/login')
            .send({email,password})
            .expect(200)
            .expect((res)=>{
                expect(res.headers['x-auth']).toBeTruthy()

            })
            .end((err,res)=>{
                if(err){return done(err)}

                User.findById(users[1]._id)
                .then((user)=>{
                    expect(user.tokens[0]).toMatchObject({
                        access:'auth',
                        token: res.headers['x-auth']
                    })
                    done()
                })
                .catch((err)=>done(err))})
                
    })
    it('should reject on invalid login',(done)=>{
        const email=users[1].email
        const password='joel5555'
        requestOn(app)
            .post('/users/login')
            .send({email,password})
            .expect(400)
            .expect((res)=>{
                expect(res.headers['x-auth']).toBeFalsy()

            })
            .end((err,res)=>{
                if(err){return done(err)}

                User.findById(users[1]._id)
                .then((user)=>{
                    expect(user.tokens.length).toBe(0)
                    done()
                })
                .catch((err)=>done(err))})

    })
})