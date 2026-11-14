import style from "./style.module.css";

import CarroNovo from "../../../../public/imagens/Carro Novo.jpg";
import CarroAntigo from "../../../../public/imagens/Carro antigo.jpg";
import { useRef, useEffect, useState } from "react";

export default function Historia() {
    const elementosRef = useRef([]);

    // estados dos números
    const [valores, setValores] = useState({
        v1: 0,
        v2: 0,
        v3: 0,
        v4: 0
    });

    const animou = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(style.mostrar);
                        obs.unobserve(entry.target);

                        // 👉 quando chegar na parte dos números
                        if (entry.target === elementosRef.current[1] && !animou.current) {
                            animou.current = true;
                            iniciarAnimacao();
                        }
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

    // função de animação
    const animarNumero = (inicio, fim, duracao, callback) => {
        let startTime = null;

        const animar = (tempo) => {
            if (!startTime) startTime = tempo;

            const progresso = tempo - startTime;
            const porcentagem = Math.min(progresso / duracao, 1);

            // easing (fica bonito)
            const easeOut = 1 - Math.pow(1 - porcentagem, 3);

            const valorAtual = Math.floor(inicio + (fim - inicio) * easeOut);

            callback(valorAtual);

            if (porcentagem < 1) {
                requestAnimationFrame(animar);
            }
        };

        requestAnimationFrame(animar);
    };

    const iniciarAnimacao = () => {
        animarNumero(0, 25000, 2500, (v) =>
            setValores((prev) => ({ ...prev, v1: v }))
        );

        animarNumero(0, 98, 2500, (v) =>
            setValores((prev) => ({ ...prev, v2: v }))
        );

        animarNumero(0, 25, 3500, (v) =>
            setValores((prev) => ({ ...prev, v3: v }))
        );

        animarNumero(0, 50, 3500, (v) =>
            setValores((prev) => ({ ...prev, v4: v }))
        );
    };

    return (
        <>
            <div className={`${style.container}`}>
                {/* BLOCO 1 */}
                <section className={` ${style.section} ${style.animar}`}
                    ref={(el) => (elementosRef.current[0] = el)}
                >
                    <div className={style.textLeft}>
                        <h2>1931</h2>
                        <h3>Ford Model A Deluxe Phaeton</h3>
                        <p>
                            O Ford Model A Deluxe Phaeton ocupa um lugar especial na história por representar uma das primeiras grandes
                            evoluções do automóvel no início do século XX. Surgindo após o icônico Ford Model T, ele marcou a transição
                            de uma era em que os carros eram simples e acessíveis para outra em que começavam a incorporar mais refinamento
                        </p>
                    </div>

                    <div className={style.imageRight}>
                        <img src={CarroAntigo} className={style.fakeImage} />
                    </div>
                </section>

                {/* BLOCO 2 */}
                <section className={`${style.collumReverse} ${style.section} ${style.light} ${style.animar}`} ref={(el) => (elementosRef.current[1] = el)}>
                    <div className={style.imageLeft}>
                        <img src={CarroNovo} className={style.fakeImage} />
                    </div>

                    <div className={style.textRight}>
                        <h2>2016</h2>
                        <h3>Ferrari J50</h3>
                        <p>
                            A Ferrari J50 representa um marco da fase mais atual da indústria automotiva, sendo um exemplo claro de
                            como os carros evoluíram ao longo do tempo. Lançada em 2016, ela carrega a herança clássica da Ferrari,
                            mas se destaca principalmente por refletir uma era moderna, onde tecnologia, desempenho e design atingem
                            níveis extremamente avançados.
                        </p>
                    </div>
                </section>

                {/* BOLINHA */}

                {/* NUMEROS */}
                <section
                    className={`${style.numbers} ${style.animar}`}
                    ref={(el) => (elementosRef.current[2] = el)}
                >
                    <span>NOSSOS NÚMEROS</span>
                    <h2>RESULTADOS QUE FALAM</h2>

                    <div className={style.grid}>
                        <div>
                            <strong className={style.red}>
                                {valores.v1.toLocaleString("pt-BR")}+
                            </strong>
                            <p>veículos vendidos</p>
                        </div>

                        <div>
                            <strong>{valores.v2}%</strong>
                            <p>clientes satisfeitos</p>
                        </div>

                        <div>
                            <strong className={style.red}>{valores.v3}</strong>
                            <p>anos de mercado</p>
                        </div>

                        <div>
                            <strong>{valores.v4}+</strong>
                            <p>colaboradores</p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}