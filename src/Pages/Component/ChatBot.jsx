// src/components/ChatBot.jsx

import React, { useState, useRef, useEffect, useCallback } from 'react';
import './ChatBot.css';

// =========================================================
// CONSTANTS
// =========================================================

const WHATSAPP_NUMBER = '919384167482';
const BOT_NAME = 'Solar Assistant';

// =========================================================
// QUICK REPLIES & KNOWLEDGE BASE
// =========================================================

const quickReplies = [
  'Solar panel cost?',
  'Subsidy information',
  'EMI options',
  'Installation time',
  'Book free survey',
];

const getBotResponse = (userMessage) => {
  const msg = userMessage.toLowerCase();

  // Greetings
  if (msg.match(/^(hi|hello|hey|good\s*(morning|afternoon|evening))/)) {
    return "Hello! 👋 Welcome to Revoltant Solar Solutions. I'm your solar assistant. How can I help you today?\n\nYou can ask about:\n• Solar panel costs\n• Government subsidies\n• EMI options\n• Installation process\n• System types";
  }

  // Cost / Price
  if (msg.match(/(cost|price|rate|how much|kitna|budget|charges)/)) {
    return "💰 **Solar System Pricing (Approximate):**\n\n• 1kW: ₹45,000 – ₹65,000\n• 2kW: ₹90,000 – ₹1,20,000\n• 3kW: ₹1,35,000 – ₹1,80,000\n• 5kW: ₹2,25,000 – ₹3,00,000\n• 10kW: ₹4,50,000 – ₹6,00,000\n\n*Prices vary based on system type (On-Grid/Off-Grid/Hybrid), panel quality & location.*\n\nWould you like a customized quote? Type **'Book free survey'** or WhatsApp us directly!";
  }

  // Subsidy
  if (msg.match(/(subsidy|government|scheme|pm surya|yojana|muft)/)) {
    return "🏛️ **Government Solar Subsidy:**\n\nUnder **PM Surya Ghar Muft Bijli Yojana**:\n\n• 1kW – 2kW: Up to ₹30,000/kW\n• 3kW and above: Up to ₹78,000 total\n\n✅ We assist with:\n• Subsidy documentation\n• Application process\n• Net metering approval\n\nWant help with subsidy application? Contact us!";
  }

  // EMI / Finance
  if (msg.match(/(emi|finance|loan|installment|bank|nbfc|payment)/)) {
    return "🏦 **Solar EMI Options:**\n\n✅ Flexible financing available\n✅ Easy monthly payments\n✅ Bank & NBFC loan support\n✅ Low interest rates\n✅ Quick approval process\n\n**Example:** A ₹1.5 lakh system can start from just ₹3,000/month EMI!\n\nType **'EMI enquiry'** or click the EMI button on our homepage to check availability.";
  }

  // Installation time
  if (msg.match(/(install|time|how long|days|duration|when)/)) {
    return "⏱️ **Installation Timeline:**\n\n• **Residential (1-10kW):** 3–7 days\n• **Commercial:** 2–4 weeks\n• **Industrial:** 4–6 weeks\n\n*Timeline includes site survey, material delivery, installation & net-metering approval.*\n\nFree site survey usually within 24-48 hours!";
  }

  // Types of systems
  if (msg.match(/(on.?grid|off.?grid|hybrid|type|difference)/)) {
    return "🔋 **Solar System Types:**\n\n**1. On-Grid:**\n• Connected to utility grid\n• Net metering savings\n• No batteries needed\n• Lowest cost\n\n**2. Off-Grid:**\n• Battery backup\n• Works independently\n• Ideal for remote areas\n\n**3. Hybrid:**\n• Grid + Battery backup\n• Best of both worlds\n• Power during outages\n\nWhich type suits your needs? Ask me!";
  }

  // Savings
  if (msg.match(/(saving|save|benefit|bill|reduce|roi|return)/)) {
    return "📊 **Solar Savings Estimate:**\n\n• 1kW generates ~120 units/month\n• 3kW saves ₹2,000–₹3,500/month\n• 5kW saves ₹3,500–₹5,500/month\n• 25-year savings: ₹8–15 lakh+\n\n**ROI:** Typically 3–5 years!\n\nTry our **Solar Savings Calculator** on the homepage for personalized estimates.";
  }

  // Warranty
  if (msg.match(/(warranty|guarantee|years|protection|life)/)) {
    return "🛡️ **Warranty Coverage:**\n\n• **Solar Panels:** 25 years performance, 10-12 years product\n• **Inverters:** 5–10 years\n• **Installation:** Workmanship warranty included\n\nWe use tier-1 brands with proven reliability. Complete peace of mind!";
  }

  // Book survey
  if (msg.match(/(book|survey|visit|site|appointment|schedule|free)/)) {
    return "📅 **Book Free Site Survey!**\n\nOur team will visit your location to:\n✅ Assess rooftop area\n✅ Check sunlight exposure\n✅ Calculate optimal system size\n✅ Provide accurate quotation\n\n**To book, share:**\n• Your Name\n• Mobile Number\n• Location/City\n\nOr click below to WhatsApp us directly!";
  }

  // Contact
  if (msg.match(/(contact|call|phone|whatsapp|reach|number)/)) {
    return `📞 **Contact Revoltant Solar Solutions:**\n\n• **Phone/WhatsApp:** +91 93841 67482\n• **Email:** info@revoltantsolarsolution.in\n• **Website:** revoltantsolarsolution.in\n\n**Office Hours:**\nMon–Sat: 9:00 AM – 7:00 PM\n\nClick the WhatsApp button below to chat directly!`;
  }

  // Services
  if (msg.match(/(service|offer|provide|solution|what do you)/)) {
    return "☀️ **Our Solar Services:**\n\n1. 🏠 Rooftop Solar (Residential)\n2. 🏢 Commercial Solar\n3. 🏭 Industrial Solar\n4. 💧 Solar Water Pumps\n5. 💡 Solar Street Lights\n6. 📹 Solar Cameras\n\nAll services include installation, maintenance & support. Which service interests you?";
  }

  // Thanks
  if (msg.match(/(thank|thanks|shukriya|dhanyavad)/)) {
    return "You're welcome! 😊 Feel free to ask if you have more questions. Ready to go solar? Click the WhatsApp button or visit our contact page!";
  }

  // Default
  return "I'd be happy to help! 🤔\n\nFor detailed information, you can:\n\n1. Ask about: **cost, subsidy, EMI, installation, warranty**\n2. Try our **Savings Calculator** on homepage\n3. Click **WhatsApp** button to chat with our team\n4. Call us: **+91 93841 67482**\n\nWhat would you like to know?";
};

