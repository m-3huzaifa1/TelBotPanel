const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const http = require('http')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const Server = http.createServer(app)
const dotenv = require('dotenv')

const port = process.env.PORT || 8080

const connectDB = require('./config/db')
const authRoute = require('./routes/user')
const refreshRoute = require('./routes/refresh')
const corsOptions = require('./config/cors')
const credentials = require('./middleware/credentials')

dotenv.config()
connectDB()

app.use(credentials)
app.use(morgan('dev'))
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.json())

app.use('/api/auth',authRoute)
app.use('/api/refresh',refreshRoute)

app.get('/',(req,res)=>{
    res.send('Server Running')
})

Server.listen(port,()=>{console.log(`Server Running on port ${port}`)})
