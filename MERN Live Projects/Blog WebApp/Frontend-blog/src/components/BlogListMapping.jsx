import { useContext } from "react";
import { BlogContext } from "../store/BlogContext";
import BlogCard from "./BlogCard";

const BlogListMapping = () => {
  const { blogs } = useContext(BlogContext);

  // Add console log to debug
  console.log("Blogs in BlogListMapping:", blogs);

  // Add validation check
  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No blogs available.</p>
      </div>
    );
  }

  return (
    <div>
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogListMapping;
