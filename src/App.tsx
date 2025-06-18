import "./App.css";
import Quiz from "./components/Quiz";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:fileName" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
