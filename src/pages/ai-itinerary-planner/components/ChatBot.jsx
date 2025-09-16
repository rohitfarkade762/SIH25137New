import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);


const ChatBot = ({ isOpen, onToggle, currentLanguage = 'en' }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const languages = {
    en: {
      title: 'Travel Assistant',
      placeholder: 'Ask me about your travel plans...',
      send: 'Send',
      typing: 'Assistant is typing...'
    },
    hi: {
      title: 'यात्रा सहायक',
      placeholder: 'अपनी यात्रा योजनाओं के बारे में पूछें...',
      send: 'भेजें',
      typing: 'सहायक टाइप कर रहा है...'
    },
    ta: {
      title: 'பயண உதவியாளர்',
      placeholder: 'உங்கள் பயணத் திட்டங்களைப் பற்றி கேளுங்கள்...',
      send: 'அனுப்பு',
      typing: 'உதவியாளர் தட்டச்சு செய்கிறார்...'
    }
  };

  const currentLang = languages?.[currentLanguage] || languages?.en;

  const initialMessages = [
    {
      id: 1,
      type: 'bot',
      content: currentLanguage === 'hi' 
        ? "नमस्ते! मैं आपका AI यात्रा सहायक हूं। मैं आपको भारत में सबसे अच्छे गंतव्यों, होटलों और गतिविधियों के बारे में जानकारी दे सकता हूं।"
        : currentLanguage === 'ta'
        ? "வணக்கம்! நான் உங்கள் AI பயண உதவியாளர். இந்தியாவில் சிறந்த இடங்கள், ஹோட்டல்கள் மற்றும் செயல்பாடுகள் பற்றி உங்களுக்கு உதவ முடியும்." :"Hello! I'm your AI travel assistant. I can help you discover the best destinations, hotels, and activities across India.",
      timestamp: new Date()
    }
  ];

  useEffect(() => {
    if (messages?.length === 0) {
      setMessages(initialMessages);
    }
  }, [currentLanguage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputMessage?.trim()) return;
  
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
  
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
  
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `You are a helpful travel assistant for "India". Answer in ${currentLanguage} language. Question: ${inputMessage}. Answer should be presise`;
  
      const result = await model.generateContent(prompt);
  
      // ✅ Safely extract text
      let botResponse = "⚠️ Sorry, I couldn’t understand that.";
      if (result?.response?.candidates?.length > 0) {
        botResponse = result.response.text();
      }
  
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
  
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 2,
          type: 'bot',
          content: "⚠️ Gemini API request failed. Check your API key or network.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsTyping(false);
    }

    /*e?.preventDefault();
    if (!inputMessage?.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);*/

    // Simulate AI response
    /*setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage, currentLanguage);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);*/
  };

  const generateBotResponse = (userInput, language) => {
    const input = userInput?.toLowerCase();
    
    if (language === 'hi') {
      if (input?.includes('गोवा') || input?.includes('goa')) {
        return "गोवा एक शानदार गंतव्य है! यहां आप समुद्री तट, पुर्तगाली वास्तुकला और स्वादिष्ट समुद्री भोजन का आनंद ले सकते हैं। बेस्ट टाइम: नवंबर से मार्च तक।";
      }
      if (input?.includes('राजस्थान') || input?.includes('rajasthan')) {
        return "राजस्थान में जयपुर, उदयपुर, और जोधपुर जैसे शाही शहर हैं। यहां आप महलों, किलों और रंगीन बाजारों का अनुभव कर सकते हैं।";
      }
      return "मैं आपकी यात्रा योजना में मदद कर सकता हूं। कृपया बताएं कि आप कहां जाना चाहते हैं या किस प्रकार की गतिविधियों में रुचि रखते हैं?";
    }
    
    if (language === 'ta') {
      if (input?.includes('கேரளா') || input?.includes('kerala')) {
        return "கேரளா 'கடவுளின் சொந்த நாடு' என்று அழைக்கப்படுகிறது. இங்கே பேக்வாட்டர்ஸ், மலைகள் மற்றும் ஆயுர்வேத சிகிச்சைகள் உள்ளன।";
      }
      if (input?.includes('தமிழ்நாடு') || input?.includes('tamil nadu')) {
        return "தமிழ்நாட்டில் மதுரை, தஞ்சாவூர் மற்றும் கன்னியாகுமரி போன்ற அற்புதமான இடங்கள் உள்ளன। கோயில் கட்டிடக்கலை மற்றும் கலாச்சாரம் சிறப்பானது.";
      }
      return "உங்கள் பயணத் திட்டத்தில் உதவ நான் இங்கே இருக்கிறேன். எங்கு செல்ல விரும்புகிறீர்கள் அல்லது எந்த வகையான செயல்பாடுகளில் ஆர்வம் உள்ளது என்று சொல்லுங்கள்?";
    }

    // English responses
    if (input?.includes('goa')) {
      return "Goa is perfect for beaches, Portuguese architecture, and seafood! Best time to visit is November to March. I can help you plan activities like water sports, heritage walks, and beach hopping.";
    }
    if (input?.includes('rajasthan')) {
      return "Rajasthan offers royal experiences in Jaipur, Udaipur, and Jodhpur. You can explore palaces, forts, and vibrant markets. The Golden Triangle route is very popular!";
    }
    if (input?.includes('kerala')) {
      return "Kerala is 'God's Own Country' with backwaters, hill stations, and Ayurvedic treatments. Alleppey houseboats and Munnar tea gardens are must-visits!";
    }
    if (input?.includes('budget')) {
      return "I can help you plan according to your budget! Budget trips start from ₹5,000 per person, mid-range from ₹20,000, and luxury experiences from ₹1,00,000. What's your preferred budget range?";
    }
    if (input?.includes('food') || input?.includes('cuisine')) {
      return "Indian cuisine varies by region! Try street food in Delhi, seafood in Goa, thali in Gujarat, and dosas in South India. I can recommend food tours and cooking classes too!";
    }
    
    return "I'm here to help plan your perfect Indian adventure! You can ask me about destinations, activities, budget planning, best travel times, or cultural experiences. What interests you most?";
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          variant="default"
          size="lg"
          onClick={onToggle}
          className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          iconName="MessageCircle"
        >
          Chat Assistant
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-card border border-border rounded-xl shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-white rounded-t-xl">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Icon name="Bot" size={18} />
          </div>
          <div>
            <h3 className="font-semibold">{currentLang?.title}</h3>
            <p className="text-xs opacity-90">Online now</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="text-white hover:bg-white/20"
        >
          <Icon name="X" size={18} />
        </Button>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message) => (
          <div
            key={message?.id}
            className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message?.type === 'user' ?'bg-primary text-white' :'bg-muted text-foreground'
              }`}
            >
              <p className="text-sm">{message?.content}</p>
              <p className={`text-xs mt-1 ${
                message?.type === 'user' ? 'text-white/70' : 'text-muted-foreground'
              }`}>
                {formatTime(message?.timestamp)}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-muted-foreground">{currentLang?.typing}</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <div className="p-4 border-t border-border">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e?.target?.value)}
            placeholder={currentLang?.placeholder}
            className="flex-1"
            disabled={isTyping}
          />
          <Button
            type="submit"
            variant="default"
            size="sm"
            disabled={!inputMessage?.trim() || isTyping}
            iconName="Send"
          >
            {currentLang?.send}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;