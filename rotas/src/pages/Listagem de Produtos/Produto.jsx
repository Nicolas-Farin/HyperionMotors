import { useParams } from "react-router-dom";
import produtos from "../../data/produtos.json";
import ProdutoDetalhe from "../../components/ProdutoDetalhe";

export default function Produto() {
  const { id } = useParams();

  const produto = produtos.find(p => p.id === Number(id));

  return <ProdutoDetalhe produto={produto} />;
}