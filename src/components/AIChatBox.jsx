import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';

export default function AIChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm CampusAI, your campus assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const clearMessages = () => {
    setMessages([
      {
        id: 1,
        text: "Hi! I'm CampusAI, your campus assistant. How can I help you today?",
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage.toLowerCase();
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response with contextual replies
    setTimeout(() => {
      let aiResponse = "";

      // Check for keywords and provide contextual responses
      if (currentInput.includes('laundry') || currentInput.includes('wash') || currentInput.includes('clean')) {
        aiResponse = "I can help you find laundry services on campus! We have CleanWave Laundry (KES 250/kg) and FreshWash Laundry (KES 300/kg) with great ratings. Both offer quick turnaround and quality care. Would you like me to show you more details or help you book?";
      } else if (currentInput.includes('print') || currentInput.includes('printing') || currentInput.includes('document')) {
        aiResponse = "For printing services, I recommend SwiftPrint (KES 10/page) or PrintMaster Pro (KES 8/page). They offer high-quality printing with color options and bulk discounts. Both are available Monday-Saturday. Need help with a specific print job?";
      } else if (currentInput.includes('tutor') || currentInput.includes('study') || currentInput.includes('help') || currentInput.includes('math') || currentInput.includes('science')) {
        aiResponse = "Looking for tutoring? TutorHub (KES 500/hr) and StudySmart Tutors (KES 600/hr) are excellent choices. They cover all subjects and offer personalized learning plans. Available 7 days a week. What subject do you need help with?";
      } else if (currentInput.includes('food') || currentInput.includes('eat') || currentInput.includes('cafe') || currentInput.includes('coffee')) {
        aiResponse = "Hungry? Check out Brew & Study Cafe (KES 150-400) or JavaHub (KES 200-500). They serve fresh coffee, snacks, and meals perfect for study breaks. Both are open daily with extended hours.";
      } else if (currentInput.includes('bike') || currentInput.includes('cycle') || currentInput.includes('transport')) {
        aiResponse = "Need transportation? Campus Cycles (KES 100/hr) and PedalPower (KES 150/hr) offer bike rentals with helmets and locks included. Great for getting around campus sustainably!";
      } else if (currentInput.includes('tech') || currentInput.includes('computer') || currentInput.includes('repair') || currentInput.includes('it')) {
        aiResponse = "For tech support, IT Solutions (KES 750/hr) and TechFix Solutions (KES 800/hr) provide computer repair, software installation, and technical assistance. Certified technicians available Monday-Friday.";
      } else if (currentInput.includes('photo') || currentInput.includes('photography') || currentInput.includes('camera')) {
        aiResponse = "Professional photography services available from Campus Capture (KES 1,250-5,000/session) and LensCraft Studio (KES 1,750-6,000/session). Perfect for events, portraits, and campus activities.";
      } else if (currentInput.includes('book') || currentInput.includes('bind') || currentInput.includes('thesis')) {
        aiResponse = "Need book binding? Academic Binders (KES 250-750) and BindPro Services (KES 400-1,000) offer professional binding for theses, dissertations, and course materials. Available Monday-Friday.";
      } else if (currentInput.includes('car') || currentInput.includes('wash') || currentInput.includes('auto')) {
        aiResponse = "Car wash services: Sparkle Auto (KES 750/car) and AquaClean Auto (KES 600/car). Eco-friendly options with premium wax and interior cleaning available.";
      } else if (currentInput.includes('help') || currentInput.includes('what') || currentInput.includes('how')) {
        aiResponse = "I'm here to help with campus services! I can assist with finding laundry, printing, tutoring, food, transportation, tech support, photography, book binding, and car wash services. You can also ask about pricing, availability, or reviews. What do you need?";
      } else if (currentInput.includes('book') || currentInput.includes('schedule') || currentInput.includes('appointment')) {
        aiResponse = "To book a service, you can browse our services page or ask me for recommendations. Most vendors accept M-Pesa payments and offer flexible scheduling. Would you like me to guide you to a specific service category?";
      } else {
        const generalResponses = [
          "I can help you find the best services on campus! What are you looking for?",
          "Try searching for services in your area, or ask me about specific needs like food delivery, printing, or tutoring.",
          "I can help you compare prices, check availability, and read reviews from other students. What service interests you?",
          "Need help with laundry, printing, tutoring, or any other campus service? I'm here to assist!",
          "Browse our wide range of services including food, transportation, tech support, and more. How can I help you today?"
        ];
        aiResponse = generalResponses[Math.floor(Math.random() * generalResponses.length)];
      }

      const aiMessage = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gradient-to-r from-lime-400 to-blue-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        >
          {isOpen ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-96 h-[28rem] bg-[#0f0f0f] border border-gray-800 rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-lime-400 to-blue-500 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">CampusAI Assistant</h3>
                    <p className="text-xs opacity-90">Always here to help</p>
                  </div>
                </div>
                <button
                  onClick={clearMessages}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  title="Clear chat"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex flex-col space-y-1 max-w-[80%]">
                    <div
                      className={`p-3 rounded-2xl text-sm shadow-sm ${
                        message.sender === 'user'
                          ? 'bg-lime-400 text-black rounded-br-md'
                          : 'bg-gray-800 text-white rounded-bl-md'
                      }`}
                    >
                      {message.text}
                    </div>
                    <span className={`text-xs text-gray-500 px-2 ${
                      message.sender === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {dayjs(message.timestamp).format('HH:mm')}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-800 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-800 bg-gray-900/50">
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about campus services..."
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/20 text-sm transition-all"
                  />
                  {inputMessage && (
                    <button
                      onClick={() => setInputMessage('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="px-4 py-3 bg-gradient-to-r from-lime-400 to-lime-500 text-black rounded-xl hover:from-lime-500 hover:to-lime-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-lime-400 disabled:hover:to-lime-500 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}