// =========================================================
// CHATBOT COMPONENT
// =========================================================

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Namaste! 🙏 I'm your Solar Assistant.\n\nHow can I help you today? Ask me about solar costs, subsidies, EMI, or installation!",
      sender: 'bot',
      time: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Show tooltip after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setShowTooltip(false);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const sendMessage = useCallback(
    (text) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const userMsg = {
        id: Date.now(),
        text: trimmed,
        sender: 'user',
        time: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputValue('');
      setIsTyping(true);

      // Simulate bot typing delay
      setTimeout(() => {
        const botReply = getBotResponse(trimmed);
        const botMsg = {
          id: Date.now() + 1,
          text: botReply,
          sender: 'bot',
          time: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, 800 + Math.random() * 600);
    },
    []
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      sendMessage(inputValue);
    },
    [inputValue, sendMessage]
  );

  const handleQuickReply = useCallback(
    (reply) => {
      sendMessage(reply);
    },
    [sendMessage]
  );

  const handleWhatsApp = useCallback(() => {
    const message =
      "Hello, I was chatting with your Solar Assistant and would like more information.";
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Render message text with line breaks
  const renderMessageText = (text) => {
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <>
      {/* =====================================================
          CHATBOT TOGGLE BUTTON
          ===================================================== */}
      {!isOpen && (
        <div className="chatbot-toggle-wrapper">
          {showTooltip && (
            <div className="chatbot-tooltip">
              <span>👋 Need help? Chat with us!</span>
              <button
                className="tooltip-close"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                aria-label="Close tooltip"
              >
                ×
              </button>
            </div>
          )}
          <button
            className="chatbot-toggle"
            onClick={handleOpen}
            aria-label="Open chat"
          >
            <span className="chatbot-toggle-icon">💬</span>
            <span className="chatbot-pulse"></span>
          </button>
        </div>
      )}

      {/* =====================================================
          CHATBOT WINDOW
          ===================================================== */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        {/* HEADER */}
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">
              <span>☀️</span>
              <span className="online-dot"></span>
            </div>
            <div>
              <strong>{BOT_NAME}</strong>
              <small>Online • Typically replies instantly</small>
            </div>
          </div>
          <button
            className="chatbot-close"
            onClick={handleClose}
            aria-label="Close chat"
          >
            ×
          </button>
        </div>

        {/* MESSAGES */}
        <div className="chatbot-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-message ${msg.sender === 'user' ? 'user' : 'bot'}`}
            >
              {msg.sender === 'bot' && (
                <div className="message-avatar">☀️</div>
              )}
              <div className="message-bubble">
                <div className="message-text">
                  {renderMessageText(msg.text)}
                </div>
                <span className="message-time">{formatTime(msg.time)}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-message bot">
              <div className="message-avatar">☀️</div>
              <div className="message-bubble typing">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* QUICK REPLIES */}
        {messages.length <= 2 && !isTyping && (
          <div className="chatbot-quick-replies">
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                className="quick-reply-btn"
                onClick={() => handleQuickReply(reply)}
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        {/* WHATSAPP CTA */}
        <div className="chatbot-whatsapp-bar">
          <button className="chatbot-whatsapp-btn" onClick={handleWhatsApp}>
            <span>💬</span> Chat on WhatsApp
          </button>
        </div>

        {/* INPUT */}
        <form className="chatbot-input" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            aria-label="Chat message"
          />
          <button
            type="submit"
            className="chatbot-send"
            disabled={!inputValue.trim()}
            aria-label="Send message"
          >
            ➤
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatBot;