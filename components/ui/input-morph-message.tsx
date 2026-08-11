"use client";

import { PlusIcon } from '@radix-ui/react-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const transitionDebug = {
  duration: 0.2,
  ease: 'easeOut',
} as const;

export default function InputMorphMessage() {
  const [messages, setMessages] = useState<
    {
      id: number;
      text: string;
    }[]
  >([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (newMessage.trim()) {
      const timestamp = new Date().getTime();
      setMessages([...messages, { id: timestamp, text: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-[300px] flex-col items-end justify-end pb-4">
      <AnimatePresence mode="wait">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            layout="position"
            className="z-10 mt-2 max-w-[250px] rounded-2xl bg-gray-200 wrap-break-word dark:bg-black"
            layoutId={`container-[${messages.length - 1}]`}
            transition={transitionDebug}
          >
            <div className="px-3 py-2 text-[15px] leading-[15px] text-gray-900 dark:text-gray-100">
              {message.text}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="mt-4 flex w-full">
        <form onSubmit={handleSubmit} className="flex w-full">
          <input
            type="text"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            className="relative h-9 w-[250px] grow rounded-full border border-gray-200 bg-white px-3 text-[15px] outline-hidden placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-blue-500/20 focus-visible:ring-offset-1 dark:border-black/60 dark:bg-black dark:text-gray-50 dark:placeholder-gray-500 dark:focus-visible:ring-blue-500/20 dark:focus-visible:ring-offset-1 dark:focus-visible:ring-offset-gray-700"
            placeholder="Type your message"
          />
          <motion.div
            key={messages.length}
            layout="position"
            className="pointer-events-none absolute z-10 flex h-9 w-[250px] items-center overflow-hidden rounded-full bg-gray-200 wrap-break-word [word-break:break-word] dark:bg-black"
            layoutId={`container-[${messages.length}]`}
            transition={transitionDebug}
            initial={{ opacity: 0.6, zIndex: -1 }}
            animate={{ opacity: 0.6, zIndex: -1 }}
            exit={{ opacity: 1, zIndex: 1 }}
          >
            <div className="px-3 py-2 text-[15px] leading-[15px] text-gray-900 dark:text-gray-50">
              {newMessage}
            </div>
          </motion.div>
          <button
            type="submit"
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 dark:bg-black"
          >
            <PlusIcon className="h-5 w-5 text-gray-600 dark:text-gray-50" />
          </button>
        </form>
      </div>
    </div>
  );
}
