import { fileURLToPath } from "url";
import { dirname } from "path";
import e from "express";
import pokemonRoutes from "../routes/pokemon.js";

const app = e();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);

app.set("view engine", "ejs");
app.use("/", pokemonRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
