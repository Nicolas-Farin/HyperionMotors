import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import iconEmail from "../../imgs/ICON_email.png"
import iconHorario from "../../imgs/ICON_horario.png"
import iconLocalizacao from "../../imgs/ICON_localizacao.png"

export default function Agendamento({ produto }) {
  return (
    <section className={styles.agendamento}>

      <span className={styles.badge}>Disponível para Test Drive</span>

      <h2>Agende sua Visita</h2>
      <p className={styles.subtitulo}>
        Nossa equipe está pronta para oferecer uma experiência personalizada
      </p>

      {/* BOX PRINCIPAL */}
      <div className={styles.box}>
        <div className={styles.tituloAgendamento}>
          <h3>Interessado no {produto.nome}?</h3>
          <p>
            Fale com nossos especialistas e descubra as melhores condições de
            financiamento e troca
          </p>
        </div>

        <div className={styles.acoes}>
          {/* <button className={styles.btnPrimary}>
            Agendar Test Drive →
          </button> */}
          <Link to={`/contato`} className={styles.btnPrimary}>
            Agendar Test Drive →
          </Link>

          {/* NOVO BOTÃO: Simular Preço */}
          <Link
            to="/simulacao" /* Confirme se esta é a rota correta do seu simulador */
            state={{ carroPreSelecionado: produto.nome }}
            className={styles.btnSimular}
          >
            Simular Preço →
          </Link>

            {/* <button className={styles.btnOutline}>
            <a href="https://wa.me/5511999999999" target="_blank">
              (11) 99999-9999
            </a>
          </button> */}

        </div>
      </div>

      {/* INFOS */}
      {/* INFOS */}
      <div className={styles.infoGrid}>
        <div className={`${styles.infoCard} ${styles.cardLocalizacao}`}>
          <img src={iconLocalizacao} alt="Ícone de Localização" />
          <div>
            <p>Localização</p>
            <small>SESI CE-317 - Jaboticabal</small>
          </div>
        </div>

        <div className={`${styles.infoCard} ${styles.cardHorario}`}>
          <img src={iconHorario} alt="Ícone de Horário" />
          <div>
            <p>Horário</p>
            <small>Seg - Sáb: 9h às 20h</small>
          </div>
        </div>

        <div className={`${styles.infoCard} ${styles.cardEmail}`}>
          <img src={iconEmail} alt="Ícone de Email" />
          <div>
            <p>Email</p>
            <small>hyperionmotors@gmail.com</small>
          </div>
        </div>
      </div>

    </section>
  );
}