const express = require('express')
const bodyParser = require('body-parser')
const csrf = require('csurf')
const cookieParser = require('cookie-parser')

const csrfProtect = csrf({cookie: true})
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
const mongoose = require('mongoose')
const uri = 'mongodb+srv://Aryan:9097134523@cluster0.lgyby.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(uri).then(response => {
    console.log('working')
})

const coursesSchema = mongoose.Schema({
   course_id: {
       type: String,
       unique: true,
       required: true
   },
   course_name: {
       type: String,
       required: true
   },
   course_period: {
       type: String,
       required: true
   },
   course_fee: {
       type: Number,
       required: true
   },
   instructor_name: {
       type: String,
       required: true
   }
})

const Course = mongoose.model('Course', coursesSchema)

app.get('/', (req, res) => {
    res.send('welcome to courses api')
})

app.get('/courses', async (req, res) => {
    const courses = await Course.find()
    res.send(courses)
})

app.post('/courses/create', async (req, res) => {
    await Course.create(req.body)
    res.send('one course is added')

    // console.log(req.body)
})

app.put('/courses/update', csrfProtect, async (req, res) => {
    const {_id, ...data} = req.body
    // console.log(mongoose.Types.ObjectId(_id), data)
    await Course.updateOne({_id: mongoose.Types.ObjectId(_id)}, data)
    res.send('successfully updated')
})

app.delete('/courses/delete', csrfProtect, async (req, res) => {
    // req.body._id
    await Course.deleteOne(mongoose.Types.ObjectId(req.body._id))
    res.send('successfully deleted')
})

app.listen(5000, ()=> {

    console.log('server is up and running....')
})