import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {CurrencySwapForm} from "./components/CurrencySwapForm";

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<CurrencySwapForm/>}/>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
