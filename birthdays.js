const birthdayList = [
  {
    name: 'Pikachu',
    date: 'July 4',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
  },
  {
    name: 'Bulbasaur',
    date: 'April 22',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
  },
  {
    name: 'Charmander',
    date: 'February 27',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png'
  },
  {
    name: 'Squirtle',
    date: 'August 8',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png'
  },
  {
    name: 'Eevee',
    date: 'March 14',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png'
  }
];

// Display Pokémon Birthdays
const pokemonBirthdaysContainer = document.getElementById('pokemonBirthdays');

function displayBirthdays() {
  birthdayList.forEach(pokemon => {
    const card = document.createElement('div');
    card.classList.add('birthday-card');
    card.innerHTML = `
      <img src="${pokemon.image}" alt="${pokemon.name}">
      <h3>${pokemon.name}</h3>
      <p>Birthday: ${pokemon.date}</p>
    `;
    pokemonBirthdaysContainer.appendChild(card);
  });
}

window.onload = displayBirthdays;
