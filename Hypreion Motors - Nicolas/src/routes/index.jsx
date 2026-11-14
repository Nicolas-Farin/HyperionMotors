import { Route, Routes } from 'react-router-dom';
import Produto from '../pages/Produto';
import Produtos from '../pages/Produtos';
import Contato from '../pages/Contato';
import Simulacao from '../pages/Simulacao';

export default function Rotas() {
    return (
        <Routes>
            <Route path='/listagemProdutos' element={< Produtos />} />
            <Route path='/produto/:id' element={< Produto />} />
            <Route path='/contato' element={< Contato />} />
            <Route path='/simulacao' element={< Simulacao />} />
        </Routes>
    )
}






