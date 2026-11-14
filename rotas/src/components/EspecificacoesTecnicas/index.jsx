import styles from "./styles.module.css";
import iconDesign from "../../imgs/ICON_design.png"
import iconTecnologia from "../../imgs/ICON_tecnologia.png"
import iconMotor from "../../imgs/ICON_motorCarro2.png"
import iconConforto from "../../imgs/ICON_conforto.png"

const icones = {
    design: iconDesign,
    tecnologia: iconTecnologia,
    motor: iconMotor,
    conforto: iconConforto
};

export default function EspecificacoesTecnicas({ produto }) {

    window.onload = () => {
  window.scrollTo(0, 0);
};

    if (!produto) return null;

    return (
        <div className={styles.container}>
            <h2 className={styles.titulo}>Detalhes do Veículo</h2>

            <div className={styles.grid}>
                {produto.especificacoesDetalhadas.map((item, index) => (
                    <div key={index} className={styles.card}>

                        <div className={styles.icone}>
                            {Object.keys(icones).map((key) =>
                                item.titulo.toLowerCase().includes(key) ? (
                                    <img className={styles.IMGicon} key={key} src={icones[key]} alt={key} />
                                ) : null
                            )}
                        </div>

                        <h4 className={styles.cardTitulo}>{item.titulo}</h4>
                        <p className={styles.cardDescricao}>{item.descricao}</p>

                    </div>
                ))}
            </div>
        </div>
    );
}