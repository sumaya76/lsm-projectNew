import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Courses from "./components/pages/Courses";
import Login from "./components/pages/account/Login";
import Register from "./components/pages/account/Register";


import Checkout from "./components/pages/account/Checkout";
import Detail from "./components/pages/Detail";
import ChangePassword from "./components/pages/account/ChangePassword";

import MyCourses from "./components/pages/account/MyCourses";
import MyLearning from "./components/pages/account/MyLearning";

import WatchCourse from "./components/pages/account/WatchCourse";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/Detail" element={<Detail />} />
          <Route path="/account/Login" element={<Login />} />
            <Route path="/account/Register" element={<Register />} />
          
            <Route path="/account/Checkout" element={<Checkout />} />
           
            <Route path="/account/ChangePassword" element={<ChangePassword />} />
               
       
        
            <Route path="/account/MyCourses" element={<MyCourses />} />
            <Route path="/account/CourseEnrolled" element={<MyLearning />} />
            <Route path="/account/WatchCourse" element={<WatchCourse />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
