var express = require("express");
var router = express.Router();
var searchpokemonsController = require("../controllers/searchpokemonsController");
var getRandomPokemons = require("../controllers/pokemonController");
var caputerdpokemonController = require("../controllers/caputerdPokemonController");
var getPokemonDetails = require("../controllers/pokeomnDetails");
var getCaputerdpokemonController = require("../controllers/getCaputerdPokemons");

router.get("/", function(req, res, next) {
    res.render("index");
});
router.get(
    "/displayAllCaputerdpokemosData",
    getCaputerdpokemonController.getCaputerdpokemonDataController
);
router.get("/getpokemonlist", getRandomPokemons);
router.get("/pokemons", searchpokemonsController);
router.put("/caputerdpokemon/:id", caputerdpokemonController);
router.get(
    "/displayAllCaputerd",
    getCaputerdpokemonController.getCaputerdpokemonController
);
router.get("/pokemonDetails/:id", getPokemonDetails);

module.exports = router;