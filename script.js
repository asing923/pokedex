var nameInput = document.getElementById("search-name-input");
nameInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("search-name-btn").click();
    }
});

var idInput = document.getElementById("search-id-input")
idInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("search-id-btn").click();
    }
});

function searchByName() {

    let inputValue = document.getElementById("search-name-input").value
    if(inputValue.length === 0) {
        resetSearchResult();
        return;
    }

    let validation = validateName(inputValue);
    
    let matchedPokemon = [];
    if (validation && inputValue !== '' && inputValue.length > 0) {
        matchedPokemon = pokemonData.filter(pokemon => {
            if (pokemon.name.toLowerCase().includes(inputValue.toLowerCase())) {
                return pokemon
            }
        })
        if (matchedPokemon.length) {
            // alert(JSON.stringify(getCustomizedAlertList(matchedPokemon).slice(0, 5)));
            populateSearchData(matchedPokemon);

        } else {
            document.getElementById("search-name-input").value = '';
            alert('No Pokemon found with matching Name: ' + inputValue);
            resetSearchResult();
        }
    }
}

function searchById() {

    let inputValue = document.getElementById('search-id-input').value
    if(inputValue.length === 0) {
        resetSearchResult();
        return;
    }

    let validation = validateId(inputValue);

    let matchedPokemon = [];
    if (validation && inputValue !== '') {
        matchedPokemon = pokemonData.filter(pokemon => {
            if (pokemon.id.includes(inputValue)) {
                return pokemon;
            }
        })
        if (matchedPokemon.length) {
            // alert(JSON.stringify(getCustomizedAlertList(matchedPokemon).slice(0, 5)));
            populateSearchData(matchedPokemon);
        } else {
            document.getElementById("search-id-input").value = '';
            alert('No Pokemon found with matching ID:' + inputValue);
            resetSearchResult();
        }
    }
}

function validateName(name) {
    let regex = /^[A-Za-z]+$/;
    if (name.match(regex)) {
        return true
    } else {
        alert("Please enter only alphabets")
        return false
    }
}

function validateId(value) {
    if (value <= 20 && value > 0) {
        return true
    } else {
        alert('Please enter value between 1 to 20')
        return false
    }
}

function getCustomizedAlertList(matchedPokemons) {
    let customizedResultList = [];
    matchedPokemons.forEach(
        pokemon => {
            let customizedPokemon = {};
            customizedPokemon.id = pokemon.id;
            customizedPokemon.name = pokemon.name;
            customizedPokemon.about = pokemon.skills.one + ' ' + pokemon.skills.two;
            customizedResultList.push(customizedPokemon);
        }
    )
    return customizedResultList;
}

function resetSearchResult() {
    let galleryContainer = document.getElementById('gallery-container')
    let filteredSection = document.getElementById('filtered-section'); 
    let labelSection = document.getElementById('label-section');
    if(filteredSection || labelSection) {
        labelSection.appendChild(document.createTextNode(""));
        filteredSection.appendChild(document.createTextNode(""));
        galleryContainer.removeChild(filteredSection);
        galleryContainer.removeChild(labelSection);
    }
}

