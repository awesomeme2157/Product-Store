import express from 'express';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';

const router = express.Router();

// GET all products
router.get("/", getAllProducts);

// POST a new product
router.post("/", createProduct);

// PUT (update) a product by ID
router.put("/:id", updateProduct);

// DELETE a product by ID
router.delete("/:id", deleteProduct);

export default router;
