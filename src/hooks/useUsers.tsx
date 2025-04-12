import { useEffect, useState } from "react";
import { getAllUsers } from "../services/userService";

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers();
                setUsers(response.data);
            } catch (error) {
                console.error("Erro ao buscar usuario:", error);
            } finally {
                setLoading(false)
            }
        };
        fetchUsers();
    }, []);
    return { users, loading };
}