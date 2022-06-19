var pokemonServices = require("../Models/pokemonServices");

const getRandomPokemons = function(req, res) {
    //  console.log();
    res.json(pokemonServices.getRandomPokemons());
};
module.exports = getRandomPokemons;