"""
Amkyawdev AI Backend - FastAPI Application
HuggingFace Space Deployment Ready
"""
import os
from datetime import datetime, timedelta
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict
import httpx

app = FastAPI(title="Amkyawdev AI Backend", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rate limiting storage (in-memory for demo)
rate_limits = {
    "tokens": {"used": 0, "limit": 20, "reset_at": datetime.now() + timedelta(days=1)},
    "tts": {"used": 0, "limit": 20, "max_per_clip": 6, "reset_at": datetime.now() + timedelta(days=1)}
}

# Models
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    model: str = "gpt-oss-120b"  # Groq model
    temperature: float = 0.7
    max_tokens: int = 1024

class CompletionRequest(BaseModel):
    prompt: str
    model: str = "gpt-oss-120b"
    temperature: float = 0.7
    max_tokens: int = 1024

class WhisperRequest(BaseModel):
    audio_url: str

# System Prompt - Polite Burmese
SYSTEM_PROMPT = """You are Amkyawdev AI - a helpful, polite AI assistant.
Rules:
1. Focus on the user's question accurately
2. Answer clearly with precision
3. Use markdown formatting for code
4. Be polite (use Burmese greetings like "ဟုတ်ကဲ့ပါ အစ်ကို", "ဟုတ်အကို", "ဟုတ်ကဲ့ပါ", "ခဏစောင့်ပေးပါနော်")
5. Consider user emotions
6. Format SRT files correctly
7. Keep responses concise
8. Focus on accurate code and projects"""

def check_rate_limit(limit_type: str) -> bool:
    """Check if user has exceeded rate limits"""
    now = datetime.now()
    limit = rate_limits.get(limit_type)
    
    if not limit:
        return False
    
    # Reset if new day
    if now >= limit["reset_at"]:
        limit["used"] = 0
        limit["reset_at"] = now + timedelta(days=1)
    
    return limit["used"] < limit["limit"]

def use_rate_limit(limit_type: str, amount: int = 1):
    """Use rate limit tokens"""
    limit = rate_limits.get(limit_type)
    if limit:
        limit["used"] += amount

def get_groq_key() -> str:
    """Get Groq API key from environment - supports Vercel env vars"""
    # Check multiple sources for the API key
    key = os.getenv("GROQ_API_KEY") or os.getenv("GROQ_KEY") or os.getenv("GROQ_API_KEY") or os.getenv("VERCEL_GROQ_API_KEY")
    if not key:
        key = os.getenv("AmkyawDev_Kay")  # Custom env var
    return key

@app.get("/")
async def root():
    return {"message": "Amkyawdev AI Backend", "version": "1.0.0"}

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/limits")
async def get_limits():
    """Get current rate limits"""
    return {
        "tokens": {
            "used": rate_limits["tokens"]["used"],
            "limit": rate_limits["tokens"]["limit"],
            "remaining": rate_limits["tokens"]["limit"] - rate_limits["tokens"]["used"]
        },
        "tts": {
            "used": rate_limits["tts"]["used"],
            "limit": rate_limits["tts"]["limit"],
            "remaining": rate_limits["tts"]["limit"] - rate_limits["tts"]["used"]
        }
    }

@app.post("/v1/chat/completions")
async def chat_completions(request: ChatRequest):
    """Chat completion endpoint with rate limiting"""
    if not check_rate_limit("tokens"):
        raise HTTPException(status_code=429, detail="Token limit exceeded. Limit: 20/day")
    
    groq_key = get_groq_key()
    if not groq_key:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY not configured")
    
    headers = {
        "Authorization": f"Bearer {groq_key}",
        "Content-Type": "application/json"
    }
    
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for msg in request.messages:
        messages.append({"role": msg.role, "content": msg.content})
    
    payload = {
        "model": request.model,
        "messages": messages,
        "temperature": request.temperature,
        "max_tokens": request.max_tokens,
        "stream": False
    }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers=headers,
                json=payload,
                timeout=60.0
            )
            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail=response.text)
            
            use_rate_limit("tokens", 1)
            return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/v1/completions")
async def completions(request: CompletionRequest):
    """Text completion endpoint with rate limiting"""
    if not check_rate_limit("tokens"):
        raise HTTPException(status_code=429, detail="Token limit exceeded. Limit: 20/day")
    
    groq_key = get_groq_key()
    if not groq_key:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY not configured")
    
    headers = {
        "Authorization": f"Bearer {groq_key}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": request.model,
        "prompt": f"{SYSTEM_PROMPT}\n\nUser: {request.prompt}\nAI:",
        "temperature": request.temperature,
        "max_tokens": request.max_tokens
    }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.groq.com/openai/v1/completions",
                headers=headers,
                json=payload,
                timeout=60.0
            )
            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail=response.text)
            
            use_rate_limit("tokens", 1)
            return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/v1/audio/transcriptions")
async def transcriptions(request: WhisperRequest):
    """Whisper transcription endpoint with rate limiting"""
    if not check_rate_limit("tts"):
        raise HTTPException(status_code=429, detail="TTS limit exceeded. Limit: 20s/day")
    
    # Check max per clip (6 seconds)
    # This would be validated based on audio duration in production
    
    groq_key = get_groq_key()
    if not groq_key:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY not configured")
    
    headers = {
        "Authorization": f"Bearer {groq_key}"
    }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.groq.com/openai/v1/audio/transcriptions",
                headers=headers,
                files={"file": open(request.audio_url, "rb")},
                data={"model": "whisper-large-v3-turbo"},
                timeout=60.0
            )
            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail=response.text)
            
            use_rate_limit("tts", 6)  # Assume 6 seconds per clip
            return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/v1/models")
async def list_models():
    """List available models"""
    return {
        "models": [
            {"id": "gpt-oss-120b", "name": "GPT-OSS 120B"},
            {"id": "mixtral-8x7b-32768", "name": "Mixtral 8x7B"},
            {"id": "llama2-70b-4096", "name": "Llama 2 70B"},
            {"id": "gemma-7b-it", "name": "Gemma 7B"},
            {"id": "whisper-large-v3-turbo", "name": "Whisper V3 Turbo"}
        ]
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 7860))
    uvicorn.run(app, host="0.0.0.0", port=port)