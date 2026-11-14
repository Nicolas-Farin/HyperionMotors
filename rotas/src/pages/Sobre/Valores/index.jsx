import style from "./style.module.css"

export default function Valores() {
    return (
        <section className={style.container}>

            <div className={style.header}>
                <span>O QUE NOS MOVE</span>
                <h1>NOSSOS VALORES</h1>
            </div>

            <div className={style.cards}>
                <div className={style.card}>
                    <div className={style.icon}>☆</div>
                    <h3>Exelencia</h3>
                    <p>
                        Buscamos a perfeição em cada detalhe, desde a seleção
                        criteriosa dos veículos até o atendimento pós-venda.
                    </p>
                </div>

                <div className={style.card}>
                    <div className={style.icon}>👁</div>
                    <h3>Transparencia</h3>
                    <p>
                        Relações claras e honestas, com nossos clientes.
                        sem surpresas, sem letras miudas, apenas confiança mutua.
                    </p>
                </div>

                <div className={style.card}>
                    <div className={style.icon}>⚡︎</div>
                    <h3>Inovação</h3>
                    <p>
                        Abraçamos as novas tecnologia e tendencias do mercado
                        automotivo para oferecer sempre o melhor.
                    </p>
                </div>

                <div className={style.card}>
                    <div className={style.icon}>✔</div>
                    <h3>Compromisso</h3>
                    <p>
                        Nossa palavra e nosso contrato cada promessa feita e uma
                        promessa cumprida, sem exceções.
                    </p>
                </div>
            </div>
        </section>
    )
}