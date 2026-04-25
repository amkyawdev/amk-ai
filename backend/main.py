"""
AMK AI Backend - FastAPI Application
HuggingFace Space Deployment Ready
"""
import os
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict
import httpx

app = FastAPI(title="AMK AI Backend", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    model: str = "mixtral-8x7b-32768"
    temperature: float = 0.7
    max_tokens: int = 1024

class CompletionRequest(BaseModel):
    prompt: str
    model: str = "mixtral-8x7b-32768"
    temperature: float = 0.7
    max_tokens: int = 1024

class WhisperRequest(BaseModel):
    audio_url: str

# System Prompt
SYSTEM_PROMPT = """You are Burme AI - a helpful, polite AI assistant.
Rules:
1. Focus on the user's question
2. Answer accurately and clearly
3. Use markdown formatting
4. Be polite (use greetings like "မင်္ဂလာပါ", "ဟုတ်အကို", "ဟုတ်ကဲ့ပါ")
5. Consider user emotions
6. Format SRT files correctly
7. Keep responses concise"""

@app.get("/")
async def root():
    return {"message": "AMK AI Backend", "version": "1.0.0"}

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/v1/chat/completions")
async def chat_completions(request: ChatRequest):
    """Chat completion endpoint"""
    groq_key = os.getenv("GROQ_API_KEY")
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
        "max_tokens": request.max_tokens
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
            return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/v1/completions")
async def completions(request: CompletionRequest):
    """Text completion endpoint"""
    groq_key = os.getenv("GROQ_API_KEY")
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
            return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/v1/audio/transcriptions")
async def transcriptions(request: WhisperRequest):
    """Whisper transcription endpoint"""
    groq_key = os.getenv("GROQ_API_KEY")
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
                data={"model": "whisper-large-v3-turbo"},
                timeout=60.0
            )
            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail=response.text)
            return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/v1/models")
async def list_models():
    """List available models"""
    return {
        "models": [
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