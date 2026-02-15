import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.get("/health", (req, res) => {
    res.status(200).json({ status : "OK" });
})

app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
});