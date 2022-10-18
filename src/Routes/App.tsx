import { Routes, Route } from "react-router-dom";
import { Header, Footer } from "Layouts";
import { MainPage, SignInPage, SignUpPage, HomePage } from "Pages";
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
          <Route path="/signup" element={<SignUpPage />}/>
          <Route path="/recover" element={<SignInPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;