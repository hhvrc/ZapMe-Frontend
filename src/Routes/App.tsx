import { Routes, Route } from "react-router-dom";
import { Header, Footer } from "Layouts";
import * as Pages from "Pages";
import 'Assets/Styles/App.css';

function App(): JSX.Element {
  return (
    <>
      <Header/>
      <div className="App-Body">
        <Routes>
          <Route path="/" element={<Pages.MainPage/>}/>
          <Route path="/tos" element={<Pages.TermsOfServicePage/>}/>
          <Route path="/contact" element={<Pages.ContactPage/>}/>

          <Route path="/signin" element={<Pages.SignInPage/>}/>
          <Route path="/signup" element={<Pages.SignUpPage/>}/>
          <Route path="/reset-password" element={<Pages.ResetPasswordPage/>}/>

          <Route path="/home" element={<Pages.HomePage/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;