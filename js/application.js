$(document).ready(function() {
    var trainerClassName = db.trainers[Math.floor(Math.random() * db.trainers.length)].replace(/\W+/g, '-').toLowerCase();
    $('.opponent .trainer').removeClass('hide').addClass(trainerClassName);
    for (var i = 0; i < 6; i++) {
        var pokemon = db.pokemons[Math.floor(Math.random() * db.pokemons.length)];
        var pokeballContainer = $('<li></li>').addClass('pokeball-container');
        var pokeball = $('<div></div>').addClass('pokeball poke-ball active').data('name', pokemon);

        pokeballContainer.append(pokeball);
        $('.opponent .pokeball-list').append(pokeballContainer);
    }

    $('.pokemon-selector').on('submit', function(event) {
        event.preventDefault();
    });

    $('.pokemon-name').on('keyup', function(event) {
        if (db.pokemons.indexOf($(this).val()) > -1 && event.which === 13) {
            if ($('.player .pokeball-list').children().length < 6) {
                var pokeballContainer = $('<li></li>').addClass('pokeball-container');
                var pokeball = $('<div></div>').addClass('pokeball poke-ball active').data('name', $(this).val());
                pokeballContainer.append(pokeball)
                $('.player .pokeball-list').append(pokeballContainer);
            }
        }
    });

    var interval = null;
    $(document).on('click', '.pokeball-list .pokeball', function() {
        var pokeballs = $(this).closest('.pokeball-list').find('.pokeball, .pokemon');

        pokeballs.each(function(index, element) {
            var pokemonClassName = $(element).data('name').replace(/\W+/g, '-').toLowerCase();
            pokeballs.
                removeClass('pokemon small-up small-down ' + $(element).data('name')).
                addClass('pokeball poke-ball active');
        });

        var pokemonClassName = $(this).data('name').replace(/\W+/g, '-').toLowerCase();
        pokeballs.removeClass('pokemon small-up small-down ' + $())

        $(this).removeClass('pokeball poke-ball active').addClass('pokemon small small-up ' + pokemonClassName);

        var self = $(this);
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(function() {
            if (self.hasClass('small-up')) {
                self.removeClass('small-up').addClass('small-down');
            } else if (self.hasClass('small-down')) {
                self.removeClass('small-down').addClass('small-up');
            }
        }, 100);

        var pokemonInfo = $('.pokemon-info');
        pokemonInfo.find('.pokemon-display').removeClass('hide');
        pokemonInfo.find('.pokemon-thumbnail .pokemon').removeClass().addClass('pokemon front ' + pokemonClassName);
        pokemonInfo.find('.pokemon-name').text($(this).data('name'));
    });

    $(document).on('click', '.pokeball-list .pokemon', function() {
        var pokemonClassName = $(this).data('name').replace(/\W+/g, '-').toLowerCase();
        $(this).removeClass('pokemon small-up small-down ' + pokemonClassName).addClass('pokeball poke-ball active');
        $('.pokemon-display').addClass('hide');
    });
});