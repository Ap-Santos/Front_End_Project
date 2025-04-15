import api from "./api";

export const createProduct = (data) =>{
    return api.post('/products',data);
};

export const getAllProducts = () =>{
    return api.get('/products');
};
export const getElementById = (id) =>{
    return api.get(`/products/${id}`);
  };

export const updateProduct = (id,data) =>{
    return api.put(`/products/${id}`, data);
};

export const deleteProduct = (id) =>{
    return api.delete(`/products/${id}`);
};

