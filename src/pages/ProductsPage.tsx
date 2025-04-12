import { TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useProducts } from "../hooks/useProducts";
import Table from '@mui/material/Table';
import React from "react";
const ProductsPage = () => {
    const { products, loading } = useProducts();

    if (loading) {
        return <p>Carregando produtos...</p>
    }
    return (
        <div>
            <h1>Lista de Produtos</h1>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Preço</TableCell>
                            <TableCell>Categoria</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    { products.map((product)=> (
                        <TableRow key ={product.id}>
                            <TableCell>{product.title}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.category}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                   
                </Table>
            </TableContainer>
        </div>
    );
};

export default ProductsPage;