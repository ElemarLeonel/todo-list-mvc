import express from "express";
import bodyParser from "body-parser";
import todoRoutes from "./routes/todoRoutes";
import mongoose from "mongoose";
import path from "path";

const app = express();
const PORT = 3000;
const MONGO_URL: string = process.env.MONGO_URL || "SUA_URL";

mongoose
  .connect(MONGO_URL, {
    dbName: "todo-list-mvc",
  })
  .then(() => {
    console.log("Conectado ao banco de dados 🚀");
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar com o banco de dados", err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
