var caputerdpokemonServices = require("../Models/caputerdPokemonService");
var caputerdPokemonArray = [];
const caputerdpokemonController = (req, res, next) => {
    let id = req.params.id; // change params to query
    let caputerdStatus = req.query.caputerdStatus;
    let status = caputerdpokemonServices.caputerdCkeck(id, caputerdStatus);
    //console.log(status);
    res.json(status);
};

module.exports = caputerdpokemonController;