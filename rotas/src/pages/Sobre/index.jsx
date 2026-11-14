
import Header from "../../components/Header";
import Especialidades from "./Especialidades/index";
import Hero from "./Hero";
import Historia from "./História-Resultados";
import Valores from "./Valores";
import Rodape from '../../components/Footer';

export default function Sobre() {
    window.onload = () => {
        window.scrollTo(0, 0);
    };

    return (
        <>
            <Header />
            <Hero />
            <Historia />
            <Valores />
            <Especialidades />
            <Rodape />
        </>
    );
}
