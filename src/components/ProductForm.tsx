import { Button, Paper, TextField } from "@mui/material";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface ProductFormData {
  title: string;
  price: number;
  category: string;
}

interface ProductFormProps {
  onSubmit: SubmitHandler<ProductFormData>;
  editingProduct: ProductFormData | null;
  onCancelEdit: () => void;
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

const ProductForm = ({ onSubmit, editingProduct, onCancelEdit }: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      price: 0,
      category: "",
    },
  });

  useEffect(() => {
    if (editingProduct) {
      reset(editingProduct);
    } else {
      reset({
        title: "",
        price: 0,
        category: "",
      });
    }
  }, [editingProduct, reset]);

  return (
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
            onClick={onCancelEdit}
            sx={{ mt: 2, ml: 2 }}
          >
            Cancelar edição
          </Button>
        )}
      </form>
    </Paper>
  );
};

export default ProductForm;
