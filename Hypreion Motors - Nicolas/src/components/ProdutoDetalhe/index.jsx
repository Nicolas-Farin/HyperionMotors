import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import EspecificacoesTecnicas from "../EspecificacoesTecnicas";
import Agendamento from "../Agendamento";
import Header from "../../components/Header";
import Rodape from "../../components/Footer";


// import imgPotencia from "../../imgs/ICON_potencia.png";
import imgPotenciaPreto from "../../imgs/ICON_potenciaPreto.png";
import imgTorque from "../../imgs/ICON_torque.png";
import imgZeroA100 from "../../imgs/ICON_0a100.png";
import imgVelMax from "../../imgs/ICON_Vel-Max.png";
import imgConsumo from "../../imgs/ICON_consumo.png";
import imgBateriaOuTanque from "../../imgs/ICON_bateria_tanque.png";
import imgTracao from "../../imgs/ICON_tracao2.png";
import imgMarchas from "../../imgs/ICON_marchas.png";


import anoCarro from "../../imgs/ICON_anoCarro.png";
import kmCarro from "../../imgs/ICON_kmCarro.png";
import combustivel from "../../imgs/ICON_combustivel.png";
import cambio from "../../imgs/ICON_cambio.png";
import motorCarro from "../../imgs/ICON_motorCarro2.png";


import WhatsApp from "../../imgs/ICON_whatsapp.png";
import Telefone from "../../imgs/ICON_telefone.png";
import Email from "../../imgs/ICON_email.png";


