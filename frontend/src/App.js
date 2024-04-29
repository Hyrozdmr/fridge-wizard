// file: frontend/src/App.js

import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Fridge from './pages/Fridge';
import Recipes from './pages/Recipes';

function App() {
  return (
    <div className="App">
      <div>
        <Routes>

          <Route path='' element={<Home />} />
          <Route path='/fridge' element={<Fridge />} />
          <Route path='/recipes' element={<Recipes />} />
          
        </Routes>
      </div>
    </div>
  );
}

export default App;
