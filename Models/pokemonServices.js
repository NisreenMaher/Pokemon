var fs = require("fs");
var allPokemons = [];
var path = require("path");

fs.readFile(path.join(__dirname, "..", "pokemon.json"), (err, data) => {
    if (err) throw err;
    allPokemons = JSON.parse(data);
});
const getAllPokemons = function() {
    return allPokemons;
};

const getRandomPokemons = function() {
    var allPokemonsCooy = [...allPokemons];
    var randomPokemons = [];

    for (let i = 0; i < 8; i++) {
        let randomIndex = Math.floor(Math.random() * allPokemonsCooy.length);

        randomPokemons.push(allPokemonsCooy[randomIndex]);
        //   console.log(allPokemons[randomIndex]);
        allPokemonsCooy.splice(randomIndex, 1);
    }

    randomPokemons = randomPokemons.sort((a, b) => a.id - b.id);
    return randomPokemons;
};
const searchpokeomname = function(name) {
    console.log(name);
    name = name.toLowerCase();
    return allPokemons.filter((pokemon) =>
        pokemon.name.english.toLowerCase().startsWith(name)
    );
};
const getPokemonById = function(id) {
    console.log(allPokemons.find((e) => e.id == id));
    return allPokemons.find((e) => e.id == id);
};
module.exports = {
    getRandomPokemons,
    searchpokeomname,
    getAllPokemons,
    getPokemonById,
};