import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Imagens/Logo_Hyperion_Motors.png";
import style from "../styles/carregamento.module.css";
import fundo from "../Imagens/Fundo Cinza.jpg"

export default function Carregar() {
    const navigate = useNavigate();

    useEffect(() => {
        const tempo = setTimeout(() => {
            navigate("/paginaInicial");
        }, 1800);

        return () => clearTimeout(tempo);
    }, [navigate]);

    return (
        <div className={style.fundo}>
            <img className={style.imgFundo} src={fundo} />
            <div className={style.faixaBranca}></div>
            <img className={style.logo} src={logo} />
        </div>
    );
}