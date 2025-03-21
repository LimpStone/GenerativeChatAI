'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
interface ChatListProps {
  selectedChat: string | null;
  setSelectedChat: (chat: string) => void;
}

// Only show a single chat for Novia
const chats = [
  {
    id: '1',
    name: 'Novika Otaku (¬3¬)r',
    lastMessage: '',
    time: 'En línea',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnkMyNpgnrdHqiaG28sG6nyxiMJfgAXDgqbg&s',
    unread: false
  }
];

export default function ChatList({ selectedChat, setSelectedChat }: ChatListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotification, setShowNotification] = useState(true);

  // Filter chats based on search term
  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Search bar */}
      <div className="p-2 bg-[#111b21]">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8696a0]">
            <Search size={18} />
          </div>
          <Input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#202c33] text-[#d1d7db] pl-10 py-1.5 border-none focus:ring-0 placeholder:text-[#8696a0] rounded-lg"
          />
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col">
          {/* Tabs */}
          <div className="flex text-sm font-medium text-[#8696a0] border-b border-[#222d34]">
            <div className="px-3 py-4 cursor-pointer bg-[#00a884] text-white">Todos</div>
            <div className="px-3 py-4 cursor-pointer">No leídos</div>
            <div className="px-3 py-4 cursor-pointer">Favoritos</div>
            <div className="px-3 py-4 cursor-pointer">Grupos</div>
          </div>

          {/* Notification Banner */}
          {showNotification && (
            <div className="bg-[#182229] p-4 flex items-start space-x-4">
              <div className="bg-[#00a884] rounded-full p-2 flex-shrink-0">
                <span className="text-white">🔔</span>
              </div>
              <div className="flex-1">
                <h4 className="text-[#e9edef] text-sm font-medium">Activa las notificaciones</h4>
                <p className="text-[#8696a0] text-xs">Recibe notificaciones de nuevos mensajes en tu computadora.</p>
                <button className="text-[#53bdeb] text-xs mt-2">Activar notificaciones de escritorio &gt;</button>
              </div>
              <button
                className="text-[#8696a0]"
                onClick={() => setShowNotification(false)}
              >
                ✕
              </button>
            </div>
          )}

          {/* Chat items */}
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={cn(
                "flex items-center px-3 py-3 cursor-pointer border-b border-[#222d34] hover:bg-[#202c33]",
                selectedChat === chat.name && "bg-[#2a3942]"
              )}
              onClick={() => setSelectedChat(chat.name)}
            >
              <Avatar
                className="h-12 w-12 mr-3 flex-shrink-0"
                src={chat.avatar}
                alt={chat.name}
                fallback={chat.name.charAt(0)}
              />

              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <h3 className="text-[#e9edef] text-sm font-medium truncate">{chat.name}</h3>
                  <span className="text-xs text-[#8696a0]">{chat.time}</span>
                </div>

                <div className="flex items-center">
                  <p className="text-[#8696a0] text-sm truncate">{chat.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp for Windows banner */}
      <div className="mt-auto bg-[#202c33] p-3 flex items-center border-t border-[#222d34]">
        <div className="bg-[#00a884] rounded-full w-9 h-9 flex items-center justify-center mr-3 flex-shrink-0">
          <svg viewBox="0 0 24 24" width="24" height="24" className="text-[#111b21]">
            <path fill="currentColor" d="M19.004 3.003h-14c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm-14 16c-.6 0-1-.4-1-1v-14c0-.6.4-1 1-1h14c.6 0 1 .4 1 1v14c0 .6-.4 1-1 1h-14zm7-13h-6v3h6v-3zm0 4h-6v3h6v-3zm0 4h-6v3h6v-3z"></path>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[#e9edef] text-sm font-medium">Obtener WhatsApp para Windows</h3>
          <p className="text-[#8696a0] text-xs">Recibe las notificaciones incluso con el teléfono desconectado.</p>
        </div>
      </div>
    </div>
  );
}
