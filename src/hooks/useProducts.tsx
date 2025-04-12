import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";

export const useProducts = () => {
    const [products, setproducts] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts();
                setproducts(response.data);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            } finally {
                setloading(false)
            }
        };
        fetchProducts();
    }, []);
    return { products, loading };
}