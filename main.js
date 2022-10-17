const pokemonContainer = document.querySelector(".pokemon-container");
const spinner = document.querySelector("#spinner"); // tarerlo por ID
const previous = document.querySelector("#previous");// traer los botones por ID
const next = document.querySelector("#next");//  traer los botones por ID

let limit = 14;
let idPokemon = 1;

previous.addEventListener("click", () => {
  if (idPokemon != 1) { // que no sea igual a 1 porque si estamos en la pagina 1 ya no podemos regresar mas
    idPokemon -= 15;
    removeChildNodes(pokemonContainer); // Llamamos la funcion para remover los pokemones de la pagina
    fetchPokemons(idPokemon, limit);
  }
});

next.addEventListener("click", () => {
  idPokemon += 15;
  removeChildNodes(pokemonContainer);
  fetchPokemons(idPokemon, limit);
});

function fetchPokemon(id) { // traer el pokemon por medio de la API
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)  // URL API
    .then((res) => res.json())  //Respuesta con el .json para manejar la promesa con fetch
    .then((data) => { // informacion que se trae
      createPokemon(data); // llamamos la funcion de la creacion de tarjetas
      console.log(data)
      spinner.style.display = "none";//llamamos el spinner y lo ocultamos
    });
}

function fetchPokemons(idPokemon, limit) { // funcion que hace el recorrido para traer los pokemones
  spinner.style.display = "block"; //mostramos el Spinner
  for (let i = idPokemon; i <= idPokemon + limit; i++) {
    fetchPokemon(i);// LLama la funcion que trae los datos y trae el numero de iteracion
  }
}

function createPokemon(pokemon) { // craciones de las tarjetas 
  const flipCard = document.createElement("div");// crear la flip card
  flipCard.classList.add("flip-card");// agregamos la clase

  const cardContainer = document.createElement("div");//contenedor de la flip card
  cardContainer.classList.add("card-container");

  flipCard.appendChild(cardContainer);// Añadiendo el flipcard

  const card = document.createElement("div"); // crear la tarejtas
  card.classList.add("pokemon-block");

  const spriteContainer = document.createElement("div"); // contenedor de la imagen
  spriteContainer.classList.add("img-container");

  const sprite = document.createElement("img"); // Traer la imagen 
  sprite.loading ="lazy"; // lazy loading atributo de HTML
  sprite.src = pokemon.sprites.front_default; // trae la url de la imagen de la API con la ruta sprite y front_default 
 
  spriteContainer.appendChild(sprite); // añadir el hijo
  const number = document.createElement("p");// agregar parrafo para el id del pokemon 
  number.textContent = `ID: ${pokemon.id}`;  //URL de donde traera el ID de la API

  const name = document.createElement("p"); // agregar parrafo para el nombre del pokemon
  name.classList.add("name"); 
  name.textContent = pokemon.name; //URL de donde traera el ID de la API

  //card.appendChild(spriteContainer); // agregarlos a la tarjeta
  //card.appendChild(number);
  //card.appendChild(name);
  card.appendChild(name);
  card.appendChild(spriteContainer);
  card.appendChild(number);


  // creacion de la parte de atras de la carta(flip-card)
  const cardBack = document.createElement("div");//div de la carta de atras
  cardBack.classList.add("pokemon-block-back");
  cardBack.textContent = "Información"; // texto
 

  cardBack.appendChild(habilidades(pokemon.abilities));
  cardBack.appendChild(pesos(pokemon.weight));
  cardBack.appendChild(alturas(pokemon.height));

  cardContainer.appendChild(card); // agregarlos a la tarjeta
  cardContainer.appendChild(cardBack);
  pokemonContainer.appendChild(flipCard);
}

//barras de

function habilidades(abilities) {
  const abilitiesContainer = document.createElement("div");
  abilitiesContainer.classList.add("informacion-container");
  for (let i = 0; i <= 1; i++) {
    const ability = abilities[i];

    const abilityContainer = document.createElement("informacion-container");
    abilityContainer.classList.add("informacion-container");

    const abilityName = document.createElement("p");
    abilityName.textContent = `Habilidad: ${ability.ability.name}` ;

    abilityContainer.appendChild(abilityName);
    abilitiesContainer.appendChild(abilityContainer);
  }

  return abilitiesContainer;
}
function pesos(weight) {
  const weightContainer = document.createElement("div");
  weightContainer.classList.add("informacion-container");
  for (let i = 0; i < 1; i++) {
    const peso = weight[i];

    const pesoContainer = document.createElement("informacion-container");
    pesoContainer.classList.add("informacion-container");

    const pesoName = document.createElement("p");
    pesoName.textContent = `Peso: ${weight} kg` ;

    pesoContainer.appendChild(pesoName);
    weightContainer.appendChild(pesoContainer);
  }

  return weightContainer;
}
function alturas(height) {
  const heightContainer = document.createElement("div");
  heightContainer.classList.add("informacion-container");
  for (let i = 0; i < 1; i++) {
    const altura = height[i];

    const alturaContainer = document.createElement("informacion-container");
    alturaContainer.classList.add("informacion-container");

    const alturaName = document.createElement("p");
    alturaName.textContent = `Altura: ${height} mts` ;

    alturaContainer.appendChild(alturaName);
    heightContainer.appendChild(alturaContainer);
  }

  return heightContainer;
}

function removeChildNodes(parent) { // remover los elementos de la paginacion 
  while (parent.firstChild) { //mientras se tenga tarejtas
    parent.removeChild(parent.firstChild); // remover los elementos
  }
}

fetchPokemons(idPokemon, limit);
