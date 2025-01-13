import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstPage from "./pages/form-page/FirstPage";
import SecondPage from "./pages/form-page/SecondPage";
import ThirdPage from "./pages/form-page/ThirdPage";
import MainPage from "./pages/admin-page/MainPage";
function App(){
  return(
    <>
      <Router>
        <Routes>
          <Route path="/" element={<FirstPage/>}/>
          <Route path="/first" element={<FirstPage/>}/>
          <Route path="/second" element={<SecondPage/>}/>
          <Route path="/third" element={<ThirdPage/>}/>

          <Route path="/main-page/admin" element={<MainPage/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;