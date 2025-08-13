const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { db } = require("./config/firebase"); 
const todoRoutes = require("../src/routes/todoRoutes")

const app = express();
app.use(cors());
app.use(express.json());

app.use("/todoApi", todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});