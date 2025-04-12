import { useUsers } from "../hooks/useUsers";

const UsersPage = () =>{
    const {users,loading} = useUsers();

    if (loading){
        return <p>Carregando produtos...</p>
    }
    return(
        <div>
            <h1>Lista de Usuarios</h1>
            <p>Tabela com usucarios aqui</p>
        </div>
    );

};

export default UsersPage;