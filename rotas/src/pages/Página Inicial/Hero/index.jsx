import { useEffect, useState, useRef } from "react";
import style from "./style.module.css";
import McLaren from "../../../Imagens/McLaren.mp4"
import seta from "../../../Imagens/arrow-right.png"
import Mercedes from "../../../Imagens/Mercedes.mp4"
import Ferrari from "../../../Imagens/Ferrari.mp4"
import McLarenFoto from "../../../Imagens/FUndo Hero 1.jpg"
import MercedesFoto from "../../../Imagens/FUndo Hero 2.jpg"
import FerrariFoto from "../../../Imagens/FUndo Hero 3 (2).JPG"

import { Link } from "react-router-dom";

export default function Hero({produto}) {
    const [idx, setIdx] = useState(0);
    const [playing, setPlaying] = useState([false, false, false]);

    const videoRefs = [useRef(null), useRef(null), useRef(null)];
    const intervalRef = useRef(null);

    const totalItems = 3;

    function startAutoSlide() {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setIdx((prev) => (prev + 1) % totalItems);
        }, tempo);
    }

    const tempo = 15000; //Só fiz isso aqui para caso precise fazer umas gracinha no futuro :)


    // 
    
    useEffect(() => {
        startAutoSlide();
        return () => clearInterval(intervalRef.current);
    }, []);

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

    // 

    function toggleVideo(i) {
        const newPlaying = [...playing];

        if (newPlaying[i]) {
            videoRefs[i].current.pause();
            newPlaying[i] = false;
            setPlaying(newPlaying);
        } else {
            newPlaying[i] = true;
            setPlaying(newPlaying);

            setTimeout(() => {
                videoRefs[i].current.play();
            }, 50);
        }
    }



    function handleManualChange(i) {
        setIdx(i);
        startAutoSlide();
    }

    return (
        <div className={`${style.wrapper} ${style.animar}`}>
            <div
                className={style.carrosel}
                style={{ transform: `translateX(-${idx * 100}%)` }} >

                <div className={style.item}>
                    {playing[0] && (
                        <video
                            ref={videoRefs[0]}
                            className={style.media}
                            loop muted src={McLaren}></video>
                    )}
                    {!playing[0] && (
                        <img src={McLarenFoto} className={`${style.media} ${style.psUm}`} />
                    )}

                    <button onClick={() => toggleVideo(0)} className={style.playBtn}>
                        {playing[0] ? "⏸" : "▶"}
                    </button>

                    <div className={`${style.container} ${style.itemUm}`}>
                        <div className={style.titulo}>
                            <h1>McLaren 765LT</h1>
                            <p>Supercarro</p>
                        </div>

                        <div className={style.descricao}>
                            <p>Potência híbrida, emoção sem limites</p>
                            <b>R$ 4.200.000,00</b>
                            <Link to="/produto/13">Compre Agora</Link>
                        </div>

                        <a href="/listagemProdutos" className={style.verMais}>
                            <div className={style.verMais}>
                                <p>Ver mais</p>
                                <img src={seta} />
                            </div>
                        </a>
                    </div>
                </div>



                <div className={style.item}>
                    {playing[1] && (
                        <video
                            ref={videoRefs[1]}
                            className={style.media}
                            loop muted src={Mercedes}></video>
                    )}
                    {!playing[1] && (
                        <img src={MercedesFoto} className={style.media} />
                    )}

                    <button onClick={() => toggleVideo(1)} className={style.playBtn}>
                        {playing[1] ? "⏸" : "▶"}
                    </button>

                    <div className={`${style.container} ${style.itemDois}`}>
                        <div className={style.titulo}>
                            <h1>Mercedes AMG</h1>
                            <p>Luxo</p>
                        </div>

                        <div className={style.descricao}>
                            <p>Performance em sua forma mais pura.</p>
                            <b>R$ 1.670.000,00</b>
                            <Link to="/produto/8">Compre Agora</Link>
                        </div>

                        <a href="/listagemProdutos" className={style.verMais}>
                            <div className={style.verMais}>
                                <p>Ver mais</p>
                                <img src={seta} />
                            </div>
                        </a>
                    </div>
                </div>



                <div className={style.item}>
                    {playing[2] && (
                        <video
                            ref={videoRefs[2]}
                            className={style.media}
                            loop muted src={Ferrari}></video>
                    )}
                    {!playing[2] && (
                        <img src={FerrariFoto} className={`${style.media} ${style.psDois}`} />
                    )}

                    <button onClick={() => toggleVideo(2)} className={style.playBtn}>
                        {playing[2] ? "⏸" : "▶"}
                    </button>

                    <div className={`${style.container} ${style.itemTres}`}>
                        <div className={style.titulo}>
                            <h1>Ferrari SF90</h1>
                            <p>Hyper Carro</p>
                        </div>

                        <div className={style.descricao}>
                            <p>Potência extrema, elegância absoluta</p>
                            <b>R$ 4.500.000,00</b>
                            <Link to="/produto/2">Compre Agora</Link>
                        </div>

                        <a href="/listagemProdutos" className={style.verMais}>
                            <div className={style.verMais}>
                                <p>Ver mais</p>
                                <img src={seta} />
                            </div>
                        </a>
                    </div>
                </div>


            </div>
            <div className={style.botoes}>
                <button className={`${style.botao} ${idx === 0 ? style.ativo : ""}`} onClick={() => handleManualChange(0)}>
                    <img src={McLarenFoto} className={style.preview} />

                    <div className={style.decoBtn} />
                </button>

                <button className={`${style.botao} ${idx === 1 ? style.ativo : ""}`} onClick={() => handleManualChange(1)}>
                    <img src={MercedesFoto} className={style.preview} />
                    <div key={`progress-${idx}`} className={style.decoBtn} />
                </button>

                <button className={`${style.botao} ${idx === 2 ? style.ativo : ""}`} onClick={() => handleManualChange(2)}>
                    <img src={FerrariFoto} className={style.preview} />
                    <div className={style.decoBtn} />
                </button>
            </div>
        </div>
    );

}