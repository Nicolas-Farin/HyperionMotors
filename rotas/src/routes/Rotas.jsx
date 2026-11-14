import { useEffect } from "react";
import { Route, Routes, useLocation } from 'react-router-dom';

import Sobre from "../pages/sobre/index";
import PaginaInicial from '../pages/Página Inicial';
import ListagemProdutos from '../pages/Listagem de Produtos/Produtos';
import Carregar from './telaDeCarregamento';
import Simulacao from '../pages/Simulação/Simulacao';
import Contato from '../pages/Contato/Contato';
import Produto from '../pages/Listagem de Produtos/Produto';

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default function Rotas() {
    return (
        <>
            <ScrollToTop />

            <Routes>
                <Route path='/' element={<Carregar />}  />
                <Route path='/paginaInicial' element={<PaginaInicial />} />
                <Route path='/listagemProdutos' element={<ListagemProdutos />} />
                <Route path='/sobre' element={<Sobre />} />
                <Route path='/contato' element={<Contato />} />
                <Route path='/simulacao' element={<Simulacao />} />
                <Route path='/produto/:id' element={<Produto />} />
            </Routes>
        </>
    )
}