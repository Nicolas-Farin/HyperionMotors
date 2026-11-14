import Header from '../components/Header/index.jsx';
import { useParams } from 'react-router-dom';
import produtos from '../data/produtos.json';
import style from '../styles/produto.module.css'

export default function Produtos() {
    const { id } = useParams();

    const produto = produtos.find((p) => p.id === Number(id));
    return (
        <>
            <Header />
            <h1>Produto</h1>
            <div style={{ "--cor-produto": produto.cor }} key={produto.id} className={style.produto}>

                <div>
                    <p className={style.id}>{produto.id}</p>
                    <p>{produto.modelo}</p>
                    <p>{produto.marca}</p>
                    <p><b>{produto.preco}</b></p>
                    <p>{produto.categoria}</p>
                    <p>{produto.descricao}</p>
                    <a href='/' className={style.verMais}>Ver menos</a>
                </div>
                <img className={style.imgProduto} src={produto.img} />

            </div>
        </>
    )
};
