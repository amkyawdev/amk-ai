import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GeneratorAnimation, ConnectionErrorAnimation, TypingAnimation } from '../components/AnimationSystem';
import { SendButton, MicrophoneButton } from '../components/ButtonEffects';
import { StreamingText } from '../components/StreamingText';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { groqAPI } from '../utils/groqAPI';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showThankingAnimation, setShowThankingAnimation] = useState(false);
  const [dailyTokens, setDailyTokens] = useState(0);
  const [dailySpeechSec, setDailySpeechSec] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const DAILY_TOKEN_LIMIT = 20;
  const DAILY_SPEECH_LIMIT = 20;

  // Burmese System Prompt
  const systemPrompt = `
    သင်သည် မြန်မာ AI အကူဖြစ်သည်။ အောက်ပါအချက်များကို လိုက်နာရန်-
    1. မေးခွန်းကို အဓိကထားဖြေဆိုပါ
    2. တိတိကျကျ၊ ရှင်းလင်းပြတ်သားစွာ ဖြေပါ
    3. Markdown စနစ်ဖြင့် ရေးသားပါ
    4. ယဉ်ကျေးသော စကားများသုံးပါ (မင်္ဂလာပါဗျာ၊ ဟုတ်ကဲ့ပါ၊ ခနလေးစောင့်ပေးပါနော်)
    5. စကားပြော ၆ စက္ကန့်အတွင်း ပြောရန်
    6. ဖိုင် format များ မှန်ကန်စွာ ထုတ်ပေးရန်
  `;

  // Load saved messages on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    
    const savedTokens = localStorage.getItem('dailyTokens');
    const savedSpeech = localStorage.getItem('dailySpeech');
    const lastReset = localStorage.getItem('lastReset');
    
    // Reset daily limits if it's a new day
    const today = new Date().toDateString();
    if (lastReset !== today) {
      localStorage.setItem('dailyTokens', '0');
      localStorage.setItem('dailySpeech', '0');
      localStorage.setItem('lastReset', today);
    } else {
      setDailyTokens(parseInt(savedTokens) || 0);
      setDailySpeechSec(parseInt(savedSpeech) || 0);
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentResponse]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isStreaming) return;
    
    if (dailyTokens >= DAILY_TOKEN_LIMIT) {
      setHasError(true);
      return;
    }

    const userMessage = {
      id: Date.now(),
      text: inputText.trim(),
      isBot: false,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsStreaming(true);
    setCurrentResponse('');
    setHasError(false);
    setIsGenerating(true);

    try {
      // Get response from API
      const response = await groqAPI.sendMessage(inputText.trim(), systemPrompt);
      
      // Build response character by character
      let fullResponse = '';
      for await (const chunk of response) {
        fullResponse += chunk;
        setCurrentResponse(fullResponse);
      }
      
      // Add final message
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          text: fullResponse,
          isBot: true,
          timestamp: new Date().toISOString(),
        }
      ]);
      
      // Update token count
      const newTokenCount = dailyTokens + 1;
      setDailyTokens(newTokenCount);
      localStorage.setItem('dailyTokens', newTokenCount.toString());
      
      // Show thanking animation
      setShowThankingAnimation(true);
      
    } catch (error) {
      console.error('Chat error:', error);
      setHasError(true);
      
      // Add error message
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          text: 'တောင်းပန်ပါတယ်။ အမှားဖြစ်ပွားနေပါသည်။ ကျေးဇူးပြု၍ ပြန်ကြိုးစားပါ။',
          isBot: true,
          timestamp: new Date().toISOString(),
        }
      ]);
    } finally {
      setIsStreaming(false);
      setCurrentResponse('');
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRetry = () => {
    setHasError(false);
    inputRef.current?.focus();
  };

  const handleTextToSpeech = async (text) => {
    if (dailySpeechSec >= DAILY_SPEECH_LIMIT) {
      return;
    }

    try {
      // Estimate speech time (roughly 2.5 chars per second)
      const estimatedSeconds = Math.min(Math.ceil(text.length / 2.5), 6);
      
      if (dailySpeechSec + estimatedSeconds > DAILY_SPEECH_LIMIT) {
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'my-MM';
      utterance.rate = 1;
      
      utterance.onend = () => {
        const newSpeechSec = dailySpeechSec + estimatedSeconds;
        setDailySpeechSec(newSpeechSec);
        localStorage.setItem('dailySpeech', newSpeechSec.toString());
      };

      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('TTS error:', error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 60px)',
      background: '#1a1a1a',
    }}>
      {/* Usage Cards */}
      <div style={{
        display: 'flex',
        gap: '8px',
        padding: '8px 16px',
        background: '#2d2d2d',
        borderBottom: '1px solid #242424',
      }}>
        <div style={{
          flex: 1,
          background: '#1a1a1a',
          borderRadius: '8px',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span style={{ fontSize: '14px' }}>🎫</span>
          <span style={{ fontSize: '12px', color: '#b0b0b0' }}>
            Token: <span style={{ color: '#FFD700' }}>{dailyTokens}/{DAILY_TOKEN_LIMIT}</span>
          </span>
        </div>
        <div style={{
          flex: 1,
          background: '#1a1a1a',
          borderRadius: '8px',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span style={{ fontSize: '14px' }}>🎤</span>
          <span style={{ fontSize: '12px', color: '#b0b0b0' }}>
            Speech: <span style={{ color: '#FFD700' }}>{dailySpeechSec}/{DAILY_SPEECH_LIMIT}s</span>
          </span>
        </div>
      </div>

      {/* Error State */}
      <AnimatePresence>
        {hasError && (
          <ConnectionErrorAnimation show={hasError} onRetry={handleRetry} />
        )}
      </AnimatePresence>

      {/* Messages Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
      }}>
        {messages.length === 0 && !isStreaming && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center',
              padding: '48px 24px',
            }}
          >
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFD700, #DAA520)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
            }}>
              <span style={{ fontSize: '40px' }}>🤖</span>
            </div>
            <h2 style={{ color: '#FFD700', marginBottom: '12px' }}>
              A-I မှ ကြိုဆိုပါတယ်
            </h2>
            <p style={{ color: '#b0b0b0', fontSize: '14px', lineHeight: 1.6 }}>
              မေးခွန်းများ မေးမြန်းနိုင်ပါပြီ
            </p>
          </motion.div>
        )}

        {/* Message List */}
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={msg.isBot ? 'message-bot' : 'message-user'}
            style={{
              marginBottom: '16px',
              paddingLeft: msg.isBot ? '12px' : 0,
              borderLeft: msg.isBot ? '3px solid #FFD700' : 'none',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              flexDirection: msg.isBot ? 'row' : 'row-reverse',
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: msg.isBot 
                  ? 'linear-gradient(135deg, #FFD700, #DAA520)' 
                  : '#2d2d2d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: '16px' }}>{msg.isBot ? '🤖' : '👤'}</span>
              </div>
              <div style={{
                background: msg.isBot ? 'transparent' : '#2d2d2d',
                borderRadius: msg.isBot ? '0' : '12px 12px 0 12px',
                padding: msg.isBot ? '0' : '12px',
                maxWidth: '80%',
              }}>
                <MarkdownRenderer content={msg.text} isBot={msg.isBot} />
                {msg.isBot && (
                  <motion.button
                    onClick={() => handleTextToSpeech(msg.text)}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      marginTop: '8px',
                      background: 'transparent',
                      border: 'none',
                      color: '#FFD700',
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>🔊</span> ဖတ်ပါ
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Streaming Response */}
        {isStreaming && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="message-bot"
            style={{
              marginBottom: '16px',
              paddingLeft: '12px',
              borderLeft: '3px solid #FFD700',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFD700, #DAA520)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: '16px' }}>🤖</span>
              </div>
              <div style={{ flex: 1 }}>
                {isGenerating ? (
                  <GeneratorAnimation />
                ) : (
                  <StreamingText 
                    text={currentResponse} 
                    speed={20}
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{
        display: 'flex',
        gap: '8px',
        padding: '12px 16px',
        background: '#2d2d2d',
        borderTop: '1px solid #242424',
      }}>
        <label style={{
          width: '40px',
          height: '40px',
          borderRadius: '20px',
          background: '#1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}>
          <input
            type="file"
            style={{ display: 'none' }}
            accept="image/*,.pdf,.doc,.docx"
          />
          <span style={{ fontSize: '18px' }}>📎</span>
        </label>

        <textarea
          ref={inputRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="မေးခွန်းထားပါ..."
          disabled={isStreaming}
          style={{
            flex: 1,
            padding: '10px 12px',
            background: '#1a1a1a',
            border: '2px solid #242424',
            borderRadius: '20px',
            color: '#ffffff',
            fontSize: '14px',
            resize: 'none',
            minHeight: '40px',
            maxHeight: '120px',
            fontFamily: 'inherit',
          }}
        />

        <MicrophoneButton
          onClick={() => setIsRecording(!isRecording)}
          recording={isRecording}
          disabled={isStreaming}
        />

        <SendButton
          onClick={handleSendMessage}
          disabled={!inputText.trim() || isStreaming}
          loading={isStreaming}
        />
      </div>

      {/* Thanking Animation */}
      <AnimatePresence>
        {showThankingAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 1000,
            }}
          >
            <div style={{ position: 'relative' }}>
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  animate={{
                    opacity: 0,
                    x: Math.cos((i * 30 * Math.PI) / 180) * 50,
                    y: Math.sin((i * 30 * Math.PI) / 180) * 50,
                    scale: 0,
                  }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    width: '8px',
                    height: '8px',
                    background: '#FFD700',
                    borderRadius: '50%',
                    boxShadow: '0 0 10px #FFD700',
                  }}
                />
              ))}
              <div style={{ fontSize: '32px', textAlign: 'center' }}>
                ✨
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {showThankingAnimation && setTimeout(() => setShowThankingAnimation(false), 1500)}
    </div>
  );
};

export default ChatPage;