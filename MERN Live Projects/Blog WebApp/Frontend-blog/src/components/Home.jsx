import React from "react";
import BlogLoader from "./BlogLoader";
import BlogListMapping from "./BlogListMapping";

const Home = () => {
  return (
    <BlogLoader>
      <BlogListMapping />
    </BlogLoader>
  );
};

export default Home;
