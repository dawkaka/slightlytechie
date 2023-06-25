import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from "./pages/Home";
import { Provider } from "jotai";
import WritePost from "./pages/WritePost";
import { Layout } from "./components/Layout";

export default function App() {
  return (
    <Provider>
      <div className="h-[100vh]">
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/write-post" element={<WritePost />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

