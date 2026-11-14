import Header from "../components/Header/index.jsx";
import produtos from "../data/produtos.json";

import style from "../styles/produtos.module.css";

export default function Produtos() {

    function handleMove(e) {
        const card = e.currentTarget;

        const rect = card.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        const moveX = x * 20;
        const moveY = y * 20;

        card.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }

    function handleLeave(e) {
        e.currentTarget.style.transform = `translate(0px, 0px)`;
    }

    return (
        <>
            <Header />
            <h1>Produtos</h1>

            <div className={style.produtos}>
                {produtos.map((produto) => (
                    <a href={`produto/${produto.id}`}>
                        <div style={{"--cor-produto": produto.cor}} 
                        key={produto.id} 
                        className={style.produto} 
                        onMouseMove={handleMove} 
                        onMouseLeave={handleLeave}>
                            <div>
                                <p className={style.id}>{produto.id}</p>
                                <p>{produto.modelo}</p>
                                <p>{produto.marca}</p>
                                <p><b>{produto.preco}</b></p>
                                <p>{produto.categoria}</p>
                                
                                <p className={style.verMais}>Ver detalhes</p>
                            </div>
                            <img className={style.imgProduto} src={produto.img} />
                        </div>
                    </a>
                ))}
            </div >
        </>
    );
}