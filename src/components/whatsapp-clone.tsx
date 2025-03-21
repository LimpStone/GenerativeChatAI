'use client';

import { useState } from 'react';
import ChatList from './chat-list';
import ChatArea from './chat-area';
import SidebarHeader from './sidebar-header';

export default function WhatsAppClone() {
  // Default to "Novia" as the selected chat
  const [selectedChat, setSelectedChat] = useState<string | null>('Novika Otaku (¬3¬)r');

  return (
    <div className="flex h-screen bg-[#111b21] text-white overflow-hidden">
      {/* Left sidebar */}
      <div className="w-[30%] min-w-[300px] border-r border-[#222d34] flex flex-col">
        <SidebarHeader />
        <ChatList selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
      </div>

      {/* Right chat area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <ChatArea selectedChat={selectedChat} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p>Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
