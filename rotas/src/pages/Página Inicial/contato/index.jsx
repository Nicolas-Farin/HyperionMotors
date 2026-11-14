import style from "./style.module.css"
import imagem from "../../../Imagens/Contate-nos.png"
import seta from "../../../Imagens/seta-para-baixo.png"
import { useEffect, useRef } from "react";

export default function ContatoCaixa() {

    const elementosRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(style.mostrar);
                        obs.unobserve(entry.target);
                        console.log("ativou", entry.target);
                    }
                });
            },
            {
                threshold: 0.2,
            }
        );

        elementosRef.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={(el) => (elementosRef.current[0] = el)}
            className={`${style.caixa} ${style.animar}`}
        >
            <div className={style.container}>
                <div className={style.escritas}>
                    <h1>Mantenha-se à frente da curva</h1>
                    <hr />
                    <br />
                    <p>
                        Fique por dentro das últimas tendências em automóveis de luxo, recursos exclusivos de marcas e notícias privilegiadas do mundo dos veículos de alta gama.
                    </p>

                    <a className={`${style.btnSimular} ${style.smlUm}`} href="/contato">
                        <p>Contate-nos</p>
                        <div className={style.seta}>
                            <img src={seta} alt="" />
                        </div>
                    </a>

                    <a className={`${style.btnSimular} ${style.smlDois}`} href="/simulacao">
                        <p>Faça uma simulação</p>
                        <div className={style.seta}>
                            <img src={seta} alt="" />
                        </div>
                    </a>
                </div>

                <div className={style.imagem}>
                    <img className={style.contatoIMG} src={imagem} alt="Contato" />
                </div>
            </div>
        </div>
    )
}