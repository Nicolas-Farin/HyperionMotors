import style from "./style.module.css"
import { useRef, useEffect } from "react";

export default function Hero() {

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
        <>
            <div
                ref={(el) => (elementosRef.current[0] = el)}
                className={`${style.container} ${style.animar}`}
            >
                <h1>Sobre nós</h1>
                <p>Mais de 25 anos conduzindo sonhos e entregando excelência no mercado automotivo Brasileiro.</p>
            </div>
        </>
    )
}