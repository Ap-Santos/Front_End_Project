import { useEffect, useState } from "react";
import { Container, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  getAllUsers,
  createUsers,
  updateUsers,
  deleteUsers,
} from "../services/userService";
import UserTable from "../components/UserTable";
import UserForm, { UserFormData } from "../components/UserForm";

interface UserWithId extends UserFormData {
  id: number;
}

const UsersPage = () => {
  const [userList, setUserList] = useState<UserWithId[]>([]);
  const [editingUser, setEditingUser] = useState<UserWithId | null>(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const response = await getAllUsers();
    setUserList(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (data: UserFormData) => {
    try {
      if (editingUser) {
        await updateUsers(editingUser.id, data);
        alert("Usuário atualizado com sucesso!");
        setEditingUser(null);
      } else {
        await createUsers(data);
        alert("Usuário criado com sucesso!");
      }
      fetchUsers();
    } catch (error) {
      alert("Erro ao salvar usuário.");
      console.error(error);
    }
  };

  const handleEdit = (user: UserWithId) => {
    setEditingUser(user);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Deseja excluir este usuário?")) {
      await deleteUsers(id);
      alert("Usuário excluído!");
      fetchUsers();
    }
  };

  return (
    <Container>
      <h1>Lista de Usuários</h1>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="outlined" onClick={() => navigate("/")}>Produtos</Button>
      </Box>

      <UserTable users={userList} 
      onEdit={handleEdit} 
      onDelete={handleDelete} />
      <UserForm
        onSubmit={handleSubmit}
        initialData={editingUser}
        onCancelEdit={() => setEditingUser(null)}
      />
      
    </Container>
  );
};

export default UsersPage;
