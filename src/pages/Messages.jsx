import React, { useState } from 'react'


function Messages() {
  const [messages, setMessages] = useState({
    'Chat 1': [],
    'Chat 2': [],
    'Chat 3': [],
  });
  const [selectedChat, setSelectedChat] = useState('Chat 1');
  const [input, setInput] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedChat]: [...prevMessages[selectedChat], input],
      }));
      setInput('');
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Chat List */}
      <div className="w-1/3 border-r border-zinc-800">
        <h2 className="p-4 text-lg font-bold">Chats</h2>
        <ul>
          {Object.keys(messages).map((chat) => (
            <li
              key={chat}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 cursor-pointer hover:bg-zinc-800 ${selectedChat === chat ? 'bg-zinc-700' : ''
                }`}
            >
              {chat}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {messages[selectedChat].map((msg, index) => (
            <div key={index} className="my-2 p-2 bg-zinc-900 rounded-lg">
              {msg}
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="p-4 bg-zinc-800 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 rounded-lg bg-zinc-700 text-white"
            placeholder="Type a message..."
          />
          <button type="submit" className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
            <path d="M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z" stroke="#ffffff" stroke-width="1.5"></path>
            <path d="M11.5 12.5L15 9" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg></button>
        </form>
      </div>
    </div>
  )
}

export default Messages
