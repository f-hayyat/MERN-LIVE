import { useContext, useRef, useState } from "react";
import { BlogContext } from "../store/BlogContext";

const CommentForm = ({blogId}) => {
  const { updateBlog } = useContext(BlogContext);
  const [commenting, sendingComment] = useState(false);
  const usernameRef = useRef(null);
  const commentRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendingComment(true);
    fetch(`http://localhost:3000/api/blogs/${blogId}/comment`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameRef.current.value,
        content: commentRef.current.value
      }),
    })
    .then((res) => res.json())
    .then((resJson) => {
      updateBlog(resJson);
      usernameRef.current.value = "";
      commentRef.current.value = "";
    })
    .finally(() => {
      sendingComment(false);
    });
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Leave a Comment</h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input 
            id="username"
            type="text" 
            placeholder="Enter your username" 
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out placeholder-gray-400"
            ref={usernameRef}
            required
          />
        </div>
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Comment
          </label>
          <textarea
            id="comment"
            placeholder="Share your thoughts..." 
            rows="4"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out placeholder-gray-400 resize-none"
            ref={commentRef}
            required
          />
        </div>
        <div className="flex justify-end">
          <button 
            type="submit"
            disabled={commenting}
            className={`inline-flex items-center px-6 py-2.5 rounded-lg text-white font-medium text-sm
              ${commenting 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'} 
              transition duration-150 ease-in-out shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {commenting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Posting...
              </>
            ) : (
              'Post Comment'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CommentForm