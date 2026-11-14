import React, { useEffect, useRef, useState } from "react";
import style from "./style.module.css";
import TopicosP from "../../../data/topicos.json";
import Noticias from "../../../data/noticias.json";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function Topicos() {
    const elementosRef = useRef([]);
    const viewportRef = useRef(null);

    const [modalOpen, setIsOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const noticiasFiltradas = Noticias.filter((n) => n.titulo);

    function abrirModal() {
        setIsOpen(true);
        setIndex(0);
    }

    function fecharModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        const el = viewportRef.current;
        if (!el) return;

        let ticking = false;

        const updateIndex = () => {
            const slideWidth = el.offsetWidth;
            const newIndex = Math.round(el.scrollLeft / slideWidth);

            if (newIndex !== index) {
                setIndex(newIndex);
            }

            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateIndex);
                ticking = true;
            }
        };

        el.addEventListener("scroll", handleScroll);

        return () => el.removeEventListener("scroll", handleScroll);
    }, [index]);



    useEffect(() => {
        const elementos = elementosRef.current;

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(style.mostrar);
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        setTimeout(() => {
            elementos.forEach((el) => el && observer.observe(el));
        }, 100);

        return () => observer.disconnect();
    }, []);

    const next = () => {
        if (!viewportRef.current) return;

        const slides = viewportRef.current.querySelectorAll(`.${style.slide}`);
        const nextIndex = index === noticiasFiltradas.length - 1 ? 0 : index + 1;

        slides[nextIndex].scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
        });

        setIndex(nextIndex);
    };

    const prev = () => {
        if (!viewportRef.current) return;

        const slides = viewportRef.current.querySelectorAll(`.${style.slide}`);
        const prevIndex = index === 0 ? noticiasFiltradas.length - 1 : index - 1;

        slides[prevIndex].scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
        });

        setIndex(prevIndex);
    };

    return (
        <>
            <div id="topicos" className={style.container}>
                {TopicosP.map((topico, i) => (
                    <a
                        key={i}
                        href={topico.link || "#"}
                        ref={(el) => (elementosRef.current[i] = el)}
                        className={`${style.topico} ${style.animar}`}
                    >
                        <img className={style.imagem} src={topico.imagem} />

                        <div className={style.titulo}>
                            <h1>{topico.tituloUm}</h1>
                            <h2>{topico.tituloDois}</h2>
                            <div className={style.traco} />
                        </div>

                        {topico.id === 4 && (
                            <button
                                className={style.botaoDoidoAbrir}
                                onClick={(e) => {
                                    e.preventDefault();
                                    abrirModal();
                                }}
                            />
                        )}
                    </a>
                ))}
            </div>

            <Modal
                isOpen={modalOpen}
                onRequestClose={fecharModal}
                className={style.modal}
                overlayClassName={style.modalOverlay}
            >
                <div className={style.carouselWrapper}>
                    <div ref={viewportRef} className={style.carouselViewport}>
                        <div className={style.carousel}>
                            {noticiasFiltradas.map((noticia, i) => (
                                <div key={i} className={style.slide}>
                                    <div className={style.noticia}>
                                        {noticia.imagem && (
                                            <img
                                                className={style.imagemNot}
                                                src={noticia.imagem}
                                                alt=""
                                            />
                                        )}

                                        <div className={style.escritas}>
                                            <h1>{noticia.titulo}</h1>
                                            <p>{noticia.descricao}</p>
                                            <p className={style.data}>{noticia.data}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        id="setaDireita"
                        className={style.setaDireita}
                        onClick={next}
                    >
                        ▶
                    </button>

                    <button
                        id="setaEsqueda"
                        className={style.setaEsquerda}
                        onClick={prev}
                    >
                        ◀
                    </button>
                </div>

                <div className={style.dots}>
                    {noticiasFiltradas.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                if (!viewportRef.current) return;

                                const slides = viewportRef.current.querySelectorAll(`.${style.slide}`);

                                slides[i].scrollIntoView({
                                    behavior: "smooth",
                                    inline: "center",
                                    block: "nearest",
                                });

                                setIndex(i);
                            }}
                            className={i === index ? style.dotActive : style.dot}
                        />
                    ))}
                </div>

                <button
                    className={style.botaoDoidoFechar}
                    onClick={fecharModal}
                >
                    <b>X</b>
                    <p>Fechar noticias</p>
                </button>
            </Modal>
        </>
    );
}