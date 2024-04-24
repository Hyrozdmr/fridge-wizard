// file: frontend/src/App.js

import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <div>
        <Routes>

          <Route path='' element={<Home />} />
          
        </Routes>
      </div>
    </div>
  );
}

export default App;
