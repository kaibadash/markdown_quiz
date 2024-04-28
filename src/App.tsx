import "./App.css";
import Quiz from "./components/Quiz";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="/a/markdown_quiz/">
      <Routes>
        <Route path="/:fileName" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
