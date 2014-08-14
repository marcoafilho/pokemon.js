var StylesheetGenerator = function(module) {
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

        db.pokemons.forEach(function(pokemon, index) {
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

        db.pokeballs.forEach(function(pokeball, index) {
            var pokeballClassName = pokeball.replace(/\W+/g, '-').toLowerCase();

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

        db.trainers.forEach(function(trainer, index) {
            style += '.trainer.' + trainer.replace(/\W+/g, '-').toLowerCase() + ' {\n';
            style += '    background-position: ' + backgroundPosition((index % 12) * 80, Math.floor(index / 12) * 80) + ';\n';
            style += '}\n\n';
        });

        return style;
    };

    return module;
}(StylesheetGenerator || {});
