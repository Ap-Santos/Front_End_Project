import { useEffect, useState } from "react";
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Container } from "@mui/material";
import Table from '@mui/material/Table';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { createProduct, getAllProducts } from "../services/productService";

interface ProductFormData {
  title: string;
  price: number;
  category: string;
}

interface ProductWithId extends ProductFormData {
  id: number;
}

const schema = yup.object({
  title: yup.string().required("O nome é obrigatório"),
  price: yup
    .number()
    .typeError("Digite um número válido")
    .required("O preço é obrigatório")
    .positive("O preço deve ser maior que zero"),
  category: yup.string().required("A categoria é obrigatória"),
});

const ProductsPage = () => {
  const [productList, setProductList] = useState<ProductWithId[]>([]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductFormData>({
    resolver: yupResolver(schema),
  });

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProductList(response.data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    try {
      await createProduct(data);
      alert("Produto criado com sucesso!");
      reset(); // limpa o formulário
      fetchProducts(); // recarrega a list
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      alert("Erro ao criar produto.");
    }
  };

  return (
    <Container>
      <div>
        <h1>Lista de Produtos</h1>
        <Paper sx={{ p: 2, mt: 4, mb: 4 }} elevation={3}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Nome</TableCell>
                  <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Preço</TableCell>
                  <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Categoria</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productList.map((product) => (
                  <TableRow key={product.id} hover sx={{ cursor: "pointer" }}>
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
        <Paper sx={{ p: 3, mt: 4 }} elevation={3}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Nome do produto"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.title}
              helperText={errors.title?.message}
              {...register("title")}
            />
            <TextField
              label="Valor do produto"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.price}
              helperText={errors.price?.message}
              {...register("price")}
            />
            <TextField
              label="Categoria do produto"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.category}
              helperText={errors.category?.message}
              {...register("category")}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Salvar
            </Button>
          </form>
        </Paper>
      </div>
    </Container>
  );
};

export default ProductsPage;
