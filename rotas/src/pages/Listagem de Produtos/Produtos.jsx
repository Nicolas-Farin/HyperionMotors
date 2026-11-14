import { useState, useEffect } from "react";
import Card from "../Card/index";
import produtosData from "../../data/produtos.json";
import styles from "./produtos.module.css";

import Header from "../../components/Header/index";
import Rodape from "../../components/Footer/index";

import OPClista from "../../imgs/ICON_Listagem_lista.png";
import OPCcards from "../../imgs/ICON_Listagem_cards.png";

export default function Produtos() {

    const [busca, setBusca] = useState("");
    const [marca, setMarca] = useState("Todos");
    const [modoVisualizacao, setModoVisualizacao] = useState("grid");

    const [isTablet, setIsTablet] = useState(window.innerWidth <= 900);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 749);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsTablet(window.innerWidth <= 900);
            setIsMobile(window.innerWidth <= 749);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (isMobile) setModoVisualizacao("lista");
    }, [isMobile]);

    const produtos = produtosData.filter(p =>
        (marca === "Todos" || p.marca === marca) &&
        p.nome.toLowerCase().includes(busca.toLowerCase())
    );

    const marcasUnicas = [
    "Todos",
    ...[...new Set(produtosData.map(p => p.marca))]
        .sort((a, b) => a.localeCompare(b))
];

    return (
        <>
            <Header />

            {/* HERO */}
            <div className={`${styles.hero} ${styles.cardAnim}`}>
                <div>
                    <h1>Carros disponíveis</h1>
                    <p>Explore nossa coleção exclusiva de veículos de luxo.</p>
                </div>

                <input
                    type="text"
                    placeholder="Pesquise por marca, modelo ou nome..."
                    onChange={(e) => setBusca(e.target.value)}
                />
            </div>

            {/* TOPBAR */}
            <div className={styles.topbar}>
                <span><b>{produtos.length}</b> carros encontrados</span>

                <div className={styles.controls}>
                    <select onChange={(e) => setMarca(e.target.value)}>
                        {marcasUnicas.map((m, i) => (
                            <option key={i} value={m}>{m}</option>
                        ))}
                    </select>
                    <span className={styles.selectSeta}>▼</span>
                    {!isMobile && isTablet && (
                        <div className={styles.viewToggle}>
                            <button

                                onClick={() =>
                                    setModoVisualizacao(prev =>
                                        prev === "grid" ? "lista" : "grid"
                                    )
                                }
                            >
                                <img
                                    src={modoVisualizacao === "grid" ? OPClista : OPCcards}
                                    alt=""
                                />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* GRID */}
            <div
                key={modoVisualizacao} // 🔥 FORÇA REMONTAGEM
                className={`${styles.grid} ${styles[modoVisualizacao]}`}
            >
                {produtos.map((p, index) => (
                    <div
                        key={p.id}
                        className={styles.cardAnim}
                        style={{ animationDelay: `${index * 0.08}s` }}
                    >
                        <Card
                            produto={p}
                            compacto={isTablet && !isMobile && modoVisualizacao === "grid"}
                        />
                    </div>
                ))}
            </div>

            <Rodape />
        </>
    );
}