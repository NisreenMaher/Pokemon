var fs = require("fs");
var CaputerdPokemons = [];
var pokemonServices = require("./pokemonServices");
var path = require("path");

fs.readFile(path.join(__dirname, "..", "caputerdpokemon.json"), (err, data) => {
    if (data.length == 0) return;
    if (err) throw err;
    CaputerdPokemons = JSON.parse(data);
});
const caputerdCkeck = function(id, caputerdStatus) {
    let status;
    //  console.log(caputerdStatus);
    if (caputerdStatus == "false") {
        status = unCaputerdpokemon(id);
    } else if (caputerdStatus == "true") {
        status = caputerdpokemon(id);
    } else {
        return "Not valid status";
    }
    return status;
};

const caputerdpokemon = function(id) {
    if (CaputerdPokemons.findIndex((e) => e == id) != -1) {
        return "The pokemon already caputured";
    }
    CaputerdPokemons.push(id);
    fs.writeFile(
        path.join(__dirname, "..", "caputerdpokemon.json"),
        JSON.stringify(CaputerdPokemons),
        (err) => {}
    );
    return "Caputerd Sucessfuly";
    //   console.log("jjjjjjjjjjj");
};

const unCaputerdpokemon = function(id) {
    if (CaputerdPokemons.findIndex((e) => e == id) == -1) {
        return "The pokemon already Uncaputured";
    }
    CaputerdPokemons.splice(
        CaputerdPokemons.findIndex((e) => e == id),
        1
    );

    fs.writeFile(
        path.join(__dirname, "..", "caputerdpokemon.json"),
        JSON.stringify(CaputerdPokemons),
        (err) => {}
    );
    return "Uncaputerd sucessfuly";
};
const getCaputerdpokemon = function() {
    return CaputerdPokemons;
};
const getCaputerdpokemonData = function() {
    let CaputerdPokemonsData = [];
    // console.log(getPokemonById(2));
    for (let i = 0; i < CaputerdPokemons.length; i++) {
        CaputerdPokemonsData.push(
            pokemonServices.getPokemonById(CaputerdPokemons[i])
        );
    }
    return CaputerdPokemonsData;
};
module.exports = { caputerdCkeck, getCaputerdpokemon, getCaputerdpokemonData };