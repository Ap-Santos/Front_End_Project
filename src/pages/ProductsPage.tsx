import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Container, Box } from "@mui/material";

import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../services/productService";

import ProductTable from "../components/ProductTable";
import ProductForm, { ProductFormData } from "../components/ProductForm";

interface ProductWithId extends ProductFormData {
  id: number;
}

const ProductsPage = () => {
  const [productList, setProductList] = useState<ProductWithId[]>([]);
  const [editingProduct, setEditingProduct] = useState<ProductWithId | null>(null);

  const navigate = useNavigate();

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

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, data);
        alert("Produto atualizado com sucesso!");
        setEditingProduct(null);
      } else {
        await createProduct(data);
        alert("Produto criado com sucesso!");
      }

      await fetchProducts();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar produto.");
    }
  };

  const handleEdit = (product: ProductWithId) => {
    setEditingProduct(product);
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
      <h1>Lista de Produtos</h1>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="outlined" color="primary" onClick={() => navigate("/usuarios")}>
          Usuários
        </Button>
      </Box>

      <ProductTable
        products={productList}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ProductForm
        onSubmit={onSubmit}
        editingProduct={editingProduct}
        onCancelEdit={() => setEditingProduct(null)}
      />

    </Container>
  );
};

export default ProductsPage;
