import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Simple AI response function
const generateResponse = (message) => {
  const lowerMsg = message.toLowerCase()
  
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
    return 'Hello! How can I help you today?'
  }
  if (lowerMsg.includes('help')) {
    return 'I am here to help! What do you need assistance with?'
  }
  if (lowerMsg.includes('name')) {
    return 'I am AmkyawDev AI, an AI assistant.'
  }
  if (lowerMsg.includes('who are you')) {
    return 'I am an AI assistant built by AmkyawDev.'
  }
  
  return `I received your message: "${message}". How can I assist you further?`
}

// Routes
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'AmkyawDev AI API is running',
    version: '1.0.0'
  })
})

// Chat endpoint
app.post('/api/chat', (req, res) => {
  try {
    const { message } = req.body
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }
    
    const response = generateResponse(message)
    
    res.json({ 
      response,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }
  
  // Demo response - replace with real authentication
  res.json({ 
    success: true,
    token: 'demo_token_' + Date.now(),
    user: { email, name: 'User' }
  })
})

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' })
  }
  
  // Demo response - replace with real registration
  res.json({ 
    success: true,
    token: 'demo_token_' + Date.now(),
    user: { name, email }
  })
})

// User profile (protected)
app.get('/api/user/profile', (req, res) => {
  const authHeader = req.headers.authorization
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization required' })
  }
  
  // Demo response
  res.json({
    id: 1,
    name: 'Demo User',
    email: 'user@amkyawdev.ai',
    createdAt: new Date().toISOString()
  })
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AmkyawDev AI server running on port ${PORT}`)
  console.log(`📖 API docs: http://localhost:${PORT}/api/health`)
})