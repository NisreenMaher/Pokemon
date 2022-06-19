var pokemonServices = require("../Models/pokemonServices");
const searchpokemonsController = (req, res, next) => {
    let name = req.query.search; // change params to query

    let pokemons = pokemonServices.searchpokeomname(name);

    res.json(pokemons);
};
module.exports = searchpokemonsController;