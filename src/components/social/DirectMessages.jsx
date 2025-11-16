import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DirectMessages({ currentUserId }) {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  // Mock data
  useEffect(() => {
    setConversations([
      {
        id: 1,
        participant: { id: 2, name: 'Alice Johnson', avatar: 'A', status: 'online' },
        lastMessage: 'Hey, are you free for tutoring?',
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        unread: 2
      },
      {
        id: 2,
        participant: { id: 3, name: 'Bob Smith', avatar: 'B', status: 'offline' },
        lastMessage: 'Thanks for the notes!',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        unread: 0
      },
      {
        id: 3,
        participant: { id: 4, name: 'Carol Davis', avatar: 'C', status: 'online' },
        lastMessage: 'The laundry service was great!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        unread: 1
      }
    ]);

    // Mock messages for first conversation
    setMessages([
      { id: 1, senderId: 2, text: 'Hi! I saw you offer tutoring services', timestamp: new Date(Date.now() - 1000 * 60 * 10) },
      { id: 2, senderId: currentUserId, text: 'Yes, I do! What subject do you need help with?', timestamp: new Date(Date.now() - 1000 * 60 * 9) },
      { id: 3, senderId: 2, text: 'Math and Physics. Are you available tomorrow?', timestamp: new Date(Date.now() - 1000 * 60 * 8) },
      { id: 4, senderId: currentUserId, text: 'Absolutely! What time works for you?', timestamp: new Date(Date.now() - 1000 * 60 * 7) },
      { id: 5, senderId: 2, text: 'Around 2 PM? I have classes until then.', timestamp: new Date(Date.now() - 1000 * 60 * 6) },
      { id: 6, senderId: currentUserId, text: 'Perfect! See you then at the library.', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
      { id: 7, senderId: 2, text: 'Hey, are you free for tutoring?', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
    ]);
  }, [currentUserId]);

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
      senderId: currentUserId,
      text: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Update conversation
    setConversations(prev => prev.map(conv =>
      conv.id === activeConversation
        ? { ...conv, lastMessage: newMessage, timestamp: new Date(), unread: 0 }
        : conv
    ));

    // Simulate reply after 2-4 seconds
    setTimeout(() => {
      const replies = [
        "Thanks for the quick response!",
        "That sounds great!",
        "I'll be there. Thanks!",
        "Perfect timing!",
        "Appreciate your help!",
        "See you soon!"
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      const replyMessage = {
        id: messages.length + 2,
        senderId: activeConversation.participant.id,
        text: randomReply,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, replyMessage]);
    }, 2000 + Math.random() * 2000);
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

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
        <p className="text-gray-400">Chat with friends and service providers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <div className="lg:col-span-1 bg-[#0f0f0f] border border-gray-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-800">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-lime-400"
            />
          </div>

          <div className="overflow-y-auto h-full">
            {filteredConversations.map((conversation) => (
              <motion.div
                key={conversation.id}
                whileHover={{ backgroundColor: 'rgba(163, 230, 53, 0.1)' }}
                onClick={() => setActiveConversation(conversation)}
                className={`p-4 border-b border-gray-800 cursor-pointer transition-colors ${
                  activeConversation?.id === conversation.id ? 'bg-lime-400/10 border-lime-400/50' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {conversation.participant.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#0f0f0f] ${
                      conversation.participant.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                    }`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-semibold truncate">
                        {conversation.participant.name}
                      </h3>
                      <span className="text-gray-400 text-sm">
                        {formatTime(conversation.timestamp)}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>

                  {conversation.unread > 0 && (
                    <div className="bg-lime-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      {conversation.unread}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2 bg-[#0f0f0f] border border-gray-800 rounded-xl flex flex-col">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {activeConversation.participant.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0f0f0f] ${
                      activeConversation.participant.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{activeConversation.participant.name}</h3>
                    <p className="text-gray-400 text-sm">
                      {activeConversation.participant.status === 'online' ? 'Active now' : 'Offline'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                        message.senderId === currentUserId
                          ? 'bg-lime-400 text-black'
                          : 'bg-gray-800 text-white'
                      }`}
                    >
                      {message.text}
                      <div className={`text-xs mt-1 ${
                        message.senderId === currentUserId ? 'text-black/70' : 'text-gray-400'
                      }`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-800">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-lime-400"
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
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-xl font-semibold text-white mb-2">Select a conversation</h3>
                <p className="text-gray-400">Choose a friend to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}