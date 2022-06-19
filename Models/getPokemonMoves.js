var fs = require("fs");
var allPokemonsMoves = [];
var path = require("path");

fs.readFile(path.join(__dirname, "..", "pokemonsMoves.json"), (err, data) => {
    if (err) throw err;
    allPokemonsMoves = JSON.parse(data);
});
const getPokemonMoves = function(id) {
    return allPokemonsMoves.filter((e) => e.id == id)[0].moves;
};
module.exports = getPokemonMoves;