function populateSearchData(filteredResults) {

    resetSearchResult();
    let totalResults = filteredResults.length;
    let filteredSection = document.createElement('div');
    filteredSection.id = 'filtered-section';
    filteredSection.classList.add('image-gallery')
    filteredSection.classList.add('filtered-results')

    let labelSection = document.createElement('div')
    labelSection.id = 'label-section'
    labelSection.classList.add('search-by-label')
    labelSection.classList.add('extra-margins')
    
    let label = document.createElement('span');
    label.appendChild(document.createTextNode('Found matched results: ' + totalResults));
    labelSection.appendChild(label);
    
    let galleryContainer = document.getElementById('gallery-container');
    let imageGallery = document.getElementById('image-gallery');

    if(totalResults === 0) {
        return;
    }
    else {
        let unorderedList = document.createElement('ul');
        unorderedList.classList.add("unordered-list");
        
        for (let i = 0; i < totalResults; i++) {

            let listElement = document.createElement('li');
            listElement.classList.add("pokemon");

            let pokemonContainer = document.createElement('div');
            pokemonContainer.classList.add("pokemon-container");

            let imageContent = document.createElement('div');
            imageContent.classList.add("image-content");

            let image = document.createElement('img');
            image.src = 'pokemon/' + filteredResults[i].path;
            image.alt = 'image not found';
            imageContent.appendChild(image);
            pokemonContainer.appendChild(imageContent);

            let aboutContent = document.createElement('div');
            aboutContent.classList.add("about-content");

            let idNameContainer = document.createElement('div');
            idNameContainer.classList.add("id-name-container");

            let pokemonId = document.createElement('span');
            pokemonId.appendChild(document.createTextNode('#' + filteredResults[i].id + '\u00A0'));
            pokemonId.classList.add("pokeon-id");

            let pokemonName = document.createElement('span'); 
            pokemonName.appendChild(document.createTextNode(filteredResults[i].name));
            pokemonName.classList.add("pokemon-name");

            idNameContainer.appendChild(pokemonId);
            idNameContainer.appendChild(pokemonName)
            aboutContent.appendChild(idNameContainer);

            let chargeMove = document.createElement('span');
            chargeMove.appendChild(document.createTextNode(filteredResults[i].move));
            chargeMove.classList.add("charge-move");

            aboutContent.appendChild(chargeMove);

            let about = document.createElement('div');
            let skillSetLayoutArr = addSkill(filteredResults[i].skills)

            if(skillSetLayoutArr.length) {
                skillSetLayoutArr.forEach(
                    element => {
                        about.appendChild(element);
                        about.classList.add('about');
                        aboutContent.appendChild(about);
                    }
                )
            }
            pokemonContainer.appendChild(aboutContent);
            listElement.appendChild(pokemonContainer);
            unorderedList.appendChild(listElement);
        }

        filteredSection.appendChild(unorderedList);
        galleryContainer.insertBefore(filteredSection, imageGallery)
        galleryContainer.insertBefore(labelSection, filteredSection);
    }
}

function addSkill(skillsData) {

    let skillLayoutArray = [];
    let skillList = Object.keys(skillsData)
    .map(function(key) {
        return skillsData[key];
    });

    skillList.map(
        skill => {
            let skillLayout = document.createElement('span');
            skillLayout.classList.add('pokeon-about');

            switch (skill) {
                case 'Fire': skillLayout.classList.add('fire-skill');
                    break;
                case 'Poison': skillLayout.classList.add('poison-skill');

                    break;
                case 'Grass': skillLayout.classList.add('grass-skill');

                    break;
                case 'Water': skillLayout.classList.add('water-skill');

                    break;
                case 'Flying': skillLayout.classList.add('flying-skill');

                    break;
                case 'Bug': skillLayout.classList.add('bug-skill');

                    break;
                case 'Normal': skillLayout.classList.add('normal-skill');

                    break;
                default:
                    break;
            }

            skillLayout.appendChild(document.createTextNode(skill));
            skillLayoutArray.push(skillLayout);
        }
    )
    return skillLayoutArray;
}

