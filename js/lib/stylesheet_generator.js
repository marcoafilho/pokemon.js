var StylesheetGenerator = function(module) {
    const POKEMON_LIST = [
        'Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Charizard', 'Squirtle', 'Wartortle', 'Blastoise', 'Caterpie',
        'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill', 'Pidgey', 'Pidgeotto', 'Pidgeot', 'Ratata', 'Raticate',
        'Spearow', 'Fearow', 'Ekans', 'Arbok', 'Pikachu', 'Raichu', 'Sandshrew', 'Sandslash', 'Nidoran Female', 'Nidorina',
        'Nidoqueen', 'Nidoran Male', 'Nidorino', 'Nidoking', 'Clefairy', 'Clefable', 'Vulpix', 'Ninetales', 'Jigglypuff', 'Wigglytuff',
        'Zubat', 'Golbat', 'Oddish', 'Gloom', 'Vileplume', 'Paras', 'Parasect', 'Venonat', 'Venomoth', 'Diglett',
        'Dugtrio', 'Meowth', 'Persian', 'Psyduck', 'Golduck', 'Mankey', 'Primeape', 'Growlithe', 'Arcanine', 'Poliwag',
        'Poliwhirl', 'Poliwrath', 'Abra', 'Kadabra', 'Alakazam', 'Macho', 'Machoke', 'Machamp', 'Bellsprout', 'Weepinbel',
        'Victrebel', 'Tentacool', 'Tentacruel', 'Geodude', 'Graveler', 'Golem', 'Ponyta', 'Rapidash', 'Slowpoke', 'Slowbro',
        'Magnemite', 'Magneton', 'Farfetch\'d', 'Doduo', 'Dodrio', 'Seel', 'Dewgong', 'Grimer', 'Muk', 'Shellder',
        'Cloyster', 'Gastly', 'Haunter', 'Gengar', 'Onix', 'Drowzee', 'Hypno', 'Krabby', 'Kingler', 'Voltorb', 'Electrode',
        'Exeggcute', 'Exeggutor', 'Cubone', 'Marowak', 'Hitmonlee', 'Himonchan', 'Lickitung', 'Koffing', 'Weezing',
        'Rhyhorn', 'Rhydon', 'Chansey', 'Tangela', 'Kangaskhan', 'Horsea', 'Seadra', 'Goldeen', 'Seaking', 'Staryu',
        'Starmie', 'Mr. Mime', 'Scyther', 'Jynx', 'Electabuzz', 'Magmar', 'Pinsir', 'Tauros', 'Magikarp', 'Gyarados',
        'Lapras', 'Ditto', 'Eevee', 'Vaporeon', 'Jolteon', 'Flareon', 'Porygon', 'Omanyte', 'Omastar', 'Kabuto',
        'Kabutops', 'Aerodactyl', 'Snorlax', 'Articuno', 'Zapdos', 'Moltres', 'Dratini', 'Dragonair', 'Dragonite', 'Mewtwo',
        'Mew'
    ];

    const POKEBALL_LIST = [
        'Poke Ball', 'Great Ball', 'Ultra Ball', 'Master Ball', 'Premier Ball', 'Cherish Ball', 'Luxury Ball', 'Nest Ball', 'Net Ball',
        'Dive Ball', 'Repeat Ball', 'Timer Ball', 'Safari Ball', 'Quick Ball', 'Dusk Ball', 'Heal Ball', 'Sport Ball', 'Fast Ball',
        'Friend Ball', 'Heavy Ball', 'Level Ball', 'Love Ball', 'Lure Ball', 'Moon Ball', 'Park Ball'
    ];

    const TRAINER_LIST = [
        'Ethan', 'Lyra', 'Little boy', 'Little girl', 'Scout boy', 'Scout girl', 'Bug catcher boy', 'Essence lady', 'Twins', 'Hiker',
        'Kung fu girl', 'Fisher', 'Biker man', 'Biker woman', 'Karate man', 'Painter', 'Breeder guy', 'Breeder lady', 'Cowgirl',
        'Runner', 'Daddy', 'Mommy', 'Baby', 'Rival', 'Student guy', 'Student girl', 'Waitress', 'Dojo master', 'Dojo trainee', 'Count',
        'Bird breeder girl', 'Magician', 'Rich guy', 'Rich lady', 'Detective', 'Old lady', 'Shopper', 'Collector', 'Guard',
        'Ranger man', 'Ranger woman', 'Scientist', 'Swimmer man', 'Swimmer woman', 'Swimmer boy', 'Swimmer girl', 'Sailor',
        'Kimono girl', 'Treasure seeker', 'Psychic man', 'Psychic woman', 'Gambler', 'Guitarrist', 'Northener man', 'Northener woman',
        'Team Rocket man', 'Skier', 'Punk', 'Clown', 'Mechanic', 'Student boy', 'Student girl', 'Team Rocket woman', 'Thief',
        'Fire player', 'Bully', 'Samurai', 'Bug carcher girl', 'Cosplayer', 'Bird breeder man', 'Normal gym leader', 'Farmer',
        'Ghost gym leader', 'Ice gym leader', 'Steel gym leader', 'Fight gym leader', 'Dragon gym leader', 'Executive', 'Geek',
        'Exorcist man', 'Happy girl', 'Waiter', 'Exorcist woman', 'Camera man', 'Reporter', 'Singer', 'Pokemon master man',
        'Pokemon master woman', 'Bossy woman', 'Poison gym leader', 'Essence lady', 'Rich guy', 'Scout girl', 'Scout boy', 'Baby',
        'Lucas', 'Dawn', 'Hero', 'Rock gym leader', 'Disguise master', 'Tech kid', 'Pretty lady', 'Weird couple', 'Water gym leader',
        'Electric gym leader', 'Grass gym leader', 'Poison gym apprentice', 'Psychic gym leader', 'Fire gym leader', 'Red', 'Blue',
        'Sensei', 'Fighter', 'Crazy scientist man', 'Groupie woman', 'Snowboarder', 'Groupie man', 'Team Rocket sergeant',
        'Team Rocket boss', 'Rival', 'Show off', 'Students', 'Dancers', 'Serious man', 'Agent', 'Lucas', 'Dawn', 'Lucas Alternative',
        'Dawn Alternative'
    ];

    var backgroundPosition = function(x, y) {
        return (x > 0 ? '-' + x + 'px' : 0) + ' ' + (y > 0 ? '-' + y + 'px' : 0);
    };

    module.pokemons = function() {
        var style = '';
        style += '.pokemon {\n';
        style += '    background-image: url(../img/pokemons.png);\n';
        style += '    display: inline-block;\n';
        style += '}\n\n';

        style += '.pokemon.front {\n';
        style += '    height: 66px;\n';
        style += '    width: 66px;\n';
        style += '}\n\n';

        style += '.pokemon.back {\n';
        style += '    height: 66px;\n';
        style += '    width: 65px;\n';
        style += '}\n\n';

        style += '.pokemon.small {\n';
        style += '    height: 32px;\n';
        style += '    width: 31px;\n';
        style += '}\n\n';

        POKEMON_LIST.forEach(function(pokemon, index) {
            var pokemonClassName = pokemon.replace(/\W+/g, '-').toLowerCase();

            style += '.pokemon.front.' + pokemonClassName + ' {\n';
            style += '    background-position: ' + backgroundPosition((index % 10) * 162, Math.floor(index / 10) * 66) + ';\n';
            style += '}\n\n';

            style += '.pokemon.back.' + pokemonClassName + ' {\n';
            style += '    background-position: ' + backgroundPosition((index % 10) * 162 + 66, Math.floor(index / 10) * 66) + ';\n';
            style += '}\n\n';

            style += '.pokemon.small.small-up.' + pokemonClassName + ' {\n';
            style += '    background-position: ' + backgroundPosition((index % 10) * 162 + 131, Math.floor(index / 10) * 66 + 2) + ';\n';
            style += '}\n\n';

            style += '.pokemon.small.small-down.' + pokemonClassName + ' {\n';
            style += '    background-position: ' + backgroundPosition((index % 10) * 162 + 131, Math.floor(index / 10) * 66 + 34) + ';\n';
            style += '}\n\n';
        });

        return style;
    };

    module.pokeballs = function() {
        var style = '';
        style += '.pokeball {\n';
        style += '    background-image: url(../img/pokeballs.png);\n';
        style += '    display: inline-block;\n';
        style += '    height: 20px;\n';
        style += '    width: 20px;\n';
        style += '}\n\n';

        POKEBALL_LIST.forEach(function(pokeball, index) {
            var pokeballClassName = pokeball.replace(/\W+/g, '-').toLowerCase()

            style += '.pokeball.' + pokeballClassName + ' {\n';
            style += '    background-position: ' + backgroundPosition((index % 26) * 20, 20) + ';\n';
            style += '}\n\n';

            style += '.pokeball.active.' + pokeballClassName +', .pokeball.' + pokeballClassName + ':hover {\n';
            style += '    background-position-y: 0;\n';
            style += '}\n\n';
        });

        return style;
    };

    module.trainers = function() {
        var style = '';
        style += '.trainer {\n';
        style += '    background-image: url(../img/trainers.png);\n';
        style += '    display: inline-block;\n';
        style += '    height: 80px;\n';
        style += '    width: 80px;\n';
        style += '}\n\n';

        TRAINER_LIST.forEach(function(trainer, index) {
            style += '.trainer.' + trainer.replace(/\W+/g, '-').toLowerCase() + ' {\n';
            style += '    background-position: ' + backgroundPosition((index % 12) * 80, Math.floor(index / 12) * 80) + ';\n';
            style += '}\n\n';
        });

        return style;
    };

    return module;
}(StylesheetGenerator || {});
