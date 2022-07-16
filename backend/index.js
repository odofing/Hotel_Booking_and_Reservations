import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import hotelsRoute from './routes/hotels.js'
import usersRoute from './routes/users.js'
import roomsRoute from './routes/rooms.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('connected to DB!')
  } catch (error) {
    throw error
  }
}

mongoose.connection.on('disconnected', () => {
  console.log('mongodb disconnected')
})
mongoose.connection.on('connected', () => {
  console.log('mongodb connected')
})

const PORT = 8080

app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/hotels', hotelsRoute)
app.use('/api/rooms', roomsRoute)

// app.use((err, req, res, next) => {
//   const errorStatus = err.status || 500
//   const errorMessage = err.message || 'Something went wrong!'
//   return res.status(errorStatus).json({
//     success: false,
//     status: errorStatus,
//     message: errorMessage,
//     stack: err.stack,
//   })
// })

app.listen(PORT, () => {
  connect(), console.log(`server running on ${PORT} `)
})
