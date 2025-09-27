import React, { useState } from 'react';
import { X, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialMessages: Message[] = [
  {
    id: '1',
    content: 'Hello! I\'m your RetailQ AI assistant. How can I help you today?',
    sender: 'bot',
    timestamp: new Date(),
  },
];

export const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('product') || message.includes('item')) {
      return 'I can help you find products! You can browse our catalog, filter by categories, or search for specific items. What type of product are you looking for?';
    }
    if (message.includes('order') || message.includes('purchase')) {
      return 'For order assistance, I can help you track orders, process returns, or answer questions about your purchases. Do you have an order number?';
    }
    if (message.includes('price') || message.includes('cost')) {
      return 'All our prices are displayed in Indian Rupees (INR). We offer competitive pricing and frequent discounts. Are you looking for something specific?';
    }
    if (message.includes('shipping') || message.includes('delivery')) {
      return 'We offer free shipping on orders above ₹500 and express delivery options. Typical delivery time is 2-5 business days depending on your location.';
    }
    if (message.includes('return') || message.includes('refund')) {
      return 'We have a 30-day return policy for most items. Returns are free and refunds are processed within 5-7 business days. Would you like help with a return?';
    }
    
    return 'Thank you for your message! I\'m here to help with product information, orders, pricing, shipping, and more. How can I assist you today?';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-card border border-border rounded-lg shadow-xl z-50 flex flex-col animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-accent text-accent-foreground">
              <Bot className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-sm">RetailQ Assistant</h3>
            <p className="text-xs text-muted-foreground">Online now</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1"
          />
          <Button size="sm" onClick={sendMessage} disabled={!inputValue.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};