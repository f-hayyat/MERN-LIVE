import { useContext } from "react";
import formatDate from "../utils/dateUtil";
import CommentForm from "./CommentForm";
import { BlogContext } from "../store/BlogContext";

const BlogCard = ({ blog }) => {
  const { updateBlog, deleteBlog } = useContext(BlogContext);

  if (!blog) {
    return null;
  }

  const handleLike = () => {
    fetch(`http://localhost:3000/api/blogs/${blog._id}/like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        // Update the blog with the response data
        updateBlog(resJson);
      })
      .catch(err => {
        console.error("Error updating likes:", err);
      });
  };

  const handleDelete = () => {
    fetch(`http://localhost:3000/api/blogs/${blog._id}`, {
      method: "DELETE",
    })
    .then(() => {
      deleteBlog(blog._id);
    })
    .catch(err => {
      console.error("Error deleting blog:", err);
    });
  };

  return (
    <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mb-8 transition-transform hover:scale-[1.02]">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
              {blog.author[0].toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-gray-800">{blog.author}</p>
              <p className="text-sm text-gray-500">{formatDate(blog.createdAt)}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition"
              onClick={handleLike}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              {blog.likes}
            </button>
            <button
              className="inline-flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition"
              onClick={handleDelete}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition cursor-pointer">
          {blog.title}
        </h1>
        
        <p className="text-gray-600 leading-relaxed mb-8 text-lg">
          {blog.content}
        </p>

        <div className="border-t border-gray-100 pt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Comments</h2>
          <div className="space-y-6">
            {blog.comments.map((comment) => (
              <div key={comment._id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white text-sm">
                    {comment.username[0].toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-800">
                    {comment.username}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className="text-gray-600 pl-11">{comment.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <CommentForm blogId={blog._id} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
