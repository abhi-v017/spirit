import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Lottie from "lottie-react";
import animationData from "./assets/Animation - 1745248095315.json";
import { sendMessageToGemini } from "./api/geminiQueue";
import "./ChatBox.css";
import sampIcon from "./assets/sample.png";

const modes = [
  { id: 'general', title: 'General Chat 💬', description: 'Chat freely about anything!', img:'/normal.png' },
  { id: 'idols', title: 'Suggest Idols 🌟', description: 'Find inspiring idols.' , img: '/sidols.png' },
  { id: 'journey', title: 'Idol’s Journey 🛤️', description: 'Understand how they reached success.', img: '/idols.png' },
  { id: 'career', title: 'Career Help 👨‍💼', description: 'Plan your career smartly.' , img:'/help.png' },
  { id: 'strategy', title: 'Strategic Roadmap 📘', description: 'Learn their Roadmap strategies.', img: 'strategy.png' },
];

const formatText = (text) => {
  return text
    .replace(/^\*([IVXLCDM]+\..*?)\*/gm, "<h3>$1</h3>")
    .replace(/^\s*\*(.*?)\*:/gm, "<strong>$1:</strong>")
    .replace(/^\s*\*(.*?)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>")
    .replace(/\*(.*?)\*/g, "<strong>$1</strong>")
    .replace(/\n{2,}/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");
};

const WelcomeMSG = [
  "Aww yess, you're here again! 🥰🎉 Ready to talk?",
  "Something amazing is about to happen 🎁👀",
  "Let’s get creative and have some fun 🎨🚀",
  "Hey buddy! Ready to dive in? 💡🌊",
  "Hello genius 🧠✨ Let’s create some magic!",
  "Welcome back, legend! 🌟👑 Time to shine!",
  "Let’s make some sparks fly 💥✨ What’s on your mind?",
];

const Bot = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState(modes[0]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  //This function genrate a welcom
  useEffect(() => {
    const welcome = {
      id: uuidv4(),
      sender: "bot",
      text: WelcomeMSG[Math.floor(Math.random() * WelcomeMSG.length)],
    };
    setMessages([welcome]);
  }, [selectedMode.id]);

  // Prompt based on selected mode
  const getCustomPrompt = () => {
    switch (selectedMode.title) {
      case "Suggest Idols 🌟":
        return "Act like a super expert on Idols 🐱‍👤🤩 from all domains...";
      case "Idol’s Journey 🛤️":
        return "Tell inspiring life stories of idols in a motivating way 🦸‍♂️❤!";
      case "Career Help 👨‍💼":
        return "Act like a pro career guide 🎁🥳 Give suggestions with clarity.";
      case "Strategic Roadmap 📘":
        return "You're an expert strategist 👀🧠. Provide step-by-step plans.";
      default:
        return "You are a fun + intelligent friend 😎✨ Answer wisely.";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { id: uuidv4(), sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const prompt = `${getCustomPrompt()} 🧠💬 \nUser said: "${input}" \n→ Now respond in a helpful, friendly, with lotss of emojis, and concise way 🥳✨.`;
      const response = await sendMessageToGemini(prompt, selectedMode.id);

      const botMsg = { id: uuidv4(), sender: "bot", text: response };
      setMessages((prev) => [...prev, botMsg]);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { id: uuidv4(), sender: "bot", text: "❌ *Oops! Something went wrong.*" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="chatbox">
      {/* Chat Messages */}
      <div className="chatbox__messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-msg ${msg.sender}`}>
            <div
              className="chat-bubble"
              dangerouslySetInnerHTML={{ __html: formatText(msg.text) }}
            />
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="chatbox__input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? (
            <Lottie animationData={animationData} loop style={{ width: 40, height: 40 }} />
          ) : (
            "Send ➤"
          )}
        </button>
      </div>
    </div>
  );
};

export default Bot;
