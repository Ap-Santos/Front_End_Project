import api from "./api";

export const createUsers = (data) =>{
    return api.post('/users',data);
};

export const getAllUsers = () =>{
    return api.get('/users');
};
export const getUserById = () =>{
    return api.get(`/users/${id}`);
  };

export const updateUsers = (id,data) =>{
    return api.put(`/users/${id}`, data);
};

export const deleteUsers = (id) =>{
    return api.delete(`/users/${id}`);
}
