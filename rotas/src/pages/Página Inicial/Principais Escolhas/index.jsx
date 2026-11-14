import style from "./style.module.css";
import produtos from "../../../data/produtos.json";
import CardPgInicial from "../../Card Página Inicial";
import { useRef } from "react";
import { useEffect } from "react";

export default function Escolhas() {

    const elementosRef = useRef([]);
    const viewportRef = useRef(null);

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


    const containerRef = useRef(null);
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const handleMouseDown = (e) => {
        isDown.current = true;
        startX.current = e.pageX - containerRef.current.offsetLeft;
        scrollLeft.current = containerRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDown.current = false;
    };

    const handleMouseUp = () => {
        isDown.current = false;
    };

    const handleMouseMove = (e) => {
        if (!isDown.current) return;

        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX.current) * 2;

        if (Math.abs(x - startX.current) > 2) {
            e.preventDefault();
        }

        containerRef.current.scrollLeft = scrollLeft.current - walk;
    };

    return (
        <div 
        className={`${style.container} ${style.animar}`} 
        ref={(el) => (elementosRef.current[0] = el)}>
        
            <div className={style.titulo}>
                <h1>Principais Escolhas</h1>
                <hr />
            </div>

            <div
                ref={containerRef}
                className={style.grid}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {produtos
                    .filter(p => p.id < 7)
                    .map(p => (
                        <CardPgInicial
                            key={p.id}
                            produto={p}
                        />
                    ))}
            </div>
        </div>
    )
}