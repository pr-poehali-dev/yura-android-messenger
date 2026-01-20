import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

type Screen = 'welcome' | 'chats' | 'chat' | 'contacts' | 'favorites' | 'profile' | 'settings';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const mockChats = [
    { id: 1, name: 'Анна Смирнова', lastMessage: 'Давай встретимся завтра!', time: '14:32', unread: 2, avatar: '👩', online: true },
    { id: 2, name: 'Иван Петров', lastMessage: 'Отправил тебе файлы', time: '12:15', unread: 0, avatar: '👨', online: false },
    { id: 3, name: 'Мария Кузнецова', lastMessage: '😊 Спасибо большое!', time: 'Вчера', unread: 0, avatar: '👩‍🦰', online: true },
    { id: 4, name: 'Команда проекта', lastMessage: 'Созвон перенесли на 15:00', time: 'Вчера', unread: 5, avatar: '👥', online: false },
  ];

  const mockMessages = [
    { id: 1, text: 'Привет! Как дела?', sent: false, time: '14:20' },
    { id: 2, text: 'Отлично! А у тебя?', sent: true, time: '14:25' },
    { id: 3, text: 'Давай встретимся завтра!', sent: false, time: '14:32' },
  ];

  const WelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.4),transparent_50%)]"></div>
      
      <div className="relative bg-white/95 backdrop-blur-xl rounded-[3rem] p-12 shadow-[0_20px_60px_rgba(0,0,0,0.15)] max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-[2.5rem] flex items-center justify-center shadow-[0_15px_35px_rgba(59,130,246,0.4)]">
            <Icon name="MessageCircle" size={64} className="text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">MESSENGER</h1>
        <p className="text-gray-600 mb-12 text-lg">
          Общайтесь легко и просто. Делитесь эмоциями с помощью стикеров и эмодзи!
        </p>
        
        <Button 
          onClick={() => setCurrentScreen('chats')}
          className="w-full h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-lg rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          НАЧАТЬ
        </Button>
        
        <p className="text-gray-500 mt-6 text-sm">Присоединяйтесь к миллионам пользователей</p>
      </div>
    </div>
  );

  const ChatsScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-20">
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-6 pt-6 pb-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 border-2 border-blue-400">
              <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white">👤</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-bold text-xl text-gray-800">Чаты</h2>
              <p className="text-xs text-gray-500">Ваше имя</p>
            </div>
          </div>
          <Button size="icon" variant="ghost" className="rounded-full">
            <Icon name="Search" size={22} />
          </Button>
        </div>
        
        <div className="relative">
          <Input 
            placeholder="Поиск чатов..." 
            className="h-12 rounded-full bg-gray-100 border-0 pl-12 pr-4 text-base"
          />
          <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="px-4 pt-4 space-y-2">
        {mockChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => {
              setSelectedChat(chat.id);
              setCurrentScreen('chat');
            }}
            className="bg-white rounded-3xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer active:scale-98"
          >
            <div className="relative">
              <Avatar className="w-14 h-14">
                <AvatarFallback className="text-2xl">{chat.avatar}</AvatarFallback>
              </Avatar>
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-800 truncate">{chat.name}</h3>
                <span className="text-xs text-gray-500 ml-2">{chat.time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
            </div>
            
            {chat.unread > 0 && (
              <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full min-w-[24px] h-6 flex items-center justify-center">
                {chat.unread}
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const ChatScreen = () => {
    const chat = mockChats.find(c => c.id === selectedChat);
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
          
          <Button size="icon" variant="ghost" className="rounded-full">
            <Icon name="MoreVertical" size={22} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {mockMessages.map((msg) => (
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
                <p className="text-base leading-relaxed">{msg.text}</p>
                <span className="text-xs text-gray-500 mt-1 block">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/90 backdrop-blur-xl p-4 flex items-center gap-3">
          <Button size="icon" variant="ghost" className="rounded-full shrink-0">
            <Icon name="Smile" size={24} className="text-blue-600" />
          </Button>
          
          <div className="flex-1 relative">
            <Input 
              placeholder="Введите сообщение..."
              className="h-12 rounded-full bg-gray-100 border-0 pl-5 pr-12"
            />
            <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full">
              <Icon name="Paperclip" size={20} className="text-gray-500" />
            </Button>
          </div>
          
          <Button size="icon" className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shrink-0 shadow-lg">
            <Icon name="Send" size={20} />
          </Button>
        </div>
      </div>
    );
  };

  const BottomNav = () => {
    if (currentScreen === 'welcome' || currentScreen === 'chat') return null;

    const navItems = [
      { id: 'chats', icon: 'MessageCircle', label: 'Чаты' },
      { id: 'contacts', icon: 'Users', label: 'Контакты' },
      { id: 'favorites', icon: 'Star', label: 'Избранное' },
      { id: 'profile', icon: 'User', label: 'Профиль' },
      { id: 'settings', icon: 'Settings', label: 'Настройки' },
    ];

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 px-2 py-3 z-50">
        <div className="flex items-center justify-around max-w-2xl mx-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id as Screen)}
              className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-300 ${
                currentScreen === item.id
                  ? 'text-blue-600'
                  : 'text-gray-500'
              }`}
            >
              <div className={`p-2 rounded-full transition-all ${currentScreen === item.id ? 'bg-blue-100' : ''}`}>
                <Icon name={item.icon as any} size={22} />
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const PlaceholderScreen = ({ title, icon }: { title: string; icon: string }) => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center p-6 pb-24">
      <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-[2.5rem] flex items-center justify-center shadow-lg mb-6">
        <Icon name={icon as any} size={64} className="text-white" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-3">{title}</h2>
      <p className="text-gray-600 text-center max-w-sm">
        Этот раздел в разработке. Скоро здесь появится много интересного!
      </p>
    </div>
  );

  return (
    <>
      {currentScreen === 'welcome' && <WelcomeScreen />}
      {currentScreen === 'chats' && <ChatsScreen />}
      {currentScreen === 'chat' && <ChatScreen />}
      {currentScreen === 'contacts' && <PlaceholderScreen title="Контакты" icon="Users" />}
      {currentScreen === 'favorites' && <PlaceholderScreen title="Избранное" icon="Star" />}
      {currentScreen === 'profile' && <PlaceholderScreen title="Профиль" icon="User" />}
      {currentScreen === 'settings' && <PlaceholderScreen title="Настройки" icon="Settings" />}
      <BottomNav />
    </>
  );
};

export default Index;
