import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Container,
  Box,
} from "@mui/material";
import Table from "@mui/material/Table";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../services/productService";

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
  const [editingProduct, setEditingProduct] = useState<ProductWithId | null>(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
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
      if (editingProduct) {
        await updateProduct(editingProduct.id, data);
        alert("Produto atualizado com sucesso!");
        setEditingProduct(null);
      } else {
        await createProduct(data);
        alert("Produto criado com sucesso!");
      }

      reset();
      await fetchProducts();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar produto.");
    }
  };

  const handleEdit = (product: ProductWithId) => {
    setEditingProduct(product);
    reset({
      title: product.title,
      price: product.price,
      category: product.category,
    });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await deleteProduct(id);
        alert("Produto deletado com sucesso!");
        await fetchProducts();
      } catch (error) {
        console.error("Erro ao deletar produto:", error);
        alert("Erro ao deletar produto.");
      }
    }
  };

  return (
    <Container>
      <div>
        <h1>Lista de Produtos</h1>
        <Box display="flex" justifyContent="flex-end">
            <Button  variant="outlined" color="primary"  onClick={() => navigate("/usuarios")}>
              Usuarios
            </Button>
            </Box>
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
                {productList.map((product) => (
                  <TableRow key={product.id} hover sx={{ cursor: "pointer" }}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell align="left">{product.title}</TableCell>
                    <TableCell align="right">{product.price}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEdit(product)} color="primary">Editar</Button>
                      <Button onClick={() => handleDelete(product.id)} color="error">Excluir</Button>
                    </TableCell>
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
              InputLabelProps={{ shrink: true }}
              {...register("title")}
            />
            <TextField
              label="Valor do produto"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.price}
              helperText={errors.price?.message}
              InputLabelProps={{ shrink: true }}
              {...register("price")}
            />
            <TextField
              label="Categoria do produto"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.category}
              helperText={errors.category?.message}
              InputLabelProps={{ shrink: true }}
              {...register("category")}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              {editingProduct ? "Atualizar" : "Salvar"}
            </Button>
           
            {editingProduct && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setEditingProduct(null);
                  reset({ 
                    title: "",
                    price: 0,
                    category: "",});
                }}
                sx={{ mt: 2, ml: 2 }}
              >
                Cancelar edição
              </Button>
            )}
          </form>
        </Paper>
      </div>
    </Container>
  );
};

export default ProductsPage;
