import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './componentes/Home';
import Seguridad from './componentes/Seguridad';
import Comprobado from './componentes/Comprobado';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seguridad/:id" element={<Seguridad />} />
        <Route path="/comprobado/:id" element={<Comprobado />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;