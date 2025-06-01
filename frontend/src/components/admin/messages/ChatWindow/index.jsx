import React, { useEffect, useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { db } from '@/firebase/firebaseConfig';
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';

const ChatWindow = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const currentUser = { uid: 'admin' }; // ganti sesuai UID admin
  const chatId = [currentUser.uid, user.uid].sort().join('_');

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      where('chatId', '==', chatId),
      orderBy('createdAt')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => doc.data());
      setMessages(fetched);
    });

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async (text) => {
    await addDoc(collection(db, 'messages'), {
      chatId,
      senderId: currentUser.uid,
      receiverId: user.uid,
      text,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <div className="flex flex-col h-full">
      <ChatHeader user={user} />
      <ChatMessages messages={messages} currentUser={currentUser} />
      <ChatInput onSend={sendMessage} />
    </div>
  );
};

export default ChatWindow;