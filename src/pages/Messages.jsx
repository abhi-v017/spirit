import React, { useState, useEffect, useRef } from 'react'
import messageService from '../services/messageService';
import { useSelector } from 'react-redux';


function Messages() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);
  const userData = useSelector(state => state.auth.userData);



  useEffect(() => {
    const fetchChats = async () => {
      const response = await messageService.getChatsService();
      setChats(response.data);
    };
    fetchChats();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedChat) {
        const response = await messageService.getMessagesService(selectedChat._id);
        setMessages(response.data);
      }
    };
    fetchMessages();
  }, [selectedChat]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await messageService.sendMessageService(selectedChat._id, input);
    setMessages([...messages, response.data]);
    setInput('');
  };

  const MessageItem = ({ message, isUser }) => {
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
        <div className={`max-w-xs p-2 rounded-lg ${isUser ? 'bg-green-200' : 'bg-gray-200'}`}>
          {message.content}
        </div>
      </div>
    );
  };

  const ChatArea = ({ messages, userData }) => {
    return (
      <div className="flex flex-col-reverse overflow-y-auto h-full p-4">
        {messages.map((msg, index) => (
          <MessageItem
            key={index}
            message={msg}
            isUser={msg.sender._id === userData._id}
          />
        ))}
        <div ref={chatEndRef} />
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-gray-300 bg-white">
        <h2 className="p-4 text-lg font-bold">Chats</h2>
        <ul>
          {chats.map((chat) => (
            <li
              key={chat._id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 cursor-pointer hover:bg-gray-200 ${selectedChat === chat ? 'bg-gray-300' : ''}`}
            >
              {chat.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="flex-1 overflow-y-auto p-4">
          <ChatArea messages={messages} userData={userData} />
        </div>
        <form onSubmit={handleSubmit} className="p-4 bg-gray-200 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 rounded-lg bg-white border border-gray-300"
            placeholder="Type a message..."
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded-lg">
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default Messages