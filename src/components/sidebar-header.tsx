'use client';

import { Avatar } from '@/components/ui/avatar';
import { MoreVertical, MessageSquarePlus, ArrowUpFromLine } from 'lucide-react';

export default function SidebarHeader() {
  return (
    <div className="flex items-center justify-between p-3 bg-[#202c33]">
      <Avatar
        className="h-10 w-10 cursor-pointer"
        src="https://www.cryptotimes.io/wp-content/uploads/2024/09/whale-transfer-Pepe-coin-860x484.png"
        alt="Your Profile"
        fallback="Y"
      />

      <div className="flex items-center gap-4 text-[#aebac1]">
        <ArrowUpFromLine size={20} className="cursor-pointer" />
        <MessageSquarePlus size={20} className="cursor-pointer" />
        <MoreVertical size={20} className="cursor-pointer" />
      </div>
    </div>
  );
}
