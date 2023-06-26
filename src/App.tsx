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
import AllPosts from "./pages/AllPosts";
import UpdatePost from "./pages/UpdatePost";

export default function App() {
  return (
    <Provider>
      <div className="h-[100vh]">
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/write-post" element={<WritePost />} />
              <Route path="/all-posts" element={<AllPosts />} />
              <Route path="update/:id" element={<UpdatePost />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

