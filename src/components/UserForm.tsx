import { Button, TextField, Box, Paper } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";

export interface UserFormData {
  username: string;
  email: string;
  phone: string;
}

interface UserFormProps {
  onSubmit: SubmitHandler<UserFormData>;
  initialData?: UserFormData | null;
  onCancelEdit?: () => void;
}

const schema = yup.object({
  username: yup.string().required("O nome é obrigatório"),
  email: yup.string().email("Email inválido").required("O email é obrigatório"),
  phone: yup.string().required("O telefone é obrigatório"),
});

const UserForm = ({ onSubmit, initialData, onCancelEdit }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      username: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    reset(initialData || {
      username: "",
      email: "",
      phone: "",
    });
  }, [initialData, reset]);

  return (
    <Paper sx={{ p: 3, mt: 4 }} elevation={3}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Nome de usuário"
          fullWidth
          margin="normal"
          error={!!errors.username}
          helperText={errors.username?.message}
          InputLabelProps={{ shrink: true }}
          {...register("username")}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
          InputLabelProps={{ shrink: true }}
          {...register("email")}
        />
        <TextField
          label="Telefone"
          fullWidth
          margin="normal"
          error={!!errors.phone}
          helperText={errors.phone?.message}
          InputLabelProps={{ shrink: true }}
          {...register("phone")}
        />
        <Box display="flex" gap={2} mt={2}>
          <Button type="submit" variant="contained" color="primary">
            {initialData ? "Atualizar" : "Salvar"}
          </Button>
          {initialData && onCancelEdit && (
            <Button variant="outlined" color="secondary" onClick={onCancelEdit}>
              Cancelar edição
            </Button>
          )}
        </Box>
      </form>
    </Paper>
  );
};

export default UserForm;
