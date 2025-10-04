
'use client';

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, User, Bot } from 'lucide-react';
import type { Message } from '@/types';
import { cn } from '@/lib/utils';

interface ChatProps {
  messages: Message[];
  onSendMessage: (text: string) => Promise<void>;
}

export function Chat({ messages, onSendMessage }: ChatProps) {
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSend = async (text: string) => {
    if (text.trim() && !isSending) {
      setIsSending(true);
      setInput('');
      await onSendMessage(text);
      setIsSending(false);
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-card border rounded-lg">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-3 w-full',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'model' && (
                <Avatar className="h-8 w-8 border flex-shrink-0">
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
              )}
              <div className={cn("flex flex-col", message.role === 'user' ? 'items-end' : 'items-start' )}>
                  <div
                    className={cn(
                      'rounded-lg px-4 py-3 max-w-[90%] whitespace-pre-wrap',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  {index === messages.length - 1 && message.role === 'model' && message.suggestions && message.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.suggestions.map((suggestion, i) => (
                           <Button 
                              key={i} 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleSuggestionClick(suggestion)}
                              disabled={isSending}
                              className="text-primary border-primary/50 hover:bg-primary/10"
                            >
                              {suggestion}
                           </Button>
                        ))}
                      </div>
                  )}
              </div>
               {message.role === 'user' && (
                <Avatar className="h-8 w-8 border flex-shrink-0">
                  <AvatarFallback><User /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isSending && messages[messages.length - 1].role === 'user' && (
             <div className="flex items-start gap-3 justify-start">
                <Avatar className="h-8 w-8 border">
                    <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
                <div className="rounded-lg px-4 py-3 max-w-sm bg-muted flex items-center space-x-2">
                    <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-primary rounded-full animate-bounce"></span>
                </div>
             </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Type your message..."
            disabled={isSending}
          />
          <Button onClick={() => handleSend(input)} disabled={isSending || !input.trim()} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
