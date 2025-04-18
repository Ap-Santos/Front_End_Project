import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
}

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductTable = ({ products, onEdit, onDelete }: Props) => {
  return (
    <Paper sx={{ p: 2, mt: 4, mb: 4 }} elevation={3}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Nome</TableCell>
              <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Preço</TableCell>
              <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Categoria</TableCell>
              <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} hover>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Button onClick={() => onEdit(product)} color="primary">Editar</Button>
                  <Button onClick={() => onDelete(product.id)} color="error">Excluir</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ProductTable;