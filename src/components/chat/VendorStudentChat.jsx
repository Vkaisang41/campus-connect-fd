import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VendorStudentChat({ currentUser, targetUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock initial conversation
  useEffect(() => {
    const mockMessages = [
      {
        id: 1,
        senderId: targetUser.id,
        senderName: targetUser.name,
        senderRole: targetUser.role,
        text: `Hi! I'm interested in your ${targetUser.role === 'vendor' ? 'services' : 'requirements'}. Can we discuss?`,
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
        read: true
      },
      {
        id: 2,
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderRole: currentUser.role,
        text: `Hello! Yes, I'd love to discuss. What would you like to know?`,
        timestamp: new Date(Date.now() - 1000 * 60 * 9),
        read: true
      },
      {
        id: 3,
        senderId: targetUser.id,
        senderName: targetUser.name,
        senderRole: targetUser.role,
        text: targetUser.role === 'vendor'
          ? "I have some specific requirements for my project. Can you provide a quote?"
          : "I'd be happy to provide a customized quote. What are your specific needs?",
        timestamp: new Date(Date.now() - 1000 * 60 * 8),
        read: true
      }
    ];
    setMessages(mockMessages);
  }, [currentUser, targetUser]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      text: newMessage,
      timestamp: new Date(),
      read: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate response
    setTimeout(() => {
      const responses = targetUser.role === 'vendor' ? [
        "That sounds great! Let me prepare a detailed proposal for you.",
        "I can definitely help with that. When would you like to get started?",
        "Perfect! I have experience with similar projects. Let's discuss the timeline.",
        "I'd be happy to provide samples of my previous work.",
        "Let me check my availability for this week.",
        "That works for me. Should we schedule a call to discuss details?"
      ] : [
        "I'm looking for someone experienced in this area.",
        "What's your typical timeline for projects like this?",
        "Do you have any examples of similar work you've done?",
        "What's included in your pricing?",
        "Can you provide references from previous clients?",
        "When would be the best time to discuss this further?"
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const responseMessage = {
        id: messages.length + 2,
        senderId: targetUser.id,
        senderName: targetUser.name,
        senderRole: targetUser.role,
        text: randomResponse,
        timestamp: new Date(),
        read: false
      };

      setMessages(prev => [...prev, responseMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  const getRoleColor = (role) => {
    return role === 'vendor' ? 'bg-blue-500' : 'bg-green-500';
  };

  return (
    <div className="flex flex-col h-full max-h-screen bg-[#0f0f0f]">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-lime-400 to-blue-500 p-4 text-white flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
              {targetUser.name.charAt(0)}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
              targetUser.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
            }`} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{targetUser.name}</h3>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs text-white ${getRoleColor(targetUser.role)}`}>
                {targetUser.role}
              </span>
              <span className="text-sm opacity-90">
                {targetUser.status === 'online' ? 'Active now' : 'Offline'}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90">
              {targetUser.role === 'vendor' ? 'Service Provider' : 'Student'}
            </div>
            {targetUser.rating && (
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400">★</span>
                <span className="text-sm">{targetUser.rating}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex items-start space-x-2 max-w-[85%]">
              {message.senderId !== currentUser.id && (
                <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {message.senderName.charAt(0)}
                </div>
              )}

              <div
                className={`px-4 py-3 rounded-2xl text-sm ${
                  message.senderId === currentUser.id
                    ? 'bg-lime-400 text-black ml-auto'
                    : 'bg-gray-800 text-white'
                }`}
              >
                {message.senderId !== currentUser.id && (
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-xs text-lime-400">
                      {message.senderName}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-xs text-white ${getRoleColor(message.senderRole)}`}>
                      {message.senderRole}
                    </span>
                  </div>
                )}
                <p className="leading-relaxed">{message.text}</p>
                <div className={`text-xs mt-2 ${
                  message.senderId === currentUser.id ? 'text-black/70' : 'text-gray-400'
                }`}>
                  {formatTime(message.timestamp)}
                  {message.senderId === currentUser.id && (
                    <span className="ml-2">
                      {message.read ? '✓✓' : '✓'}
                    </span>
                  )}
                </div>
              </div>
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
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {targetUser.name.charAt(0)}
              </div>
              <div className="bg-gray-800 px-4 py-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-800 flex-shrink-0">
        <div className="flex space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message ${targetUser.name}...`}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-lime-400"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="px-6 py-3 bg-lime-400 text-black rounded-lg font-semibold hover:bg-lime-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </motion.button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-3">
          <button className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs hover:bg-gray-700 transition-colors">
            📅 Schedule Meeting
          </button>
          <button className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs hover:bg-gray-700 transition-colors">
            💰 Request Quote
          </button>
          <button className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs hover:bg-gray-700 transition-colors">
            📎 Share Files
          </button>
          <button className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs hover:bg-gray-700 transition-colors">
            ⭐ Leave Review
          </button>
        </div>
      </div>
    </div>
  );
}