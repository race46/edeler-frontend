import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from './route/login'
import Home from "./route/home";
import Features from "./route/features";
import Pricing from "./route/pricing";
import Edit_profile from "./route/edit_profile";
import Signup from "./route/signup";
import Illusionist from "./route/illusionist";

function App() {
  return (
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/features" element={<Features/>}/>
          <Route path="/pricing" element={<Pricing/>}/>
          <Route path="/update" element={<Edit_profile/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/brute-force" element={<Login/>}/>
          <Route path="/illusionist/:id" element={<Illusionist/>}/>
      </Routes>
  )
}

export default App;
