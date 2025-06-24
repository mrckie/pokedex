import e from "express";
import axios from "axios";
import env from "dotenv";

env.config();

const router = e.Router();
const API_POKEMON_URL = process.env.API_POKEMON_URL;
const API_BASE_URL = process.env.API_BASE_URL;

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon?limit=100000000000000`);
    res.render("pages/home", { pokemonList: response.data.results });
  } catch (e) {
    res.status(500).send("Error fetching Pokémon data");
  }
});

router.get("/pokemon/:id", async (req, res) => {
  try {
    const { id } = req.params;
    /**
     * error checking
     */
    if (!id) {
      return res.status(400).send("Pokémon ID is required");
    }
    const response = await axios.get(`${API_BASE_URL}/pokemon/${id}`);
    res.render("pages/details", { pokemon: response.data });
  } catch (e) {
    console.log(e);
    res.status(500).send("Error fetching Pokémon details");
  }
});


router.get("/search", async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) return res.redirect("/");

        const response = await axios.get(`${API_BASE_URL}/pokemon/${name}`);
        res.render("pages/details", { pokemon: response.data });
    } catch (e) {
        console.log(e);
        res.status(500).send("Error fetching Pokémon details");
    }
})

export default router;
