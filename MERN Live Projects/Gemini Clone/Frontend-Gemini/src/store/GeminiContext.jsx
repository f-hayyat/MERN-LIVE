import { createContext, useEffect, useState } from "react";

export const GeminiContext = createContext();

export const GeminiProvider = ({children}) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3001/api/conversation', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setChats(data);
    })
    .catch((error) => {
      setError(error.message);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  const addChat = (chat) => {
    setChats([...chats, chat]);
  }

  const deleteChat = (id) => {
    setChats(chats.filter((chat) => chat._id !== id));
  }

  const updateChat = (updatedChat) => {
    setChats(chats.map((chat) => chat._id === updatedChat._id ? updatedChat : chat));
  };

  return (
    <GeminiContext.Provider value={{chats, addChat, deleteChat, updateChat}}>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-red-500">Error: {error}</div>
        </div>
      ) : (
        children
      )}
    </GeminiContext.Provider>
  );
};