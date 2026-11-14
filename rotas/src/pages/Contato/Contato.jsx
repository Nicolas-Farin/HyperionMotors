import { useRef, useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import styles from "./Contato.module.css";

import iconEmail from "../../imgs/ICON_email.png"
import Telefone from "../../imgs/ICON_telefone.png";
import iconLocalizacao from "../../imgs/ICON_localizacao.png"
import iconHorario from "../../imgs/ICON_horario.png"

import HeaderContato from "../../../../Hypreion Motors - Nicolas/src/components/HeaderContato";
import Rodape from "../../../../Hypreion Motors - Nicolas/src/components/Footer";

const handlePhoneInput = (e) => {
    let value = e.target.value;

    // 1. Remove tudo o que não for número (letras, símbolos, etc.)
    value = value.replace(/\D/g, "");

    // 2. Limita a 11 números (2 do DDD + 9 do telefone)
    if (value.length > 11) {
        value = value.slice(0, 11);
    }

    // 3. Aplica a máscara: (XX) XXXXX-XXXX
    if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2"); // Coloca parênteses no DDD
    }
    if (value.length > 9) {
        // Formato para celular com 9 dígitos: (XX) XXXXX-XXXX
        value = value.replace(/(\d{5})(\d)/, "$1-$2");
    } else if (value.length > 8) {
        // Formato para telefone fixo com 8 dígitos: (XX) XXXX-XXXX
        value = value.replace(/(\d{4})(\d)/, "$1-$2");
    }

    // 4. Atualiza o valor do input com a máscara aplicada
    e.target.value = value;
};



export default function Contato() {

    window.onload = () => {
        window.scrollTo(0, 0);
    };


    // Referência para o formulário
    const form = useRef();
    // Estado para controlar a mensagem de feedback na tela
    const [statusEnvio, setStatusEnvio] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); // Evita recarregar a página
        setStatusEnvio("enviando...");

        // Parâmetros: Service ID, Template ID, Referência do Form, Public Key
        emailjs.sendForm(
            'service_uxkrze1',
            'template_r3bfbic',
            form.current,
            '5AvzaZ2rBeoZyrQ5H'
        )
            .then((result) => {
                console.log(result.text);
                setStatusEnvio("sucesso");
                e.target.reset(); // Limpa os campos do formulário após o envio

                // Oculta a mensagem de sucesso após 5 segundos
                setTimeout(() => setStatusEnvio(""), 5000);
            }, (error) => {
                console.log(error.text);
                setStatusEnvio("erro");
            });
    };


    const elementosRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.mostrar);
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
        <section>

            <HeaderContato />

            {/* HERO */}
            <div className={styles.estatico}>
                <div className={styles.hero}>
                    <h1>ENTRE EM CONTATO</h1>
                </div>

                {/* CONTEÚDO */}
                <div className={styles.container}>

                    {/* FORMULÁRIO */}
                    <div className={styles.cardFormBox}>
                        <h2>Envie uma mensagem:</h2>

                        {/* Adicionamos a ref={form} e o onSubmit */}
                        <form ref={form} onSubmit={handleSubmit} id="form">
                            <label>Nome:</label>
                            {/* Importante: O atributo 'name' deve existir e ser igual ao usado no template do EmailJS */}
                            <input type="text" name="nome" required placeholder="Seu nome completo" />

                            <label>E-mail:</label>
                            <input type="email" name="email" required placeholder="seu@email.com" />

                            <label>Telefone:</label>
                            <input
                                type="tel"
                                name="telefone"
                                required
                                placeholder="(00) 00000-0000"
                                onInput={handlePhoneInput}
                                maxLength="15"
                            />

                            <label>Mensagem:</label>
                            <textarea name="mensagem" required placeholder="Escreva sua mensagem aqui..." />

                            <button type="submit" disabled={statusEnvio === "enviando..."}>
                                {statusEnvio === "enviando..." ? "ENVIANDO..." : "ENVIAR MENSAGEM"}
                            </button>

                            {/* Mensagens de feedback */}
                            {statusEnvio === "sucesso" && (
                                <p style={{ color: "green", marginTop: "15px", fontWeight: "bold", textAlign: "center" }}>
                                    Mensagem enviada com sucesso!
                                </p>
                            )}
                            {statusEnvio === "erro" && (
                                <p style={{ color: "red", marginTop: "15px", fontWeight: "bold", textAlign: "center" }}>
                                    Ocorreu um erro. Tente novamente mais tarde.
                                </p>
                            )}
                        </form>
                    </div>

                    {/* INFORMAÇÕES */}
                    <div className={styles.infoBox}>

                        <div className={styles.card}>
                            <h3>Informações de contatos</h3>

                            <div className={styles.infoItem}>
                                <div className={styles.iconTelefone}><img src={Telefone} alt="Icone Telefone" /></div>
                                <div className={styles.infoText}>
                                    <div className={styles.title}>Telefone</div>
                                    (11) 99999-9999<br />
                                    (11) 3200-0500
                                </div>
                            </div>

                            <hr />

                            <div className={styles.infoItem}>
                                <div className={styles.icon}><img src={iconEmail} alt="Icone Email" /></div>
                                <div className={styles.infoText}>
                                    <div className={styles.title}>E-mail</div>
                                    contato@autoelite.com.br<br />
                                    vendas@autoelite.com.br
                                </div>
                            </div>

                            <hr />

                            <div className={styles.infoItem}>
                                <div className={styles.icon}><img src={iconLocalizacao} alt="Icone Localização" /></div>
                                <div className={styles.infoText}>
                                    <div className={styles.title}>Endereço</div>
                                    Av. Brasil, 1234 - Centro<br />
                                    São Paulo - SP
                                </div>
                            </div>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.tituloHorario}>
                                <div className={styles.icon}><img src={iconHorario} alt="Icone Horario" /> </div>
                                <h3> Horário de Atendimento</h3>
                            </div>

                            <div className={styles.hours}>
                                <div>
                                    <span>Segunda a Sexta</span>
                                    <span>08:00 - 18:00</span>
                                </div>

                                <hr className={styles.divisoria} />

                                <div>
                                    <span>Sábado</span>
                                    <span>09:00 - 14:00</span>
                                </div>

                                <hr className={styles.divisoria} />

                                <div>
                                    <span>Domingo</span>
                                    <span className={styles.closed}><b>Fechado</b></span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className={styles.sobreposicao}>
                {/* MAPA */}
                <div className={styles.map}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d464.79322691644245!2d-48.300977721143056!3d-21.257774696522816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b96b83d82448fd%3A0x46e60858373c9de9!2sSesi!5e0!3m2!1spt-BR!2sbr!4v1775739525338!5m2!1spt-BR!2sbr"
                        title="Mapa"
                    />
                </div>

                <Rodape />
            </div>

        </section>
    );
}