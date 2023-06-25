import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"; import HomePage from "./pages/Home";
import WritePost from "./pages/WritePost";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/write-post" element={<WritePost />} />
        </Routes>
      </Router>
    </div>
  );
}

