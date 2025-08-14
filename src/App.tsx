import "./App.css";
import Quiz from "./components/Quiz";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/:fileName" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
