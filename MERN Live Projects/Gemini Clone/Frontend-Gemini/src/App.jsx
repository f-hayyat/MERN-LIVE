import { BrowserRouter, Routes, Route } from "react-router-dom";
import {GeminiProvider} from "./store/GeminiContext";
import PageLayout from "./components/PageLayout";
import Chat from "./components/Chat";

function App() {
  return (
    <BrowserRouter>
      <GeminiProvider>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route path="/" element={<Chat />} />
            <Route path="/conversation/:id" element={<Chat />} />
          </Route>
        </Routes>
      </GeminiProvider>
    </BrowserRouter>
  );
}

export default App;
