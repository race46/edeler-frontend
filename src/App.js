import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from './route/login'
import Home from "./route/home";
import Features from "./route/features";
import Pricing from "./route/pricing";
import Edit_profile from "./route/edit_profile";

function App() {
  return (
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/features" element={<Features/>}/>
          <Route path="/pricing" element={<Pricing/>}/>
          <Route path="/update" element={<Edit_profile/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Login/>}/>
          <Route path="/brute-force" element={<Login/>}/>
      </Routes>
  )
}

export default App;
