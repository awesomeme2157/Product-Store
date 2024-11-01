import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),

    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "All fields are required" };
        }

        if (isNaN(newProduct.price) || Number(newProduct.price) <= 0) {
            return { success: false, message: "Please enter a valid price" };
        }

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });

            if (!res.ok) {
                throw new Error("Failed to create product");
            }

            const data = await res.json();
            set((state) => ({ products: [...state.products, data.data] }));

            return { success: true, message: "Product created successfully" };
        } catch (error) {
            return { success: false, message: error.message || "An error occurred" };
        }
    },

    fetchProducts: async () => {
        try {
            const res = await fetch("/api/products");
            if (!res.ok) throw new Error("Failed to fetch products");

            const data = await res.json();
            set({ products: data.data });
        } catch (error) {
            console.error("Fetch products error:", error);
        }
    },

    deleteProduct: async (pid) => {
        try {
            const res = await fetch(`/api/products/${pid}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to delete product");
            }

            set((state) => ({
                products: state.products.filter((product) => product._id !== pid),
            }));

            return { success: true, message: "Product deleted successfully" };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    updateProduct: async (pid, updatedProduct) => {
        try {
            const res = await fetch(`/api/products/${pid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to update product");
            }

            const data = await res.json();
            set((state) => ({
                products: state.products.map((product) =>
                    product._id === pid ? data.data : product
                ),
            }));

            return { success: true, message: "Product updated successfully" };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },
}));
