import style from "./styles.module.css";
import logoPequena from "../../Imagens/Logo_Hyperion_Motors_-_Somente_Logo.png"
import logo from "../../Imagens/Logo_Hyperion_Motors.png"

import { useEffect, useState } from "react";


export default function Header() {
    useEffect(() => {
        const secoes = document.querySelectorAll(`.${style.animar}`);

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(style.mostrar);
                        obs.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.2,
            }
        );

        secoes.forEach((secao) => {
            observer.observe(secao);
        });

        return () => observer.disconnect();
    }, []);


    const [mostrar, setMostrar] = useState(false);

    return (
        <>
            <div id="header" className={`${style.logoFixa} ${style.animar}`}>
                <img src={logo} />
            </div>

            <header className={`${style.header} ${style.animar}`}>
                <a href="/paginaInicial" className={""}>
                    <img className={style.logoPequena} src={logoPequena} alt="" />
                </a>
                <nav className={style.menu}>
                    <div className={style.menuPrincipal}>
                        <a href="/paginaInicial" className={""} >
                            Início
                        </a>
                        <hr />
                        <a href="/listagemProdutos" className={""} >
                            Carros
                        </a>
                        <hr />
                        <a href="/contato" className={""} >
                            Contato
                        </a>
                        <hr />
                        <a href="/sobre" className={""} >
                            Sobre
                        </a>
                        <hr />
                        <a href="/simulacao" className={""} >
                            Simulação
                        </a>
                    </div>
                    <div className={style.menuMob}>
                        <button onClick={() => setMostrar(!mostrar)} className={style.botaoToggle}>
                            <div className={style.linha} />
                            <div className={`${style.linha} ${style.leave}`} />
                            <div className={style.linha} />
                        </button>
                    </div>
                </nav>
            </header>
            <div className={`${style.menuAberto} ${mostrar ? style.menuAtivo : ""}`}>
                <button onClick={() => setMostrar(!mostrar)}></button>
                <div className={style.itensMenuAberto}>
                    <button onClick={() => setMostrar(!mostrar)} className={style.botaoToggleFechar}>
                        <div className={style.linha} />
                        <div className={`${style.linha} ${style.leave}`} />
                    </button>
                    <div className={style.itens}>
                        <a href="/paginaInicial" className={""} >
                            Início
                        </a>
                        <hr />
                        <a href="/listagemProdutos">
                            Carros
                        </a>
                        <hr />
                        <a href="/contato" >
                            Contato
                        </a>
                        <hr />
                        <a href="/sobre"  >
                            Sobre
                        </a>
                        <hr />
                        <a href="/simulacao" >
                            Simulação
                        </a>
                    </div>
                    <a href="/paginaInicial">
                        <img src={logo} />
                    </a>
                </div>
            </div>
        </>
    )
}
