import { useContext, useEffect, useState } from "react";
import { BlogContext } from "../store/BlogContext";

const BlogLoader = ({ children }) => {
  const { setBlogs } = useContext(BlogContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`http://localhost:3000/api/blogs`)
      .then((res) => res.json())
      .then((resJson) => {
        console.log("response coming from api:", resJson);
        setBlogs(resJson);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // Added setBlogs to dependency array

  return (
    <div className="container mx-auto px-4">
      {loading && (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="text-center min-h-[400px] flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-red-500 mb-2">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600">
            Unable to load blogs. Please try again later.
          </p>
        </div>
      )}

      {!loading && !error && children}
    </div>
  );
};

export default BlogLoader;
