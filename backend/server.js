import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    return res.send("Home Page");
});

// Use the product routes
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
