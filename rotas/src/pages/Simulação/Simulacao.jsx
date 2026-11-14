import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./simulacao.module.css";
import produtos from "../../data/produtos.json";
import Header from "../../components/Header/index.jsx";
import Rodape from "../../components/Footer/index.jsx";

import graficoColuna from "../../imgs/ICON_graficoColuna.png";
import graficoLinha from "../../imgs/ICON_graficoLinha.png";
import sacoDinheiro from "../../imgs/ICON_sacoDinheiro.png";

import Relogio from "../../imgs/ICON_Relogio.png";
import Perigo from "../../imgs/ICON_danger.png";
import Alerta from "../../imgs/ICON_alerta.webp";


function App() {
    const location = useLocation();

    const parcelasDisponiveis = [12, 24, 36, 48, 60, 72, 84, 96];

    const [carroSelecionado, setCarroSelecionado] = useState(null);
    const [parcelas, setParcelas] = useState(12);

    const [busca, setBusca] = useState("");
    const [dropdownAberto, setDropdownAberto] = useState(false);

    // Estados de expansão (Penalidades e Seguro)
    const [penalidadesExpandidas, setPenalidadesExpandidas] = useState(false);
    const [mostrarSeguro, setMostrarSeguro] = useState(false); // NOVO ESTADO

    useEffect(() => {
        if (location.state && location.state.carroPreSelecionado) {
            const carroEncontrado = produtos.find(
                (c) => c.nome === location.state.carroPreSelecionado
            );

            if (carroEncontrado) {
                setCarroSelecionado(carroEncontrado);
                setBusca(carroEncontrado.nome);
            }
        }
    }, [location.state]);

    useEffect(() => {
        if (!dropdownAberto) {
            setBusca(carroSelecionado ? carroSelecionado.nome : "");
        }
    }, [dropdownAberto, carroSelecionado]);

    const carrosFiltrados = produtos.filter((carro) =>
        carro.nome.toLowerCase().includes(busca.toLowerCase())
    );

    const calcularSimulacao = (preco, qtdParcelas) => {
        let taxaJuros = 0;
        if (qtdParcelas <= 24) taxaJuros = 0.99;
        else if (qtdParcelas <= 36) taxaJuros = 1.49;
        else if (qtdParcelas <= 48) taxaJuros = 1.69;
        else if (qtdParcelas <= 60) taxaJuros = 1.99;
        else if (qtdParcelas <= 72) taxaJuros = 2.29;
        else taxaJuros = 2.59;

        const taxaDecimal = taxaJuros / 100;
        let valorDaParcela = 0;

        if (taxaDecimal === 0) {
            valorDaParcela = preco / qtdParcelas;
        } else {
            valorDaParcela =
                (preco * taxaDecimal) /
                (1 - Math.pow(1 + taxaDecimal, -qtdParcelas));
        }

        return {
            valor: valorDaParcela,
            juros: taxaJuros
        };
    };

    let juros = 0;
    let taxa = 0;
    let valorParcela = 0;
    let valorMulta = 0;

    // NOVO: Valores dinâmicos simulados para o seguro
    let valorSeguroAproximado = 0;
    let valorFranquia = 0;

    if (carroSelecionado) {
        const simulacaoAtual = calcularSimulacao(carroSelecionado.preco, parcelas);
        juros = simulacaoAtual.juros;
        taxa = juros / 100;
        valorParcela = simulacaoAtual.valor;

        const multaPercentual = 2;
        valorMulta = valorParcela * (multaPercentual / 100);

        // LÓGICA DE SEGURO REALISTA:
        // Exóticos (Acima de 2M): 7% do valor / Outros: 4.5% do valor
        let taxaSeguro = carroSelecionado.preco > 2000000 ? 0.07 : 0.045;

        // Franquia: Exóticos: 8% do valor / Outros: 5.5% do valor
        let taxaFranquia = carroSelecionado.preco > 2000000 ? 0.08 : 0.055;

        valorSeguroAproximado = carroSelecionado.preco * taxaSeguro;
        valorFranquia = carroSelecionado.preco * taxaFranquia;
    }

    const formatarMoeda = (valor) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(valor);
    };

    const selecionarCarro = (carro) => {
        setCarroSelecionado(carro);
        setBusca(carro.nome);
        setDropdownAberto(false);
        setMostrarSeguro(false); // Fecha o seguro ao trocar de carro
    };

    return (
        <div className={styles.pageWrapper}>
            <Header />

            {/* SEÇÃO DO CABEÇALHO */}
            <div className={styles.headerSectionWrapper}>
                <div className={styles.container}>
                    <div className={styles.simuladorHeader}>
                        <span className={styles.overline}>FINANCIAMENTO E EFICIÊNCIA</span>
                        <h2>Simulador de Preços</h2>
                        <p>
                            Projetado para oferecer transparência. Calcule as condições de pagamento do seu
                            próximo veículo com precisão e clareza.
                        </p>
                    </div>
                </div>
            </div>

            {/* SEÇÃO PRINCIPAL */}
            <div className={styles.mainSectionWrapper}>
                <div className={styles.container}>

                    <div className={styles.formSection}>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Selecione ou Pesquise o Veículo</label>

                                <div className={styles.searchableSelect}>
                                    <input
                                        type="text"
                                        value={busca}
                                        placeholder="Ex: Rolls-Royce Phantom..."
                                        onChange={(e) => {
                                            setBusca(e.target.value);
                                            setDropdownAberto(true);
                                        }}
                                        onFocus={() => setDropdownAberto(true)}
                                        onBlur={() => setDropdownAberto(false)}
                                    />

                                    <span className={styles.selectSeta}>▼</span>

                                    {dropdownAberto && (
                                        <ul className={styles.dropdownList}>
                                            {carrosFiltrados.length > 0 ? (
                                                carrosFiltrados.map((carro) => (
                                                    <li
                                                        key={carro.nome}
                                                        className={styles.dropdownItem}
                                                        onMouseDown={() => selecionarCarro(carro)}
                                                    >
                                                        {carro.nome} <span className={styles.precoTag}>- {formatarMoeda(carro.preco)}</span>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className={styles.dropdownItemVazio}>Veículo não encontrado</li>
                                            )}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Valor do Veículo</label>
                                <input
                                    type="text"
                                    value={carroSelecionado ? formatarMoeda(carroSelecionado.preco) : "R$ 0,00"}
                                    readOnly
                                    style={{ backgroundColor: "#d1d1d1", color: "#666", cursor: "not-allowed" }}
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Número de Parcelas</label>
                                <div className={styles.selectWrapper}>
                                    <select value={parcelas} onChange={(e) => setParcelas(Number(e.target.value))}>
                                        {parcelasDisponiveis.map((p) => (
                                            <option key={p} value={p}>
                                                {p}x parcelas
                                            </option>
                                        ))}
                                    </select>
                                    <span className={styles.selectSeta}>▼</span>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Taxa de Juros (% a.m.)</label>
                                <input
                                    type="text"
                                    value={`${juros}%`}
                                    readOnly
                                    style={{ backgroundColor: "#d1d1d1", color: "#666", cursor: "not-allowed" }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Resultados (Cards e Seguro) */}
                    {carroSelecionado && (
                        <>
                            <div className={styles.gridResultados}>
                                {/* CARD 1 */}
                                <div className={`${styles.resultadoCard} ${styles.destaqueCard}`}>
                                    <div className={styles.cardHeaderInfo}>
                                        <div className={styles.iconeDestaque}><img src={sacoDinheiro} alt="" /></div>
                                        <h3>Sua Simulação</h3>
                                    </div>
                                    <p className={styles.valorPrincipal}>{formatarMoeda(valorParcela)}</p>
                                    <span className={styles.subtexto}>{parcelas}x com {juros}% a.m.</span>
                                </div>

                                {/* CARD 2 */}
                                <div className={styles.resultadoCard}>
                                    <div className={styles.cardHeaderInfo}>
                                        <div className={styles.iconeWrapperInvertido}><img src={graficoColuna} alt="" /></div>
                                        <h3>Se fossem 24x</h3>
                                    </div>
                                    <p className={styles.valorSecundario}>
                                        {formatarMoeda(calcularSimulacao(carroSelecionado.preco, 24).valor)}
                                    </p>
                                    <span className={styles.subtexto}>
                                        24x com {calcularSimulacao(carroSelecionado.preco, 24).juros}% a.m.
                                    </span>
                                </div>

                                {/* CARD 3 */}
                                <div className={styles.resultadoCard}>
                                    <div className={styles.cardHeaderInfo}>
                                        <div className={styles.iconeWrapper}><img src={graficoLinha} alt="" /></div>
                                        <h3>Se fossem 48x</h3>
                                    </div>
                                    <p className={styles.valorSecundario}>
                                        {formatarMoeda(calcularSimulacao(carroSelecionado.preco, 48).valor)}
                                    </p>
                                    <span className={styles.subtexto}>
                                        48x com {calcularSimulacao(carroSelecionado.preco, 48).juros}% a.m.
                                    </span>
                                </div>
                            </div>

                            <hr className={styles.divisorSeguro} />

                            {/* BANNER DE SEGURO */}
                            <div className={styles.seguroBanner}>
                                <div className={styles.seguroTextos}>
                                    <h3>Proteja seu {carroSelecionado.nome} hoje mesmo!</h3>
                                    <p>Oferecemos opções de seguro com cobertura completa. Adicione segurança à sua compra e dirija com tranquilidade.</p>
                                </div>
                                <button
                                    className={styles.seguroBtn}
                                    onClick={() => setMostrarSeguro(!mostrarSeguro)}
                                >
                                    {mostrarSeguro ? "Ocultar Detalhes" : "Ver Detalhes do Seguro"}
                                </button>
                            </div>

                            {/* INFORMAÇÕES DO SEGURO EXPANSÍVEIS */}
                            {mostrarSeguro && (
                                <div className={styles.infoSeguroCard}>
                                    <div className={styles.infoSeguroHeader}>
                                        <h4>Proposta de Seguro (Compreensiva)</h4>
                                        <span className={styles.seguroTag}>Recomendado</span>
                                    </div>
                                    <div className={styles.infoSeguroGrid}>
                                        <div className={styles.infoSeguroItem}>
                                            <span>Prêmio Anual Estimado</span>
                                            <strong>{formatarMoeda(valorSeguroAproximado)}</strong>
                                        </div>
                                        <div className={styles.infoSeguroItem}>
                                            <span>Valor da Franquia</span>
                                            <strong>{formatarMoeda(valorFranquia)}</strong>
                                        </div>
                                        <div className={styles.infoSeguroItem}>
                                            <span>Danos a Terceiros</span>
                                            <strong>R$ 100.000,00</strong>
                                        </div>
                                    </div>
                                    <ul className={styles.infoSeguroLista}>
                                        <li>✔️ Cobertura total contra <strong>Roubo, Furto, Colisão e Incêndio</strong>.</li>
                                        <li>✔️ Assistência 24 horas com guincho sem limite de quilometragem.</li>
                                        <li>✔️ Carro reserva disponível por até 15 dias em caso de sinistro.</li>
                                        <li>✔️ Reparo de vidros, faróis e lanternas com franquia reduzida.</li>
                                    </ul>
                                </div>
                            )}

                            {/* AVISO IMPORTANTE (Movido para fora da área escura) */}
                            <div className={styles.penalidadesImportante}>
                                <div className={styles.importanteIcone}><img src={Alerta} alt="" /> <strong>Aviso Importante:</strong></div>
                                <p>
                                    Os valores, taxas e condições apresentados nesta simulação (incluindo o seguro) possuem caráter meramente informativo e podem variar de acordo com a análise de crédito, perfil do motorista, CEP de pernoite e políticas da instituição financeira no momento da contratação. Para obter uma proposta personalizada e condições exatas, recomendamos entrar em contato com um de nossos especialistas.
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* SEÇÃO DE PENALIDADES (Mantida e isolada) */}
            {carroSelecionado && (
                <div className={styles.penalidadesBoxFull}>
                    <div className={styles.container}>
                        <div
                            className={styles.penalidadesHeader}
                            onClick={() => setPenalidadesExpandidas(!penalidadesExpandidas)}
                        >
                            <div className={styles.headerInfo}>
                                {/* <span className={styles.headerIcone}>  <img src={Perigo} alt="" />   </span> */}
                                <div className={styles.headerTextos}>
                                    <h4>Informações sobre Atrasos e Penalidades</h4>
                                    {/* Texto alterado para reforçar a interatividade */}
                                    <p>Clique em qualquer lugar desta caixa para ler as condições</p>
                                </div>
                            </div>
                            <span className={`${styles.setaExpandir} ${penalidadesExpandidas ? styles.setaAberta : ""}`}>
                                ▼
                            </span>
                        </div>

                        {penalidadesExpandidas && (
                            <div className={styles.penalidadesConteudo}>
                                <hr className={styles.linhaDivisoria} />

                                <div className={styles.penalidadesGrid}>
                                    <div className={styles.penalidadeItem}>
                                        <div className={styles.penalidadeTituloBox}>
                                            <div className={styles.penalidadeIcone}>%</div>
                                            <h5>Multa por Atraso</h5>
                                        </div>
                                        <p>
                                            Em caso de atraso no pagamento, será aplicada multa de <strong>2%</strong> sobre o valor da parcela (nesta simulação: {formatarMoeda(valorMulta)}), acrescida de juros moratórios de <strong>0,033% ao dia</strong>.
                                        </p>
                                    </div>

                                    <hr className={styles.divisoriaPenalidade} />

                                    <div className={styles.penalidadeItem}>
                                        <div className={styles.penalidadeTituloBox}>
                                            <div className={styles.penalidadeIcone}><img src={Relogio} alt="" /></div>
                                            <h5>Negativação</h5>
                                        </div>
                                        <p>
                                            Após <strong>30 dias</strong> de atraso, o nome do devedor poderá ser inscrito nos órgãos de proteção ao crédito (SPC e Serasa).
                                        </p>
                                    </div>

                                    <hr className={styles.divisoriaPenalidade} />

                                    <div className={styles.penalidadeItem}>
                                        <div className={styles.penalidadeTituloBox}>
                                            <div className={styles.penalidadeIcone}><img src={Perigo} alt="" /></div>
                                            <h5>Retomada do Veículo</h5>
                                        </div>
                                        <p>
                                            O não pagamento de <strong>3 parcelas consecutivas</strong> pode resultar na busca e apreensão do veículo, conforme contrato de alienação fiduciária.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <Rodape />
        </div>
    );
}

export default App;