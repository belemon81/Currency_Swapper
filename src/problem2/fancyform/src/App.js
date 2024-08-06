import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {CurrencySwapForm} from "./components/CurrencySwapForm";

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="**" element={<CurrencySwapForm/>}/>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
