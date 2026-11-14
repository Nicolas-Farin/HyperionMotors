import style from "./style.module.css"

import verificado from "../../../Imagens/verificar.png"
import certificado from "../../../Imagens/Medalha.png"


export default function Especialidades() {
    return (
        <section className={style.container}>

            <div className={style.content}>

                <div className={style.left}>

                    <img src={certificado} className={style.iconTop}></img>
                    <h2> Por que Escolher a Hyperion Motors?</h2>

                    <p>
                        Com anos de experiência no mercado automotivo, conectamos milhares
                        de pessoas aos seus veículos ideais todos os meses. Nossa plataforma
                        foi desenvolvida pensando em você.
                    </p>

                    <div className={style.items}>

                        <div className={style.item}>
                            <img src={verificado} alt="" />
                            <div>
                                <h4>Atendimento Especializado</h4>
                                <p>Nossa equipe está pronta para ajudar em todas as etapas.</p>
                            </div>
                        </div>

                        <div className={style.item}>
                            <img src={verificado} alt="" />
                            <div>
                                <h4>Processos Transparentes</h4>
                                <p>Sem taxas ocultas ou surpresas desagradáveis.</p>
                            </div>
                        </div>

                        <div className={style.item}>
                            <img src={verificado} alt="" />
                            <div>
                                <h4>Tecnologia de Ponta</h4>
                                <p>Recursos modernos para facilitar sua experiência.</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className={style.right}></div>

            </div>

        </section>
    )
}