var pokemonData = [
    {
        "id": "001",
        "name": "Bulbasaur",
        "skills": {
            'one': 'Fire',
            'two': 'Poison'
        },
        "path": "1.png",
        "move": 'Sludge Bomb/Seed Bomb/Power Whip'
    },
    {
        "id": "002",
        "name": "Ivysaur",
        "skills": {
            'one': 'Grass',
            'two': 'Poison'
        },
        "path": "2.png",
        "move": 'Sludge Bomb/Solar Beam/Power Whip'
    },
    {
        "id": "003",
        "name": "Venusaur",
        "skills": {
            'one': 'Grass',
            'two': 'Poison'
        },
        "path": "3.png",
        "move": 'Sludge Bomb/Petal Blizzard/Power Whip'
    },
    {
        "id": "004",
        "name": "Charmander",
        "skills": {
            'one': 'Fire'
        },
        "path": "4.png",
        "move": 'Flame Burst/Flamethrower/Flame Charge'
    },
    {
        "id": "005",
        "name": "Charmeleon",
        "skills": {
            'one': 'Fire'
        },
        "path": "5.png",
        "move": 'Flame Burst/Flamethrower/Fire Punch'
    },

    {
        "id": "006",
        "name": "Charizard",
        "skills": {
            'one': 'Fire',
            'two': 'Flying'
        },
        "path": "6.png",
        "move": 'Fire Blast/Dragon Claw/Overheat'
    },
    {
        "id": "007",
        "name": "Squirtle",
        "skills": {
            'one': 'Water'
        },
        "path": "7.png",
        "move": 'Aqua Jet/Aqua Tail/Water Pulse'
    },
    {
        "id": "008",
        "name": "Wartortle",
        "skills": {
            'one': 'Water'
        },
        "path": "8.png",
        "move": 'Aqua Jet/Hydro Pump/Ice Beam'
    },
    {
        "id": "009",
        "name": "Blastoise",
        "skills": {
            'one': 'Water'
        },
        "path": "9.png",
        "move": 'Ice Beam/Hydro Pump/Flash Cannon'
    },
    {
        "id": "010",
        "name": "Caterpie",
        "skills": {
            'one': 'Bug'
        },
        "path": "10.png",
        "move": 'Struggle'
    },
    {
        "id": "011",
        "name": "Metapod",
        "skills": {
            'one': 'Bug'
        },
        "path": "11.png",
        "move": 'Struggle'
    },
    {
        "id": "012",
        "name": "Butterfree",
        "skills": {
            'one': 'Bug',
            'two': 'Flying'
        },
        "path": "12.png",
        "move": 'Psychic/Bug Buz/Signal Beam'
    },
    {
        "id": "013",
        "name": "Weedle",
        "skills": {
            'one': 'Bug',
            'two': 'Poison'
        },
        "path": "13.png",
        "move": 'Struggle'
    },
    {
        "id": "014",
        "name": "Kakuna",
        "skills": {
            'one': 'Bug',
            'two': 'Poison'
        },
        "path": "14.png",
        "move": 'Struggle'
    },
    {
        "id": "015",
        "name": "Beedrill",
        "skills": {
            'one': 'Bug',
            'two': 'Poison'
        },
        "path": "15.png",
        "move": 'Aerial Ace/Sludge Bomb/X-Scissor'
    },
    {
        "id": "016",
        "name": "Pidgey",
        "skills": {
            'one': 'Normal',
            'two': 'Flying'
        },
        "path": "16.png",
        "move": 'Twister/Aerial Ace/Air Cutter'
    },
    {
        "id": "017",
        "name": "Pidgeotto",
        "skills": {
            'one': 'Normal',
            'two': 'Flying'
        },
        "path": "17.png",
        "move": 'Twister/Aerial Ace/Air Cutter'
    },
    {
        "id": "018",
        "name": "Pidgeot",
        "skills": {
            'one': 'Normal',
            'two': 'Flying'
        },
        "path": "18.png",
        "move": 'Hurricane/Aerial Ace/Brave Bird'
    },
    {
        "id": "019",
        "name": "Rattata",
        "skills": {
            'one': 'Normal'
        },
        "path": "19.png",
        "move": 'Dig/Hyper Fang/Body Slam'
    },
    {
        "id": "020",
        "name": "Raticate",
        "skills": {
            'one': 'Normal'
        },
        "path": "20.png",
        "move": 'Dig/Hyper Fang/Hyper Beam'
    }
]