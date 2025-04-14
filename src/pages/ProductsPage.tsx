import { TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useProducts } from "../hooks/useProducts";
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { Container } from "@mui/material";
const ProductsPage = () => {
    const { products, loading } = useProducts();

    if (loading) {
        return <p>Carregando produtos...</p>
    }
    return (
        <Container>
            <div>
                <h1>Lista de Produtos</h1>
                <Paper sx={{ p: 2, mt: 4, mb: 4 }} elevation={3}>
                    <TableContainer sx={{ maxHeight: 600 }}>
                        <Table stickyHeader>
                            <TableHead >
                                <TableRow>
                                <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>ID</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Nome</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Preço</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Categoria</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product.id}
                                        hover
                                        sx={{ cursor: "pointer" }}>
                                            <TableCell>{product.id}</TableCell>
                                        <TableCell align="left">{product.title}</TableCell>
                                        <TableCell align="right">{product.price}</TableCell>
                                        <TableCell>{product.category}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>

            <div>
                <h1>Formulario</h1>
            </div>
        </Container>

    );
};
export default ProductsPage;