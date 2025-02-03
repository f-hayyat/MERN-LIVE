import React, { useContext } from 'react'
import { GeminiContext } from '../store/GeminiContext'
import { Link, useNavigate } from 'react-router-dom'
import { FaEnvelopeOpenText, FaTrash } from 'react-icons/fa'

const Sidebar = () => {

  const {chats, deleteChat} = useContext(GeminiContext);
  const navigate = useNavigate();
  const handleNewChat = ()=>{
    navigate('/');
  }
  const handleDeleteChat = (id) => {
    fetch(`http://localhost:3001/api/conversation/${id}`, {
      method: "DELETE",
    })
    .then(() => {
      deleteChat(id);
    });
  }

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col justify-between shadow-lg">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Talk to Gemini</h1>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center"
         onClick={handleNewChat}>
          <FaEnvelopeOpenText className="mr-2" /> New Chat
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div key={chat._id} className="group relative mb-2 p-2 hover:bg-gray-700 rounded-lg flex flex-row justify-between items-center">
            <Link 
              to={`/conversation/${chat._id}`}
              className="text-white font-semibold flex-1 truncate"
            >
              {chat.title}
            </Link>
            <button 
              onClick={() => handleDeleteChat(chat._id)}
              className="ml-4 text-white bg-red-500 hover:bg-red-700 py-2 px-4 rounded-full"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
