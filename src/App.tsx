import "./App.css";
import Quiz from "./components/Quiz";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={
          <div className="container mt-5">
            <h1>Markdown Quiz</h1>
              <div className="alert alert-info">
                <h4>How to use</h4>
                <ol>
                  <li>Place markdown files in the <code>public/</code> folder</li>
                  <li>Access quiz via URL: <code>/quiz/filename</code></li>
                  <li>Example: <code>public/sample.md</code> → <a href="/quiz/sample.md">/quiz/sample.md</a></li>
                </ol>
              </div>
          </div>
        } />
        <Route path="/quiz/:fileName" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
