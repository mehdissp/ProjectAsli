import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const ChatBot = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // پیام خوش‌آمدگویی اولیه
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          text: '👋 سلام! من مشاور املاک هوشمند هستم. چطور می‌توانم به شما کمک کنم؟',
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // اسکرول به انتهای پیام‌ها
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // فوکوس روی اینپوت هنگام باز شدن
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputMessage.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://localhost:7178/api/Chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId || 'AEB9DC46-1B5A-46C6-6000-08DEBA1EE8CE',
          message: inputMessage.trim(),
          userName: '',
          mobileNumber: '',
        }),
      });

      if (!response.ok) {
        throw new Error('خطا در ارتباط با سرور');
      }

      const data = await response.json();

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'متاسفم، پاسخی دریافت نشد.',
        isUser: false,
        timestamp: new Date(data.timestamp),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: '❌ متاسفانه ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.',
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* دکمه شناور چت */}
      <button
        className={`chat-toggle-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="چت با مشاور"
      >
        {isOpen ? (
          <span className="close-icon">✕</span>
        ) : (
          <span className="chat-icon">💬</span>
        )}
      </button>

      {/* پنجره چت */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">🤖</div>
              <div>
                <div className="chat-title">مشاور املاک هوشمند</div>
                <div className="chat-status">آنلاین</div>
              </div>
            </div>
            <button
              className="chat-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="بستن چت"
            >
              ✕
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-message ${msg.isUser ? 'user' : 'bot'}`}
              >
                <div className="message-content">
                  {!msg.isUser && <div className="message-avatar">🤖</div>}
                  <div className="message-text">{msg.text}</div>
                  {msg.isUser && <div className="message-avatar user-avatar">👤</div>}
                </div>
                <div className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString('fa-IR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message bot">
                <div className="message-content">
                  <div className="message-avatar">🤖</div>
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <textarea
              ref={inputRef}
              className="chat-input"
              placeholder="پیام خود را بنویسید..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={1}
              disabled={isLoading}
            />
            <button
              className="chat-send-btn"
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              aria-label="ارسال پیام"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;