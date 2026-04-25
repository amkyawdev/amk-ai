"""
Amkyawdev-ai Backend - FastAPI
HuggingFace Space Deployment Ready
"""
import os
from datetime import datetime, timedelta
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Amkyawdev AI", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rate limits (in-memory)
rate_limits = {
    "tokens": {"used": 0, "limit": 20, "reset_at": datetime.now() + timedelta(days=1)},
    "tts": {"used": 0, "limit": 20, "max_per_clip": 6, "reset_at": datetime.now() + timedelta(days=1)}
}

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    model: str = "mixtral-8x7b-32768"
    temperature: float = 0.7

# Burmese system prompt
SYSTEM_PROMPT = """You are Burme AI Bot - a helpful AI assistant.
- Answer directly and clearly
- Use markdown for code
- Use Burmese greetings: မင်္ဂလာပါဗျာ, ဟုတ်အကို, ဟုတ်ကဲ့ပါ, ခနလေးစောင့်ပေးပါနော်
- Be polite and warm
- Consider user emotions
- Max 6 seconds for TTS"""

@app.get("/")
def root():
    return {"message": "Welcome to Amkyawdev AI", "version": "1.0.0"}

@app.get("/health")
def health():
    return {"status": "ok", "tokens": rate_limits["tokens"], "tts": rate_limits["tts"]}

@app.post("/v1/chat/completions")
async def chat(request: ChatRequest):
    if rate_limits["tokens"]["used"] >= rate_limits["tokens"]["limit"]:
        raise HTTPException(429, "Token limit reached")
    
    rate_limits["tokens"]["used"] += 1
    
    # Simulated response - replace with actual GROQ API call
    last_msg = request.messages[-1].content if request.messages else ""
    response = f"ဟုတ်ကဲ့ပါ အစ်ကို။\n\n{last_msg}\n\nအတွက်ကျေးဇူးတင်ပါပါနော်။"
    
    return {
        "choices": [{
            "message": {
                "role": "assistant",
                "content": response
            }
        }]
    }

@app.get("/limits")
def get_limits():
    return rate_limits

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "7860"))
    uvicorn.run(app, host="0.0.0.0", port=port)
