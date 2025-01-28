import React, { useRef,useContext } from 'react'
import { BlogContext } from '../store/BlogContext';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {

  const titleRef = useRef();
  const authorRef = useRef();
  const contentRef = useRef();
  const { addBlog } = useContext(BlogContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = titleRef.current.value;
    const author = authorRef.current.value;
    const content = contentRef.current.value;

    fetch("http://localhost:3000/api/blogs", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, author, content })
    })
    .then((res)=> res.json()) 
    .then((data) => {
      addBlog(data.blog)
      titleRef.current.value = '';
      authorRef.current.value = '';
      contentRef.current.value = '';
      navigate('/');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Create a new blog post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input 
            type="text" 
            name="title" 
            ref={titleRef}
            className="border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 text-sm font-bold mb-2">Author:</label>
          <input 
            type="text" 
            name="author" 
            ref={authorRef}
            className="border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 text-sm font-bold mb-2">Content:</label>
          <textarea 
            name="content" 
            rows="6" 
            ref={contentRef}
            className="border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <button 
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Create Blog
        </button>
      </form>
    </div>
  )
}

export default CreateBlog
