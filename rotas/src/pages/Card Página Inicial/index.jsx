import { Link } from "react-router-dom";
import styles from "./styles.module.css";

import anoCarro from "../../imgs/ICON_anoCarro.png";
import kmCarro from "../../imgs/ICON_kmCarro.png";
import combustivel from "../../imgs/ICON_combustivel.png";
import cambio from "../../imgs/ICON_cambio.png";

import { useRef } from "react";

export default function CardPgInicial({ produto, compacto }) {

    const isCompacto = Boolean(compacto);

    const elementosRef = useRef([]);

    return (
        <div className={`${styles.card} ${styles.animar} ${!isCompacto ? styles.lista : ""}`}

            ref={(el) => (elementosRef.current[0] = el)}

        >

            <img
                className={styles.fotoPrincipal}
                src={produto.imagens[0]}
                alt={produto.nome}
            />

            <div className={styles.cardBody}>

                <div className={styles.nomeCarro}>
                    <img className={styles.logo} src={produto.logo} alt="" />
                    <h2>{produto.nome}</h2>
                </div>

                <span className={styles.categoria}>{produto.categoria}</span>

                {/* 🔽 INFOS (só no modo completo) */}
                {/* {!isCompacto && ( */}
                <div className={styles.infos}>
                    <span><img className={styles.icone} src={anoCarro} alt="" /> {produto.ano}</span>
                    <span><img className={styles.icone} src={kmCarro} alt="" /> {produto.quilometragem}km</span>
                    <span><img className={styles.icone} src={combustivel} alt="" /> {produto.combustivel}</span>
                    <span><img className={styles.icone} src={cambio} alt="" /> {produto.cambio}</span>
                </div>
                {/* )} */}

                <div className={styles.preco}>
                    <strong>R$ {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </strong>

                    <Link className={styles.btnDetalhes} to={`/produto/${produto.id}`}>
                        Ver detalhes
                    </Link>
                </div>

            </div>
        </div>
    );
}