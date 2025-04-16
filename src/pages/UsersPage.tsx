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
  createUsers,
  getAllUsers,
  updateUsers,
  deleteUsers,
} from "../services/userService";

interface UserFormData {
  username: string;
  email: string;
  phone: string;
}

interface UserWithId extends UserFormData {
  id: number;
}

const schema = yup.object({
  username: yup.string().required("O nome é obrigatório"),
  email: yup.string().email("Email inválido").required("O email é obrigatório"),
  phone: yup.string().required("O telefone é obrigatório"),
});

const UsersPage = () => {
  const [userList, setUserList] = useState<UserWithId[]>([]);
  const [editingUser, setEditingUser] = useState<UserWithId | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: yupResolver(schema),
  });

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUserList(response.data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    try {
      if (editingUser) {
        await updateUsers(editingUser.id, data);
        alert("Usuário atualizado com sucesso!");
        setEditingUser(null);
      } else {
        await createUsers(data);
        alert("Usuário criado com sucesso!");
      }

      reset();
      await fetchUsers();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      alert("Erro ao salvar usuário.");
    }
  };

  const handleEdit = (user: UserWithId) => {
    setEditingUser(user);
    reset({
      username: user.username,
      email: user.email,
      phone: user.phone,
    });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        await deleteUsers(id);
        alert("Usuário deletado com sucesso!");
        await fetchUsers();
      } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        alert("Erro ao deletar usuário.");
      }
    }
  };

  return (
    <Container>
      <div>
        <h1>Lista de Usuários</h1>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="outlined" color="primary" onClick={() => navigate("/")}>
            Produtos
          </Button>
        </Box>
        <Paper sx={{ p: 2, mt: 4, mb: 4 }} elevation={3}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>ID</TableCell>
                  <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Nome</TableCell>
                  <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Telefone</TableCell>
                  <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map((user) => (
                  <TableRow key={user.id} hover sx={{ cursor: "pointer" }}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEdit(user)} color="primary">Editar</Button>
                      <Button onClick={() => handleDelete(user.id)} color="error">Excluir</Button>
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
              label="Nome de usuário"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.username}
              helperText={errors.username?.message}
              InputLabelProps={{ shrink: true }}
              {...register("username")}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              InputLabelProps={{ shrink: true }}
              {...register("email")}
            />
            <TextField
              label="Telefone"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.phone}
              helperText={errors.phone?.message}
              InputLabelProps={{ shrink: true }}
              {...register("phone")}
            />
            <Box display="flex" justifyContent="flex-start" gap={2} mt={2}>
              <Button type="submit" variant="contained" color="primary">
                {editingUser ? "Atualizar" : "Salvar"}
              </Button>
              {editingUser && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setEditingUser(null);
                    reset({ username: "", email: "", phone: "" });
                  }}
                >
                  Cancelar edição
                </Button>
              )}
            </Box>
          </form>
        </Paper>
      </div>
    </Container>
  );
};

export default UsersPage;
