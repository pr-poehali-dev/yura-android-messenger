import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Contact {
  id: number;
  name: string;
  avatar: string;
  phone: string;
  online: boolean;
}

interface ContactsScreenProps {
  contacts: Contact[];
  handleStartChat: (contactId: number) => void;
}

export const ContactsScreen = ({ contacts, handleStartChat }: ContactsScreenProps) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-20">
    <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-6 pt-6 pb-4 sticky top-0 z-10">
      <h2 className="font-bold text-xl text-gray-800 mb-4">Контакты</h2>
      <div className="relative">
        <Input 
          placeholder="Поиск контактов..." 
          className="h-12 rounded-full bg-gray-100 border-0 pl-12 pr-4 text-base"
        />
        <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </div>

    <div className="px-4 pt-4 space-y-2">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="bg-white rounded-3xl p-4 flex items-center gap-4 shadow-sm"
        >
          <div className="relative">
            <Avatar className="w-14 h-14">
              <AvatarFallback className="text-2xl">{contact.avatar}</AvatarFallback>
            </Avatar>
            {contact.online && (
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800">{contact.name}</h3>
            <p className="text-sm text-gray-600">{contact.phone}</p>
          </div>
          
          <Button 
            size="icon" 
            className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shrink-0"
            onClick={() => handleStartChat(contact.id)}
          >
            <Icon name="MessageCircle" size={20} />
          </Button>
        </div>
      ))}
    </div>
  </div>
);