export default function ProdutoDetalhe({ produto }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // cria o loop (última + todas + primeira)
  const imagensLoop = [
    produto.imagens[produto.imagens.length - 1],
    ...produto.imagens,
    produto.imagens[0]
  ];

  useEffect(() => {
    const container = trackRef.current;
    if (container) {
      container.scrollLeft = container.offsetWidth;
    }
  }, []);

  if (!produto) return <p>Produto não encontrado</p>;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showOpcoes, setShowOpcoes] = useState(false);
  const [opcoesVisible, setOpcoesVisible] = useState(false);
  const [specAtiva, setSpecAtiva] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);


  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) =>
      prev === produto.imagens.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setLightboxIndex((prev) =>
      prev === 0 ? produto.imagens.length - 1 : prev - 1
    );
  };

  const openModal = () => {
    setModalOpen(true);

    setTimeout(() => {
      setModalVisible(true);
    }, 10);
  };

  const closeModal = () => {
    setModalVisible(false);

    setTimeout(() => {
      setModalOpen(false);
    }, 300); // tempo da animação
  };

  const toggleOpcoes = () => {
    if (showOpcoes) {
      // fechar com animação
      setOpcoesVisible(false);
      setTimeout(() => setShowOpcoes(false), 250);
    } else {
      // abrir
      setShowOpcoes(true);
      setTimeout(() => setOpcoesVisible(true), 10);
    }
  };

  const specs = [
    { key: "potencia", label: "Potência", value: produto.potencia, img: imgPotenciaPreto },
    { key: "torque", label: "Torque", value: produto.torque, img: imgTorque },
    { key: "zeroA100", label: "0-100 km/h", value: produto.zeroA100, img: imgZeroA100 },
    { key: "velocidadeMax", label: "Vel. Máxima", value: produto.velocidadeMax, img: imgVelMax },
    { key: "consumo", label: "Consumo", value: produto.consumo, img: imgConsumo },
    { key: "bateriaOuTanque", label: "Bateria/Tanque", value: produto.bateriaOuTanque, img: imgBateriaOuTanque },
    { key: "tracao", label: "Tração", value: produto.tracao, img: imgTracao },
    { key: "marchas", label: "Marchas", value: produto.marchas, img: imgMarchas }
  ];

  const handleScroll = () => {
    const container = trackRef.current;
    const width = container.offsetWidth;
    const scrollLeft = container.scrollLeft;

    const index = Math.round(scrollLeft / width);

    // LOOP infinito
    if (index === 0) {
      container.scrollLeft = width * produto.imagens.length;
      return;
    }

    if (index === produto.imagens.length + 1) {
      container.scrollLeft = width;
      return;
    }

    setActiveIndex(index - 1);
  };

  return (
    <section>

      <Header />

      <div className={styles.container}>

        {/* GALERIA */}
        <div className={styles.galeria}>

          {/* BOTÃO VOLTAR / ABRIR MODAL */}
          <button
            className={styles.btn3D}
            onClick={openModal}
          >
            Ver em 3D
          </button>

          {/* DESKTOP */}
          <div className={styles.galeriaDesktop}>
            <img
              className={styles.imgPrincipal}
              src={produto.imagens[0]}
              onClick={() => openLightbox(0)}
            />

            <div className={styles.gridImgs}>
              {produto.imagens.slice(1).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={styles.imgSecundaria}
                  onClick={() => openLightbox(index + 1)}
                />
              ))}
            </div>
          </div>

          {/* MOBILE CARROSSEL */}
          <div className={styles.carouselMobile}>
            <div
              className={styles.carouselTrack}
              ref={trackRef}
              onScroll={handleScroll}
            >
              {imagensLoop.map((img, index) => (
                <div className={styles.slide} key={index}>
                  <img
                    src={img}
                    onClick={() => openLightbox(index - 1)} // cuidado com loop
                  />
                </div>
              ))}
            </div>

            <div className={styles.indicators}>
              {produto.imagens.map((_, index) => (
                <span
                  key={index}
                  className={index === activeIndex ? styles.activeDot : ""}
                />
              ))}
            </div>
          </div>

        </div>

        {/* TOPO INFO */}
        <div className={styles.topo}>

          <div className={styles.infoMarca}>

            <img src={produto.logo} className={styles.logo} />

            <div>
              <p className={styles.marca}>{produto.marca}</p>
              <h2>{produto.nome}</h2>
            </div>

          </div>

          <div className={styles.precoBox}>
            <h2 className={styles.preco}>
              <strong>R$</strong> {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
            <div className={styles.btns}>
              <Link
                to="/simulacao" /* Confirme se esta é a rota correta do seu simulador */
                state={{ carroPreSelecionado: produto.nome }}
                className={styles.btnSimular}
              >
                Simular Preço →
              </Link>

              <button
                className={styles.btnSecundario}
                onClick={toggleOpcoes}
              >
                Mais opções →
              </button>

              {showOpcoes && (
                <div
                  className={`${styles.dropdownOpcoes} ${opcoesVisible ? styles.open : ""
                    }`}
                >
                  <a href="https://wa.me/5511999999999" target="_blank" className={styles.LinkWhatsapp}>
                    <img className={styles.WhatsApp} src={WhatsApp} alt="Icone Whatsapp" /> (11) 99999-9999
                  </a>

                  <span className={styles.containerLink}> <a href="tel:+5516997036616" className={styles.linkTelefone}>
                    <img className={styles.Telefone} src={Telefone} alt="Icone Telefone" /> (11) 3200-0500
                  </a> </span>

                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=nicolasfarinelin@gmail.com&su=Contato%20via%20site%20-%20Hyperion%20Motors"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkEmail}
                  >
                    <img className={styles.Email} src={Email} alt="Icone Email" />
                    nicolasfarinelin@gmail.com
                  </a>

                  <Link to={`/contato`} className={styles.btnPrimary}>
                    Enviar formulario
                  </Link>
                </div>
              )}
            </div>
          </div>

        </div>

        {modalOpen && (
          <div
            className={`${styles.modalOverlay} ${modalVisible ? styles.open : styles.closed
              }`}
            onClick={closeModal}
          >

            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} >

              <button
                className={styles.closeBtn}
                onClick={closeModal}
              >
                ✕
              </button>

              {/* MODAL */}
              <div className={styles.modalHeader}>
                <h2>{produto.nome}</h2>
                <p>Visualize o modelo 3D de {produto.nome} com rotação e zoom interativo:</p>
              </div>

              {/* CONTEÚDO */}
              <div className={styles.modelo3D}>
                <iframe
                  title={produto.nome}
                  src={produto.modelo3D}
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  allowFullScreen
                ></iframe>
              </div>

            </div>

          </div>
        )}

        <hr className={styles.divisoriaHR} />

        {/* DESCRIÇÃO + SPECS */}
        <div className={styles.conteudo}>

          <div className={styles.descricao}>
            <h5>PERFORMANCE E EFICIÊNCIA</h5>
            <h2>Especificações Técnicas</h2>
            <p>{produto.descricao}</p>

            <div className={styles.destaqueBox}>
              <img className={styles.motorCarro} src={motorCarro} alt="IMG_motorCarro" />

              <div>
                <span className={styles.tituloMotor}>
                  {produto.motorDestaque.titulo.split(" ").map((palavra, index) => (
                    <span
                      key={index}
                      style={{ fontWeight: index === 1 ? "bold" : "normal" }}
                    >
                      {palavra + " "}
                    </span>
                  ))}
                </span>

                <p>{produto.motorDestaque.descricao}</p>
              </div>
            </div>

            <div className={styles.tags}>

              <div className={styles.tag}>
                <img src={anoCarro} alt="Icone ano do carro" />
                <span> Ano: <strong>{produto.ano}</strong> </span>
              </div>

              <div className={styles.tag}>
                <img src={kmCarro} alt="Icone kilometragem do carro" />
                <span> Km: <strong>{produto.quilometragem}</strong> </span>
              </div>

              <div className={styles.tag}>
                <img src={combustivel} alt="Icone tipo de combustivel" />
                <span> Combustivel: <strong>{produto.combustivel}</strong> </span>
              </div>

              <div className={styles.tag}>
                <img src={cambio} alt="Icone cambio do carro" />
                <span> Câmbio: <strong>{produto.cambio}</strong> </span>
              </div>

            </div>
          </div>

          {/* GRID SPECS */}
          <div className={styles.specGrid}>
            {specs.map((spec) => {
              const isDestaque = produto.destaquesSpecs?.includes(spec.key);

              return (
                <div
                  key={spec.key}
                  className={`${styles.spec} ${isDestaque ? styles.specDestaque : ""}`}
                >
                  <button
                    className={`${styles.specInfoBtn} ${isDestaque ? styles.btnDestaque : styles.btnNormal}`}
                    onClick={() => setSpecAtiva(spec.key)}
                  >
                    !
                  </button>

                  {/* 👇 POPOVER */}
                  {specAtiva === spec.key && (
                    <div className={styles.specPopover}>
                      <button
                        className={styles.specCloseBtn}
                        onClick={() => setSpecAtiva(null)}
                      >
                        ✕
                      </button>

                      <h4>
                        {spec.label}
                        {isDestaque && "  -  Destaque"}
                      </h4>
                      <p>
                        {produto.descricaoSpecs?.[spec.key] || "Sem descrição disponível."}
                      </p>
                    </div>
                  )}

                  <img src={spec.img} alt="Imagem da especificacao do carro" />

                  <div className={styles.specInfos}>
                    <span>{spec.label}</span>
                    <strong>{spec.value}</strong>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        <hr className={styles.divisoriaHR} />

        {/* ESPECIFICAÇÕES DETALHADAS */}
        <EspecificacoesTecnicas produto={produto} />

      </div>
      <Agendamento produto={produto} />





      {lightboxOpen && (
        <div className={styles.lightboxOverlay} onClick={closeLightbox}>

          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >

            <button className={styles.lightboxClose} onClick={closeLightbox}>
              ✕
            </button>

            <button className={styles.prevBtn} onClick={prevImage}>
              ‹
            </button>

            <img
              src={produto.imagens[lightboxIndex]}
              className={styles.lightboxImg}
            />

            <button className={styles.nextBtn} onClick={nextImage}>
              ›
            </button>

          </div>
        </div>
      )}

      <Rodape />

    </section>
  );







}