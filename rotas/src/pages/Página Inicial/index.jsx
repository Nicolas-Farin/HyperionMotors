import Header from '../../components/Header/index';
import { useEffect } from "react";
import style from "../../styles/paginaInicial.module.css";
import Hero from './Hero';
import Sobre from './Sobre';
import Escolhas from './Principais Escolhas';
import Topicos from './Tópicos';
import Rodape from '../../components/Footer';
import ContatoCaixa from './contato';

window.onload = () => {
  window.scrollTo(0, 0);
};

export default function PaginaInicial() {
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
 
    return (

        <>
            < Header />
            <Hero />
            <Sobre />
            <Escolhas />
            <Topicos />
            <ContatoCaixa />
            <Rodape />
        </>
    );
}