import style from "./style.module.css";
import olhoAberto from "../../../Imagens/olho-aberto.png";
import olhoFechado from "../../../Imagens/olho-fechado.png";
import { useEffect, useRef, useState } from "react";

export default function Sobre() {

    // Animar Funcionando

    const elementosRef = useRef([]);

    useEffect(() => {
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

        elementosRef.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Animar funcionando

    const [ativo, setAtivo] = useState(true);
    const [VRativo, setVR] = useState(true);

    function toggle() {
        setVR(!VRativo);
        setAtivo(!ativo);
    }

    return (
        <div
            ref={(el) => (elementosRef.current[0] = el)}
            className={`${style.container} ${style.animar}`}
        >
            <iframe
                className={`${style.Model} ${!VRativo ? style.VRativo : ""}`}
                title="BMW M5 CS"
                frameBorder="0"
                allowFullScreen
                src="https://sketchfab.com/models/833c5e9fb6f945cc82450fffbb96e77b/embed?autostart=1&transparent=1"
            />

            <div
                ref={(el) => (elementosRef.current[1] = el)}
                className={`${style.escritas} ${style.animar}`}
            >
                <div className={`${!ativo ? style.esconder : ""} ${style.reparticao}`}>
                    <h1>HYPERION <b>MOTORS</b></h1>
                    <p>
                        A Hyperion não é apenas uma concessionária — é um destino para quem
                        entende que carro de <i>luxo</i> não é transporte, é status, engenharia e desejo materializado.
                    </p>
                </div>

                <div className={style.reparticaoDois}>
                    <div>
                        <button onClick={toggle} className={style.btnMostrar}>
                            <img
                                className={`${style.olho} ${!ativo ? style.esconder : ""}`}
                                src={olhoAberto}
                            />
                            <img
                                className={`${style.olho} ${ativo ? style.esconder : ""}`}
                                src={olhoFechado}
                            />
                        </button>
                        <h1 className={`${!ativo ? style.esconder : ""}`}>Ver 3D</h1>
                    </div>

                    <p className={`${!ativo ? style.esconder : ""}`}>
                        Especializada em veículos de alto padrão, fornecendo curadoria exclusiva de marcas icônicas como Ferrari, Lamborghini, BMW, Mercedes-Benz, Porsche e McLaren, oferecendo desde superesportivos de última geração até modelos raros para colecionadores exigentes.
                    </p>
                </div>
            </div>
        </div>
    );
}