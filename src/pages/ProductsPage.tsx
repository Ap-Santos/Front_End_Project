import { useProducts } from "../hooks/useProducts";

const ProducstPage = () =>{
    const {products,loading} = useProducts();

    if (loading){
        return <p>Carregando produtos...</p>
    }
    return(
        <div>
            <h1>Lista de Produtos</h1>
            <p>Tabela de produtos aqui</p>
        </div>
    );

};

export default ProducstPage;