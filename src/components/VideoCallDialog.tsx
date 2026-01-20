import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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

interface VideoCallDialogProps {
  showVideoCall: boolean;
  setShowVideoCall: (show: boolean) => void;
  chat: Chat | undefined;
}

interface BottomNavProps {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
}

export const VideoCallDialog = ({ showVideoCall, setShowVideoCall, chat }: VideoCallDialogProps) => {
  return (
    <Dialog open={showVideoCall} onOpenChange={setShowVideoCall}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-blue-500 to-blue-600 border-0 text-white">
        <DialogHeader>
          <DialogTitle className="text-center text-white">Видеозвонок</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-6">
          <Avatar className="w-32 h-32 border-4 border-white/30">
            <AvatarFallback className="text-6xl bg-white/20">{chat?.avatar}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">{chat?.name}</h3>
            <p className="text-blue-100">Идёт звонок...</p>
          </div>
          <div className="flex gap-4 mt-4">
            <Button 
              size="icon"
              className="rounded-full w-16 h-16 bg-red-500 hover:bg-red-600"
              onClick={() => setShowVideoCall(false)}
            >
              <Icon name="PhoneOff" size={28} />
            </Button>
            <Button 
              size="icon"
              className="rounded-full w-16 h-16 bg-white/20 hover:bg-white/30"
            >
              <Icon name="Mic" size={28} />
            </Button>
            <Button 
              size="icon"
              className="rounded-full w-16 h-16 bg-white/20 hover:bg-white/30"
            >
              <Icon name="Video" size={28} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const BottomNav = ({ currentScreen, setCurrentScreen }: BottomNavProps) => {
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
