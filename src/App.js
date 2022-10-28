import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from "./pages/home/home"
import { Blog } from "./pages/blog/blog"
import { BlogArticle } from "./pages/article/article"
import { Subdomains } from "./pages/subdomains/subdomains";

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/blog' element={<Blog/>} />
          <Route path='/blog/:article' element={<BlogArticle/>} />
          <Route path='/subdomains' element={<Subdomains/>} />
        </Routes>
      </div>
    </Router>
  );
}
