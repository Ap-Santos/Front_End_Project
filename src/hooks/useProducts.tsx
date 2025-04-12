import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";

type Product = {
    id: number;
    title: string;
    price: number;
    category: string;
  };
export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts();
                console.log("Dados recebidos:", response.data);
                setProducts(response.data);
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