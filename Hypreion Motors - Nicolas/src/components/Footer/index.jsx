import style from "./style.module.css";
import logo from "../../Imgs/Logo_Hyperion_Motors.png"
import youtube from "../../Imgs/youtube.png"
import facebook from "../../Imgs/facebook (1).png"
import instagram from "../../Imgs/instagram (1).png"

import local from "../../Imgs/marcador.png"
import telefone from "../../Imgs/chamada-telefonica.png"
import email from "../../Imgs/envelope.png"

export default function Rodape() {
    return (
        <div className={style.container}>
            <hr className={style.divisoriaFooter} />
            <div className={style.info}>
                <div className={style.empresa}>
                    <img className={style.logo} src={logo} alt="" />
                    <p>Seu destino principal para veículos de luxo. Qualidade, elegância e desempenho em cada carro que oferecemos.</p>
                    <div className={style.redesSociais}>
                        <img src={youtube} />
                        <img src={facebook} />
                        <img src={instagram} />
                    </div>
                </div>

                <div className={style.links}>
                    <h1>Links Rápidos</h1>
                    <a href="/paginaInicial">Página Inicial</a>
                    <a href="/listagemProdutos">Carros</a>
                    <a href="/contato">Contato</a>
                    <a href="/simulacao">Faça uma simulação</a>
                </div>

                <div className={style.contato}>
                    <h1>Contate-nos</h1>
                    <div>
                        <img src={local} />
                        <p> SESI CE-317
                            <br />
                            Jaboticabal</p>
                    </div>
                    <div>
                        <img src={telefone} />
                        <p>(16) 99999-9999</p>
                    </div>
                    <div>
                        <img src={email} />
                        <p> hyperionmotors@gmail.com</p>
                    </div>
                </div>

                <div className={style.horarios}>
                    <h1>Horários</h1>
                    <div>
                        <p>Segunda - Sexta</p>
                        <p>9:00 AM - 8:00 PM</p>
                    </div>
                    <div>
                        <p>Sabado</p>
                        <p>10:00 AM - 6:00 PM</p>
                    </div>
                    <div>
                        <p>Domingo</p>
                        <b>Fechado</b>
                    </div>
                </div>

            </div>
            <hr />
            <div className={style.direitos}>
                <div className={style.copyright}>
                    <p>© 2026 Hyperion Motors. Todos os direitos reservados</p>
                </div>

                <div className={style.termos}>
                    <p>Políticas de Privacidade</p>
                    <p>Termos de Serviço</p>
                </div>
            </div>
        </div>
    )
}