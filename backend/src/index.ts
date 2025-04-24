import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
// routes
import memberRoutes from './routes/member.routes'
import estimateRoutes from './routes/estimate.routes'
// middleware
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

// routes
app.use('/member', memberRoutes)
app.use('/estimate', estimateRoutes)

// middleware
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
