import { HelmetProvider } from "react-helmet-async";
import LoginForm from "../LoginForm/component";
import './style.css';

function App(): JSX.Element {
  return (
    <HelmetProvider>
        <div className="App">
            <header className="App-header">
                <LoginForm/>
            </header>
            <footer>
            </footer>
        </div>
    </HelmetProvider>
  );
}

export default App;