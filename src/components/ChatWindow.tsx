import { RefObject } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: number;
  text: string;
  sent: boolean;
  time: string;
  type?: 'text' | 'image' | 'video' | 'file';
  fileName?: string;
  fileUrl?: string;
}

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  online: boolean;
}

type Screen = 'welcome' | 'chats' | 'chat' | 'contacts' | 'favorites' | 'profile' | 'settings';

interface ChatScreenProps {
  chat: Chat | undefined;
  messages: Message[];
  messageText: string;
  setMessageText: (text: string) => void;
  showEmojiPicker: boolean;
  setShowEmojiPicker: (show: boolean) => void;
  emojis: string[];
  handleEmojiClick: (emoji: string) => void;
  handleSendMessage: () => void;
  fileInputRef: RefObject<HTMLInputElement>;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setCurrentScreen: (screen: Screen) => void;
  setShowVideoCall: (show: boolean) => void;
}

export const ChatScreen = ({
  chat,
  messages,
  messageText,
  setMessageText,
  showEmojiPicker,
  setShowEmojiPicker,
  emojis,
  handleEmojiClick,
  handleSendMessage,
  fileInputRef,
  handleFileUpload,
  setCurrentScreen,
  setShowVideoCall
}: ChatScreenProps) => {
  if (!chat) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex flex-col">
      <div className="bg-white/90 backdrop-blur-xl px-4 py-4 flex items-center gap-3 shadow-md">
        <Button 
          size="icon" 
          variant="ghost" 
          className="rounded-full"
          onClick={() => setCurrentScreen('chats')}
        >
          <Icon name="ArrowLeft" size={22} />
        </Button>
        
        <div className="relative">
          <Avatar className="w-11 h-11">
            <AvatarFallback className="text-xl">{chat.avatar}</AvatarFallback>
          </Avatar>
          {chat.online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{chat.name}</h3>
          <p className="text-xs text-gray-500">{chat.online ? 'онлайн' : 'был(а) недавно'}</p>
        </div>
        
        <Button 
          size="icon" 
          variant="ghost" 
          className="rounded-full"
          onClick={() => setShowVideoCall(true)}
        >
          <Icon name="Video" size={22} className="text-blue-600" />
        </Button>
        
        <Button size="icon" variant="ghost" className="rounded-full">
          <Icon name="MoreVertical" size={22} />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3 pb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sent ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}
            >
              <div
                className={`max-w-[75%] rounded-3xl px-5 py-3 shadow-md ${
                  msg.sent
                    ? 'bg-white text-gray-800 rounded-br-md'
                    : 'bg-white/95 text-gray-800 rounded-bl-md'
                }`}
              >
                {msg.type === 'image' && msg.fileUrl && (
                  <img src={msg.fileUrl} alt="Изображение" className="rounded-2xl mb-2 max-w-full" />
                )}
                {msg.type === 'video' && msg.fileUrl && (
                  <video src={msg.fileUrl} controls className="rounded-2xl mb-2 max-w-full" />
                )}
                <p className="text-base leading-relaxed">{msg.text}</p>
                <span className="text-xs text-gray-500 mt-1 block">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="bg-white/90 backdrop-blur-xl p-4">
        {showEmojiPicker && (
          <div className="mb-3 bg-white rounded-3xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">Эмодзи</h3>
              <Button 
                size="icon" 
                variant="ghost" 
                className="rounded-full h-8 w-8"
                onClick={() => setShowEmojiPicker(false)}
              >
                <Icon name="X" size={18} />
              </Button>
            </div>
            <div className="grid grid-cols-10 gap-2">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleEmojiClick(emoji)}
                  className="text-2xl hover:scale-125 transition-transform p-1 rounded-lg hover:bg-blue-50"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-3">
          <Button 
            size="icon" 
            variant="ghost" 
            className="rounded-full shrink-0"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <Icon name="Smile" size={24} className="text-blue-600" />
          </Button>
          
          <div className="flex-1 relative">
            <Input 
              placeholder="Введите сообщение..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="h-12 rounded-full bg-gray-100 border-0 pl-5 pr-12"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button 
              size="icon" 
              variant="ghost" 
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Icon name="Paperclip" size={20} className="text-gray-500" />
            </Button>
          </div>
          
          <Button 
            size="icon" 
            className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shrink-0 shadow-lg"
            onClick={handleSendMessage}
          >
            <Icon name="Send" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};
