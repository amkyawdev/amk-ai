import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 7860

app.use(cors())
app.use(express.json())

// HuggingFace API setup
const HF_API_URL = 'https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-128k-instruct'
const HF_TOKEN = process.env.HF_TOKEN || ''

// In-memory chat storage
const chatHistory = new Map()

async function generateResponse(message, userId) {
  try {
    // Build conversation context
    let conversation = []
    if (userId && chatHistory.has(userId)) {
      conversation = chatHistory.get(userId).slice(-10)
    }
    
    // Add system prompt for Myanmar support
    conversation.push({ role: 'user', content: message })
    
    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HF_TOKEN}`
      },
      body: JSON.stringify({
        inputs: conversation,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          return_full_text: false
        }
      })
    })
    
    if (response.ok) {
      const data = await response.json()
      return Array.isArray(data) ? data[0]?.generated_text : data.generated_text || 'Sorry, I could not generate a response.'
    }
    
    // Fallback if API fails
    return await fallbackResponse(message)
  } catch (error) {
    console.error('AI Error:', error)
    return await fallbackResponse(message)
  }
}

async function fallbackResponse(message, userId) {
  const lowerMsg = message.toLowerCase()
  const mmKeywords = ['မင်း', 'ဘာ', 'လုပ်', 'နိုင်', 'ရန်', 'သိ', 'ပြော', 'ကူ', 'ညီ', 'အစီအစဉ်']
  const isMyanmar = mmKeywords.some(kw => message.includes(kw))
  
  if (isMyanmar) {
    return 'မင်္ဂလာပါ! ကျွန်တော်/မင်းက မြန်မာစကားပြောနေပါတယ်။ ကျွန်တော်/မင်းကူညီနိုင်ပါတယ်! ဘာမေးချင်ပါသလဲ?'
  }
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
    return 'Hello! How can I help you today?'
  }
  return `I received your message: "${message}". How can I assist you further?`
}

// Routes
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'AmkyawDev AI API', version: '1.0.0' })
})

app.post('/api/chat', async (req, res) => {
  try {
    const { message, userId } = req.body
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }
    
    const response = await generateResponse(message, userId)
    
    // Save to chat history
    if (userId) {
      if (!chatHistory.has(userId)) {
        chatHistory.set(userId, [])
      }
      chatHistory.get(userId).push(
        { role: 'user', content: message },
        { role: 'assistant', content: response }
      )
    }
    
    res.json({ 
      response,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Chat Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/api/history/:userId', (req, res) => {
  const { userId } = req.params
  const history = chatHistory.get(userId) || []
  res.json({ history })
})

app.delete('/api/history/:userId', (req, res) => {
  const { userId } = req.params
  chatHistory.delete(userId)
  res.json({ success: true })
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' })
})

app.listen(PORT, () => {
  console.log(`🚀 AmkyawDev AI running on port ${PORT}`)
})
