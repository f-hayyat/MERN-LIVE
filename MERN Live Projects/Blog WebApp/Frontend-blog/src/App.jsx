import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BlogProvider } from "./store/BlogContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreateBlog from "./components/CreateBlog";

function App() {
  return (
    <BrowserRouter>
      <BlogProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-blog" element={<CreateBlog />} />
        </Routes>
      </BlogProvider>
    </BrowserRouter>
  );
}

export default App;
