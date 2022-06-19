var caputerdpokemonServices = require("../Models/caputerdPokemonService");
var caputerdPokemonArray = [];
const getCaputerdpokemonController = (req, res, next) => {
    caputerdPokemonArray = caputerdpokemonServices.getCaputerdpokemon();

    res.json(caputerdPokemonArray);
};
const getCaputerdpokemonDataController = (req, res, next) => {
    caputerdPokemonArray = caputerdpokemonServices.getCaputerdpokemonData();
    res.json(caputerdPokemonArray);
};
module.exports = {
    getCaputerdpokemonController,
    getCaputerdpokemonDataController,
};