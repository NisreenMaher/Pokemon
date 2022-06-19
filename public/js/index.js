var randomPokemonsData = [];
var caputerdpokemons = [];
const colours = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
};
const url = "https://stark-oasis-92893.herokuapp.com/";
window.onload = (event) => {
    localStorage.setItem("Grid", "main");
    getCaputerdPokemons();
    getRadnomPokemons();
    //  console.log("You have connected...");
};

async function getCaputerdPokemons() {
    caputerdpokemons = await fetch(url + "displayAllCaputerd").then((response) =>
        response.json()
    );
    // console.log(caputerdpokemons);
}

async function getRadnomPokemons() {
    let allPokemonContainer = document.getElementById("poke-container");
    let pokeContainer = document.createElement("div");
    pokeContainer.innerHTML = `<h4 class="center grey-text">loading...</h4>`;
    allPokemonContainer.appendChild(pokeContainer);
    randomPokemonsData = await fetch(url + "getpokemonlist").then((response) =>
        response.json()
    );
    renderPokemons(randomPokemonsData);
}
const renderPokemons = (pokesData) => {
    let allPokemonContainer = document.getElementById("poke-container");
    allPokemonContainer.innerHTML = "";
    //console.log(pokesData);
    for (let i = 0; i < pokesData.length; i++) renderPokemon(pokesData[i]);
};

function renderPokemon(pokeData) {
    let allPokemonContainer = document.getElementById("poke-container");
    let pokeContainer = document.createElement("div");
    pokeContainer.classList.add(
        "icon-block",
        "center",
        "col",
        "s12",
        "m6",
        "xl3"
    );
    checkedString = getvaluechecked(pokeData.id) ? "checked" : "";
    pokeContainer.innerHTML = `
  <div class="white pokemonBox">
    <span class="grey-text">${pokeData.id}</span>
    <div class="image">
      <img width="120" height="120"srcset="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${
        pokeData.id
      }.svg" style="padding-top: 1rem;">
     </div>
    <h6>${capitalizeFirstLetter(pokeData.name.english)}</h6>
    <ul class="ul_types grey-text">
      ${pokeData.type
        .map(
          (poke) => `
      <li>${capitalizeFirstLetter(poke)}</li>`
        )
        .join(", ")}
    </ul> 
    <br/>
    <div class="switch">
      <label class="black-text label-text">
          <input type="checkbox" id=${pokeData.id} ${checkedString}
           onclick="checkedValueClick(event)">
          <span class="lever"></span>
          Captured
      </label>
    </div>
    <br/><br/>
  </div>`;

  pokeContainer.addEventListener("click", (e) => {
    let targetParent = e.target.parentElement;
    if (
      targetParent.classList.contains("switch") ||
      targetParent.parentElement.classList.contains("switch")
    ) {
      return;
    }
    const xhr = new XMLHttpRequest();
    let res;
    xhr.open("GET", url + "pokemonDetails/" + pokeData.id, true);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        //  console.log("b" + xhr.responseText);
        res = JSON.parse(xhr.responseText);
        popupDetails(res);
      }
    };
  });
  allPokemonContainer.appendChild(pokeContainer);
}
function searchpokemonbutton() {
  try {
    searchpokemon();
  } catch (e) {
    console.error(e);
  }
}
const searchpokemon = async (_) => {
  let name = document.getElementById("search").value.toLowerCase();
  const xhr = new XMLHttpRequest();
  let res;
  xhr.open("GET", url + "pokemons?search=" + name, true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      //  console.log("b" + xhr.responseText);
      res = JSON.parse(xhr.responseText);
      renderPokemons(res);
    }
  };
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function checkedValueClick(event) {
  var grid = localStorage.getItem("Grid");
  // console.log(event);
  let id = event.target.id;
  let check = event.target.checked;
  const xhr = new XMLHttpRequest();
  let res;
  xhr.open(
    "PUT",
    url + "caputerdpokemon/" + id + "?caputerdStatus=" + check,
    true
  );
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (grid == "cap") diaplayCapPokemon();
    }
  };
  getCaputerdPokemons();
  event.stopPropagation();
}

function getvaluechecked(id) {
  return caputerdpokemons.includes(id + "");
}
function diaplayCapPokemonBtn() {
  try {
    diaplayCapPokemon();
  } catch (e) {
    console.error(e);
  }
}
const diaplayCapPokemon = async (_) => {
  const xhr = new XMLHttpRequest();
  let res;
  xhr.open("GET", url + "displayAllCaputerdpokemosData", true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      //  console.log("b" + xhr.responseText);
      res = JSON.parse(xhr.responseText);
      renderPokemons(res);
    }
  };
  localStorage.setItem("Grid", "cap");
};

function popupDetails(pokemondata) {
  var modal = document.getElementById("modal1");
  var modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `  
  <div class="row " style="margin-bottom:0">
    <div class="col s1"> 
      <i onclick="closeModal()" class="material-icons grey-text">close'
      </i> 
    </div>
    </div>
  <div class="center">
    <div class="">
      <img width="90" height="90" 
      srcset="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${
        pokemondata.id
      }.svg">
      <h3>${capitalizeFirstLetter(pokemondata.name.english)}</h3>
    </div>
  </div>
  <div class="divider">
  </div>
  <br />
  <div class="center">
    <h4>Type(s) </h4>
    <br />
    <ul class="ul_types ">
    ${pokemondata.type
      .map(
        (poke) => `
      <li style="border:solid;border-color:${
        colours[poke.toLowerCase()]
      };border-radius:6px;padding: .7rem .7rem;font-size:1.3rem;margin-left:.2rem;
      color:${colours[poke.toLowerCase()]}">${poke}</li>`
      )
      .join(" ")}
    </ul>
  </div>
  <div class="divider">
  </div>
  <br />
  <div class="">
    <h4> Stats </h4>
    ${renderbaseState("HP", pokemondata.base.HP)}  ${renderbaseState(
    "Attack",
    pokemondata.base.Attack
  )}  ${renderbaseState(
    "Defense",
    pokemondata.base.Defense
  )}  ${renderbaseState(
    "Sp. Attack",
    pokemondata.base["Sp. Attack"]
  )}  ${renderbaseState("Sp. Defense", pokemondata.base["Sp. Defense"])}
${renderbaseState("Speed", pokemondata.base["Speed"])}

    </div>
    <div class="divider"></div>
    <br />
    <div class="">
      <h4> Moves </h4>
      <ul class="ul_moves">
        ${pokemondata.moves
          .map(
            (poke) => `
          <li style="list-style: disc;font-size:1.2rem; text-align:left ;margin-left:2.2rem">
          ${poke}
          </li>`
          )
          .join("")}
      </ul>
    </div>
  </div>
  `;
  const instance = M.Modal.init(modal, { dismissible: false });
  instance.open();
  //modal.style.display = "block";
}
function renderbaseState(baseType, baseValue) {
  return `
  <div class="row">
    <div class="col s2 ">
      <h5>${baseType + ": "}</h5>
    </div>
    <div class="col  s10">
      <div class="progress grey lighten-3 tooltipped" data-position="top" 
      data-tooltip="Progress was at 50% when tested">
        <div class="determinate blue darken-2 white-text center" style="width: ${baseValue}%; 
        animation: grow 2s;">${baseValue}%
        </div>
      </div>
    </div>
  </div>`;
}
function closeModal() {
  var modal = document.getElementById("modal1");
  var modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `  `;
  const instance = M.Modal.init(modal, { dismissible: false });
  instance.close();
}
window.onclick = function (event) {
  if (event.target.classList[0] == "modal-overlay") {
    closeModal();
  }
};