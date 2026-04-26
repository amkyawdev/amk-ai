// Groq API utility for chat functionality
// Note: For production, calls should go through your backend (Hugging Face Space)
// to protect API keys. This is a client-side utility for demonstration.

const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const HF_SPACE_URL = 'https://huggingface.co/spaces/amkyawdev/amkyaw-ai-backend';
const HF_API_URL = `${HF_SPACE_URL}/api/chat`;

// Model configuration
const MODEL = 'mixtral-8x7b-32768';
const WHISPER_MODEL = 'whisper-large-v3-turbo';

class GroqAPI {
  constructor() {
    this.apiKey = import.meta.env.VITE_GROQ_API_KEY;
  }

  // Send chat message and get streaming response
  async sendMessage(message, systemPrompt = '') {
    try {
      const response = await fetch(HF_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          systemPrompt: systemPrompt || this.getDefaultSystemPrompt(),
          model: MODEL,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      return this.createStreamIterator(response);
    } catch (error) {
      console.error('Groq API Error:', error);
      throw error;
    }
  }

  // Create async iterator from streaming response
  async *createStreamIterator(response) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          if (buffer) {
            yield buffer;
          }
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        
        // Handle SSE format: data: {...}\n\n
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              return;
            }
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                yield parsed.content;
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  // Default Burmese system prompt
  getDefaultSystemPrompt() {
    return `
      သင်သည် မြန်မာ AI အကူဖြစ်သည်။ အောက်ပါအချက်များကို လိုက်နာရန်-
      1. မေးခွန်းကို အဓိကထားဖြေဆိုပါ
      2. တိတိကျကျ၊ ရှင်းလင်းပြတ်သားစွာ ဖြေပါ
      3. Markdown စနစ်ဖြင့် ရေးသားပါ
      4. ယဉ်ကျေးသော စကားများသုံးပါ (မင်္ဂလာပါဗျာ၊ ဟုတ်ကဲ့ပါ၊ ခနလေးစောင့်ပေးပါနော်)
      5. စကားပြော ၆ စက္ကန့်အတွင်း ပြောရန်
      6. ဖိုင် format များ မှန်ကန်စွာ ထုတ်ပေးရန်
    `.trim();
  }

  // Voice to text using Web Speech API (fallback when API unavailable)
  async voiceToText(audioBlob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const arrayBuffer = reader.result;
          // Use Web Speech API for voice recognition
          const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
          
          if (!speechRecognition) {
            reject(new Error('Speech recognition not supported'));
            return;
          }

          const recognition = new speechRecognition();
          recognition.lang = 'my-MM';
          recognition.continuous = false;
          recognition.interimResults = false;

          recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            resolve(transcript);
          };

          recognition.onerror = (event) => {
            reject(new Error(event.error));
          };

          recognition.start();
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(audioBlob);
    });
  }

  // Get user limits from backend
  async getUserLimits(userId) {
    try {
      const response = await fetch(`${HF_API_URL}/user/${userId}/limits`);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Get Limits Error:', error);
      // Return default limits on error
      return { tokens: 20, speech_seconds: 20 };
    }
  }
}

// Export singleton instance
export const groqAPI = new GroqAPI();
export default groqAPI;