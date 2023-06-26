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
import ViewPost from "./pages/ViewPost";
import NotFound from "./pages/NotFound";
import Tour from "./components/Tour";
import { useEffect, useState } from "react";

export default function App() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const isNew = localStorage.getItem("is_new")
    if (!isNew) {
      setOpen(true)
      localStorage.setItem("is_new", "false")
    }
  }, [])
  return (
    <Provider>
      <div className="h-[100vh]">
        <Tour open={open} setOpen={setOpen} />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/write-post" element={<WritePost />} />
              <Route path="/all-posts" element={<AllPosts />} />
              <Route path="update/:id" element={<UpdatePost />} />
              <Route path="post/:id" element={<ViewPost />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

