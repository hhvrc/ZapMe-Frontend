import { NavLink, Routes, Route } from "react-router-dom";
import { Toolbar, AppBar, Typography } from "@mui/material";
import Header from "Layouts/Header";
import MainPage from "Pages/Main";
import SignInPage from "Pages/SignIn";
import HomePage from "Pages/Home";
import 'Assets/Styles/App.css';

function App(): JSX.Element {
  return (
    <>
      <Header/>
      <div className="App-Body">
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/tos" element={<SignInPage/>}/>
          <Route path="/contact" element={<SignInPage/>}/>
          <Route path="/signin" element={<SignInPage/>}/>
          <Route path="/signup" element={<SignInPage/>}/>
          <Route path="/recover" element={<SignInPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;