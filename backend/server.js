import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

const __dirname = path.resolve();

// app.get("/", (req, res) => {
//     return res.end("Home Page");
// })

// Use the product routes
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
}

app.get("*", (req, res) => {
    return res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
})

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
