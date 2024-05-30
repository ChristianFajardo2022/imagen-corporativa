import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './componentes/Home';
import Seguridad from './componentes/Seguridad';
import Comprobado from './componentes/Comprobado';
import TakePhoto from './componentes/TakePhoto';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seguridad/:id" element={<Seguridad />} />
        <Route path="/comprobado/:id" element={<Comprobado />} />
        <Route path="foto" element={<TakePhoto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;