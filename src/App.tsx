import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"; import HomePage from "./pages/Home";
import WritePost from "./pages/WritePost";
import { Layout } from "./components/Layout";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/write-post" element={<WritePost />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

