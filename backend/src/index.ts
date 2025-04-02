import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import memberRoutes from './routes/member.routes'
import { errorHandler } from './middleware/error.middleware'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(
    cors({
        origin: process.env.NODE_ENV === 'production' ? 'https://estimate-frontend.vercel.app' : 'http://localhost:5173',
        exposedHeaders: ['Authorization'],
        credentials: true,
    }),
)

app.use(express.json())
app.use(cookieParser())

app.get('/', function (req, res) {
    res.send('테스트입니다.')
})
app.use('/member', memberRoutes)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
