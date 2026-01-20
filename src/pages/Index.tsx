import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { WelcomeScreen, ChatsScreen, PlaceholderScreen } from '@/components/MessengerScreens';
import { ChatScreen } from '@/components/ChatWindow';
import { ContactsScreen } from '@/components/ContactsList';
import { VideoCallDialog, BottomNav } from '@/components/VideoCallDialog';

type Screen = 'welcome' | 'chats' | 'chat' | 'contacts' | 'favorites' | 'profile' | 'settings';

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

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Привет! Как дела?', sent: false, time: '14:20', type: 'text' },
    { id: 2, text: 'Отлично! А у тебя?', sent: true, time: '14:25', type: 'text' },
    { id: 3, text: 'Давай встретимся завтра!', sent: false, time: '14:32', type: 'text' },
  ]);
  const [messageText, setMessageText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Анна Смирнова', avatar: '👩', phone: '+7 (999) 123-45-67', online: true },
    { id: 2, name: 'Иван Петров', avatar: '👨', phone: '+7 (999) 234-56-78', online: false },
    { id: 3, name: 'Мария Кузнецова', avatar: '👩‍🦰', phone: '+7 (999) 345-67-89', online: true },
    { id: 5, name: 'Дмитрий Волков', avatar: '👨‍💼', phone: '+7 (999) 456-78-90', online: false },
    { id: 6, name: 'Елена Морозова', avatar: '👩‍💻', phone: '+7 (999) 567-89-01', online: true },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [chats, setChats] = useState<Chat[]>([
    { id: 1, name: 'Анна Смирнова', lastMessage: 'Давай встретимся завтра!', time: '14:32', unread: 2, avatar: '👩', online: true },
    { id: 2, name: 'Иван Петров', lastMessage: 'Отправил тебе файлы', time: '12:15', unread: 0, avatar: '👨', online: false },
    { id: 3, name: 'Мария Кузнецова', lastMessage: '😊 Спасибо большое!', time: 'Вчера', unread: 0, avatar: '👩‍🦰', online: true },
    { id: 4, name: 'Команда проекта', lastMessage: 'Созвон перенесли на 15:00', time: 'Вчера', unread: 5, avatar: '👥', online: false },
  ]);

  const emojis = ['😊', '😂', '❤️', '👍', '🎉', '🔥', '💯', '✨', '🚀', '💪', '🤔', '😍', '🥰', '😎', '🤗', '👏', '🙌', '💕', '⭐', '🌟'];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: messageText,
        sent: true,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
      
      const updatedChats = chats.map(chat => 
        chat.id === selectedChat 
          ? { ...chat, lastMessage: messageText, time: 'Сейчас' }
          : chat
      );
      setChats(updatedChats);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'file';
      const newMessage: Message = {
        id: messages.length + 1,
        text: fileType === 'image' ? '📷 Фото' : fileType === 'video' ? '🎥 Видео' : `📎 ${file.name}`,
        sent: true,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        type: fileType,
        fileName: file.name,
        fileUrl: URL.createObjectURL(file)
      };
      setMessages([...messages, newMessage]);
      toast({
        title: "Файл отправлен",
        description: `${file.name} успешно загружен`,
      });
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setMessageText(messageText + emoji);
    setShowEmojiPicker(false);
  };

  const handleStartChat = (contactId: number) => {
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      const existingChat = chats.find(c => c.name === contact.name);
      if (existingChat) {
        setSelectedChat(existingChat.id);
        setCurrentScreen('chat');
      } else {
        const newChat: Chat = {
          id: chats.length + 1,
          name: contact.name,
          lastMessage: 'Начните общение',
          time: 'Сейчас',
          unread: 0,
          avatar: contact.avatar,
          online: contact.online
        };
        setChats([newChat, ...chats]);
        setSelectedChat(newChat.id);
        setMessages([]);
        setCurrentScreen('chat');
      }
    }
  };

  const currentChat = chats.find(c => c.id === selectedChat);

  return (
    <>
      {currentScreen === 'welcome' && <WelcomeScreen setCurrentScreen={setCurrentScreen} />}
      {currentScreen === 'chats' && (
        <ChatsScreen 
          chats={chats} 
          setSelectedChat={setSelectedChat} 
          setCurrentScreen={setCurrentScreen} 
        />
      )}
      {currentScreen === 'chat' && (
        <ChatScreen 
          chat={currentChat}
          messages={messages}
          messageText={messageText}
          setMessageText={setMessageText}
          showEmojiPicker={showEmojiPicker}
          setShowEmojiPicker={setShowEmojiPicker}
          emojis={emojis}
          handleEmojiClick={handleEmojiClick}
          handleSendMessage={handleSendMessage}
          fileInputRef={fileInputRef}
          handleFileUpload={handleFileUpload}
          setCurrentScreen={setCurrentScreen}
          setShowVideoCall={setShowVideoCall}
        />
      )}
      {currentScreen === 'contacts' && (
        <ContactsScreen 
          contacts={contacts} 
          handleStartChat={handleStartChat} 
        />
      )}
      {currentScreen === 'favorites' && <PlaceholderScreen title="Избранное" icon="Star" />}
      {currentScreen === 'profile' && <PlaceholderScreen title="Профиль" icon="User" />}
      {currentScreen === 'settings' && <PlaceholderScreen title="Настройки" icon="Settings" />}
      <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      <VideoCallDialog 
        showVideoCall={showVideoCall} 
        setShowVideoCall={setShowVideoCall} 
        chat={currentChat} 
      />
    </>
  );
};

export default Index;
