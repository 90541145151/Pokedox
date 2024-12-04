const baseUrl = "https://pokeapi.co/api/v2/";
const pokemonDisplay = document.getElementById("pokemonDisplay");
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
const regionSelect = document.getElementById("regionSelect");
const regionDisplay = document.getElementById("regionDisplay");
const mostLikedContainer = document.getElementById("mostLikedContainer");

let mostLiked = JSON.parse(localStorage.getItem("mostLiked")) || {};

// Fetch Pokémon regions and populate the dropdown
async function fetchRegions() {
  try {
    const response = await fetch(`${baseUrl}region/`);
    const data = await response.json();
    const regions = data.results;
    
    regions.forEach((region, index) => {
      const option = document.createElement("option");
      option.value = index + 1; // Regions start from 1
      option.textContent = region.name.toUpperCase();
      regionSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Failed to fetch regions:", error);
  }
}

// Fetch Pokémon for a selected region
async function fetchRegionPokemons(regionId) {
  try {
    const response = await fetch(`${baseUrl}region/${regionId}`);
    const data = await response.json();
    const pokedexUrl = data.main_generation.url;
    const pokedexResponse = await fetch(pokedexUrl);
    const pokedexData = await pokedexResponse.json();
    const pokemonList = pokedexData.pokemon_species;

    regionDisplay.innerHTML = ""; // Clear previous results
    pokemonList.forEach(async (pokemon) => {
      const pokemonDetails = await fetchPokemon(pokemon.name);
      if (pokemonDetails) {
        regionDisplay.innerHTML += createPokemonCard(pokemonDetails);
      }
    });
  } catch (error) {
    console.error("Failed to fetch region Pokémon:", error);
  }
}

// Fetch individual Pokémon details by name or ID
async function fetchPokemon(nameOrId) {
  try {
    const response = await fetch(`${baseUrl}pokemon/${nameOrId}`);
    if (!response.ok) throw new Error("Pokémon not found");
    return await response.json();
  } catch (error) {
    console.error("Pokémon not found:", error);
    return null;
  }
}

// Generate Pokémon card for display
function createPokemonCard(pokemon) {
  const { name, id, sprites } = pokemon;
  return `
    <div class="pokemon-card">
      <h3>${name.toUpperCase()} (#${id})</h3>
      <img src="${sprites.front_default}" alt="${name}">
      <button onclick="likePokemon('${name}')">❤️ Like</button>
    </div>
  `;
}

// Like a Pokémon and store it in localStorage
function likePokemon(name) {
  mostLiked[name] = (mostLiked[name] || 0) + 1;
  localStorage.setItem("mostLiked", JSON.stringify(mostLiked));
  renderMostLiked();
}

// Display the most liked Pokémon
function renderMostLiked() {
  const likedList = Object.entries(mostLiked)
    .sort((a, b) => b[1] - a[1]) // Sort by number of likes
    .map(([name, count]) => `<p>${name.toUpperCase()} - ❤️ ${count} Likes</p>`)
    .join("");
  mostLikedContainer.innerHTML = likedList || "<p>No Pokémon liked yet.</p>";
}

// Handle search functionality
searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim().toLowerCase();
  if (query) {
    const pokemon = await fetchPokemon(query);
    pokemonDisplay.innerHTML = pokemon ? createPokemonCard(pokemon) : "Pokémon not found.";
  }
});

// Handle region selection and fetch corresponding Pokémon
regionSelect.addEventListener("change", (e) => {
  const regionId = e.target.value;
  if (regionId) {
    fetchRegionPokemons(regionId);
  }
});

// Initialize page with regions and most liked Pokémon
fetchRegions();
renderMostLiked();

// Calendar JavaScript with Important Dates
const calendarContainer = document.querySelector('.calendar-container');
const calendarDays = document.querySelector('.calendar-days');
const calendarHeader = document.querySelector('.calendar-header h2');
const prevButton = document.querySelector('.prev-month');
const nextButton = document.querySelector('.next-month');

// Pokémon-themed important dates
const pokemonEvents = {
    "2024-12-05": {
        name: "Pikachu Day",
        image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
        description: "Celebrate Pikachu, the iconic Pokémon!",
    },
    "2024-12-10": {
        name: "Charmander Celebration",
        image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
        description: "A day dedicated to the fiery Charmander!",
    },
    "2024-12-25": {
        name: "Holiday with Pokémon",
        image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png",
        description: "Spend the holidays with Eevee and friends!",
    },
    "2024-12-31": {
        name: "New Year's Eve Party",
        image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png",
        description: "Ring in the new year with Mewtwo!",
    },
};

let currentDate = new Date();

function renderCalendar(date) {
    calendarDays.innerHTML = ''; // Clear previous calendar days

    const year = date.getFullYear();
    const month = date.getMonth();

    // Set calendar header
    calendarHeader.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

    // Get first and last day of the month
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Add blank days for alignment
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day');
        calendarDays.appendChild(emptyDay);
    }

    // Generate days of the month
    for (let day = 1; day <= lastDate; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');

        // Add day number
        const dayNumber = document.createElement('h3');
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);

        // Check for Pokémon events
        const eventDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        if (pokemonEvents[eventDate]) {
            const event = pokemonEvents[eventDate];
            
            // Add event label
            const eventLabel = document.createElement('div');
            eventLabel.classList.add('pokemon-event');
            eventLabel.textContent = event.name;

            // Add event image
            const eventImage = document.createElement('img');
            eventImage.src = event.image;
            eventImage.alt = event.name;

            // Add hover description
            const tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.textContent = event.description;

            dayElement.appendChild(eventLabel);
            dayElement.appendChild(eventImage);
            dayElement.appendChild(tooltip);
        }

        calendarDays.appendChild(dayElement);
    }
}

prevButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

nextButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

// Initialize calendar
renderCalendar(currentDate);
