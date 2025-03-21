"use client";

import { useState } from "react";
import { Mistral } from "@mistralai/mistralai";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  MoreVertical,
  Search,
  Paperclip,
  Mic,
  Smile,
  Send,
  LucideHeart,
} from "lucide-react";

interface ChatAreaProps {
  selectedChat: string;
}

const initialMessages: Message[] = [];

interface Message {
  id: string;
  content: string;
  time: string;
  isIncoming: boolean;
  day: string;
}

export default function ChatArea({ selectedChat }: ChatAreaProps) {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  // Configuración de la API key
  const client = new Mistral({ apiKey: "API HERE PAPI" });

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isIncoming: false,
      day: "HOY",
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsLoading(true);

    try {
      
      const chatResponse = await client.agents.complete({
        agentId: "AGENT HERE DADDY", 
        messages: [
          { role: "user", content: newMessage },
          ...messages.map(
            (msg) =>
              ({
                role:"user",
                content: msg.content,
              } as { role: "user" | "assistant"; content: string })
          ),
        ],
      });

      
      const aiResponse = chatResponse.choices[0].message.content;
      const responseContent = typeof aiResponse === "string" ? aiResponse : "";
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: responseContent,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isIncoming: true,
          day: "HOY",
        };

        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error enviando mensaje a Mistral AI:", error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Lo siento, ha ocurrido un error al procesar tu mensaje. Por favor, intenta de nuevo más tarde.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isIncoming: true,
        day: "HOY",
      };

      setMessages((prev) => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const messagesByDay: Record<string, Message[]> = {};
  messages.forEach((message) => {
    if (!messagesByDay[message.day]) {
      messagesByDay[message.day] = [];
    }
    messagesByDay[message.day].push(message);
  });
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newMessage.trim()) {
      e.preventDefault();
      handleSendMessage(); 
    }
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 bg-[#202c33] border-l border-[#222d34]">
        <div className="flex items-center">
          <Avatar
            className="h-10 w-10 cursor-pointer mr-3"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnkMyNpgnrdHqiaG28sG6nyxiMJfgAXDgqbg&s"
            alt={selectedChat}
            fallback={selectedChat?.charAt(0)}
          />
          <div>
            <h2 className="text-[#e9edef] text-base font-medium">
              {selectedChat}
            </h2>
            <p className="text-[#8696a0] text-xs">en línea</p>
          </div>
        </div>
        <div className="flex items-center gap-5 text-[#aebac1]">
          <Search size={20} className="cursor-pointer" />
          <MoreVertical size={20} className="cursor-pointer" />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 bg-[#0a0a0a]">
        {Object.entries(messagesByDay).map(([day, dayMessages]) => (
          <div key={day}>
            <div className="flex justify-center my-4">
              <div className="bg-[#182229] text-[#8696a0] text-xs px-3 py-1 rounded-md">
                {day}
              </div>
            </div>
            {dayMessages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-2 ${
                  message.isIncoming ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[65%] rounded-lg py-2 px-3 relative ${
                    message.isIncoming
                      ? "bg-[#202c33] text-[#e9edef]"
                      : "bg-[#025c4b] text-white"
                  }`}
                >
                  <div className="break-words">{message.content}</div>
                  <div className="text-right text-xs text-[#8696a0] mt-1">
                    {message.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start mb-2">
            <div className="bg-[#202c33] text-[#e9edef] rounded-lg py-2 px-4">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}

        {messages.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <div className="text-center text-[#8696a0] max-w-[80%]">
              <p className="font-semibold text-lg">
                ¡Hola! ¿Cómo puedo ayudarte hoy?
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 p-3 bg-[#202c33] border-t border-[#222d34]">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown} // Detecta "Enter"
          placeholder="Escribe un mensaje..."
          className="flex-1 bg-[#1a262f] text-white p-2"
        />
        <Send
          size={20}
          className="cursor-pointer text-[#aebac1]"
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
}
