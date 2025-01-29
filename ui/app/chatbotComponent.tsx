import React, { useState } from "react";

interface ChatbotComponentProps {
  onSendMessage: (message: string) => Promise<string>;
}

const ChatbotComponent: React.FC<ChatbotComponentProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<{ user: string; bot: string }[]>([]);

  const handleMessageSend = async () => {
    if (message.trim()) {
      // Add user message to chat history
      const newChatHistory = [...chatHistory, { user: message, bot: "..." }];
      setChatHistory(newChatHistory);
      
      // Send message to the bot and get the response
      try {
        const botReply = await onSendMessage(message);

        // Update the chat history with the bot's reply
        setChatHistory([
          ...newChatHistory.slice(0, -1),
          { user: message, bot: botReply },
        ]);
      } catch (error) {
        console.error("Error sending message:", error);
      }

      // Clear the input field
      setMessage("");
    }
  };

  return (
    <div className="mt-6 max-w-4xl mx-auto p-6 border border-gray-200 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Chat with Smart Scribe</h2>

      <div className="space-y-4 max-h-80 overflow-y-scroll p-4 bg-gray-50 border border-gray-300 rounded-lg mb-4">
        {chatHistory.map((chat, index) => (
          <div key={index}>
            <div className="text-sm font-semibold text-blue-600">You:</div>
            <div className="p-2 bg-blue-100 rounded-lg mb-2">{chat.user}</div>
            <div className="text-sm font-semibold text-green-600">Bot:</div>
            <div className="p-2 bg-green-100 rounded-lg mb-2">{chat.bot}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          rows={3}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <button
          onClick={handleMessageSend}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotComponent;
