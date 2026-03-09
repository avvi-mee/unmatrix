import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import contactRouter from './routes/contact'
import leadsRouter from './routes/leads'
import adminRouter from './routes/admin'
import { errorHandler } from './middleware/errorHandler'

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(cors({
  origin: process.env.CLIENT_URL ?? 'http://localhost:5173',
  credentials: true,
}))

app.use(express.json())

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.use('/api/contact', contactRouter)
app.use('/api/leads', leadsRouter)
app.use('/api/admin', adminRouter)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
