import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from "./pages/home/home"
import { About } from "./pages/about/about"

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/About' element={<About/>} />
        </Routes>
      </div>
    </Router>
  );
}

function Users() {
  return <h2>Users</h2>;
}
