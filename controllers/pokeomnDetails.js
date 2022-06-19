var pokemonServices = require("../Models/pokemonServices");
var getPokemonMoves = require("../Models/getPokemonMoves");
var pokemonDetails = {};
const getPokemonDetails = function(req, res, next) {
    let id = req.params.id;
    // console.log(pokemonServic9es.getPokemonById(id));

    pokemonDetails = pokemonServices.getPokemonById(id);

    pokemonDetails.moves = getPokemonMoves(id);
    res.json(pokemonDetails);
};

module.exports = getPokemonDetails;