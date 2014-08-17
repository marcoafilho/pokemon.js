var Pokemon = function(attributes) {
    this.id = attributes.id;

    this.name  = attributes.name;
    this.level = 5;

    this.hp             = 15 + Math.floor(Math.random() * 6);
    this.attack         = 8 + Math.floor(Math.random() * 6);
    this.defense        = 8 + Math.floor(Math.random() * 6);
    this.specialAttack  = 8 + Math.floor(Math.random() * 6);
    this.specialDefense = 8 + Math.floor(Math.random() * 6);
    this.speed          = 8 + Math.floor(Math.random() * 6);

    this.currentHp = this.hp;
}

$(document).ready(function() {
    var trainerClassName = db.trainers[Math.floor(Math.random() * db.trainers.length)].replace(/\W+/g, '-').toLowerCase();
    $('.opponent .trainer').removeClass('hide').addClass(trainerClassName);
    for (var i = 0; i < 6; i++) {
        var pokemonName = db.pokemons[Math.floor(Math.random() * db.pokemons.length)];
        var pokemon = new Pokemon({ id: (db.opponentPokemons[db.opponentPokemons.length - 1] === undefined ? 1 : db.opponentPokemons[db.opponentPokemons.length - 1].id + 1), name: pokemonName });

        var pokeballContainer = $('<li></li>').addClass('pokeball-container');
        var pokeball = $('<div></div>').addClass('pokeball poke-ball active').data('id', pokemon.id);

        db.opponentPokemons.push(pokemon);

        pokeballContainer.append(pokeball);
        $('.opponent .pokeball-list').append(pokeballContainer);
    }


    $('.pokemon-selector').on('submit', function(event) {
        event.preventDefault();
    });

    $('.pokemon-name').on('keyup', function(event) {
        if (db.pokemons.indexOf($(this).val()) > -1 && event.which === 13) {
            if ($('.player .pokeball-list').children().length < 6) {
                var pokemon = new Pokemon({ id: (db.playerPokemons[db.playerPokemons.length - 1] === undefined ? 1 : db.playerPokemons[db.playerPokemons.length - 1].id + 1), name: $(this).val() });

                var pokeballContainer = $('<li></li>').addClass('pokeball-container');
                var pokeball = $('<div></div>').addClass('pokeball poke-ball active').data('id', pokemon.id);

                db.playerPokemons.push(pokemon);

                pokeballContainer.append(pokeball)
                $('.player .pokeball-list').append(pokeballContainer);
            }
        }
    });

    var interval = null;
    $('.player').on('click', '.pokeball-list .pokeball', function() {
        var pokeballs = $(this).closest('.pokeball-list').find('.pokeball, .pokemon');

        pokeballs.each(function(index, element) {
            var pokemonId = $(element).data('id');
            var pokemon;
            db.playerPokemons.forEach(function(object, index) {
                if (object.id === pokemonId) {
                    return pokemon = object;
                }
            });

            var pokemonClassName = pokemon.name.replace(/\W+/g, '-').toLowerCase();
            pokeballs.
                removeClass('pokemon small-up small-down ' + $(element).data('name')).
                addClass('pokeball poke-ball active');
        });

        var pokemonId = $(this).data('id');
        var pokemon;
        db.playerPokemons.forEach(function(object, index) {
            if (object.id === pokemonId) {
                return pokemon = object;
            }
        });

        var pokemonClassName = pokemon.name.replace(/\W+/g, '-').toLowerCase();
        pokeballs.removeClass('pokemon small-up small-down ' + pokemonClassName);

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
        pokemonInfo.find('.pokemon-name').text(pokemon.name);
        pokemonInfo.find('.attribute.attribute-level').text(pokemon.level);
        pokemonInfo.find('.attribute.attribute-hp').text(pokemon.hp);
        pokemonInfo.find('.attribute.attribute-attack').text(pokemon.attack);
        pokemonInfo.find('.attribute.attribute-defense').text(pokemon.defense);
        pokemonInfo.find('.attribute.attribute-sp-atk').text(pokemon.specialAttack);
        pokemonInfo.find('.attribute.attribute-sp-def').text(pokemon.specialDefense);
        pokemonInfo.find('.attribute.attribute-speed').text(pokemon.speed);
    });

    $('.player').on('click', '.pokeball-list .pokemon', function() {
        var pokemonId = $(this).data('id');
        var pokemon;
        db.playerPokemons.forEach(function(object, index) {
            if (object.id === pokemonId) {
                return pokemon = object;
            }
        });
        var pokemonClassName = pokemon.name.replace(/\W+/g, '-').toLowerCase();

        $(this).removeClass('pokemon small-up small-down ' + pokemonClassName).addClass('pokeball poke-ball active');
        $('.pokemon-display').addClass('hide');
    });

    var playerAnimation;
    var opponentAnimation;
    $('.start-battle').on('click', function(event) {
        event.preventDefault();

        if (db.playerPokemons.length <= 0) {
            $('.selection-log .panel-body').text('You must select a pokemon first!');
            return;
        }

        $('.pokeball-list .pokemon').each(function(index, element) {
            var pokemonId = $(element).data('id');
            var pokemon;
            db.playerPokemons.forEach(function(object, index) {
                if (object.id === pokemonId) {
                    return pokemon = object;
                }
            });
            var pokemonClassName = pokemon.name.replace(/\W+/g, '-').toLowerCase();

            $(this).removeClass('pokemon small-up small-down ' + pokemonClassName).addClass('pokeball poke-ball active');
            $('.pokemon-display').addClass('hide');
        });

        $('.in-pokemon-selection').removeClass('in-pokemon-selection').addClass('in-battle');
        $('.pokemon-selection-actions').remove();
        $('.pokemon-selection').remove();
        $('.battle').removeClass('hide');
        $('.battle').css({ 'min-height': '285px', 'max-height': '285px' });
        $('.battle-actions').removeClass('hide');


        var opponentPokeball = $('.opponent .pokeball-list').find('.pokeball').first();
        var opponentPokemonElement = $('.opponent-pokemon');
        var opponentPokemon = db.opponentPokemons[0];
        opponentPokemonElement.find('.pokemon-name').text(opponentPokemon.name);
        opponentPokemonElement.find('.pokemon-level').text(opponentPokemon.level);
        var opponentHealthBar = opponentPokemonElement.find('.progress-bar');
        opponentHealthBar.attr({ 'aria-valuemax': opponentPokemon.hp, 'aria-valuenow': opponentPokemon.hp });
        var pokemonClassName = opponentPokemon.name.replace(/\W+/g, '-').toLowerCase();
        opponentPokemonElement.find('.pokemon.front').addClass(pokemonClassName);
        opponentPokeball.removeClass().addClass('pokemon small small-up ' + pokemonClassName);

        if (opponentAnimation) {
            clearInterval(interval);
        }
        opponentAnimation = setInterval(function() {
            if (opponentPokeball.hasClass('small-up')) {
                opponentPokeball.removeClass('small-up').addClass('small-down');
            } else if (opponentPokeball.hasClass('small-down')) {
                opponentPokeball.removeClass('small-down').addClass('small-up');
            }
        }, 100);

        var playerPokeball = $('.player .pokeball-list').find('.pokeball').first();
        var playerPokemonElement = $('.player-pokemon');
        var playerPokemon = db.playerPokemons[0];
        playerPokemonElement.find('.pokemon-name').text(playerPokemon.name);
        playerPokemonElement.find('.pokemon-level').text(playerPokemon.level);
        var playerHealthBar = playerPokemonElement.find('.progress-bar');
        playerHealthBar.attr({ 'aria-valuemax': playerPokemon.hp, 'aria-valuenow': playerPokemon.hp });
        var pokemonClassName = playerPokemon.name.replace(/\W+/g, '-').toLowerCase();
        playerPokemonElement.find('.pokemon.back').addClass(pokemonClassName);
        playerPokemonElement.find('.hp-info').text(playerPokemon.currentHp + '/' + playerPokemon.hp);
        playerPokeball.removeClass().addClass('pokemon small small-up ' + pokemonClassName);

        if (playerAnimation) {
            clearInterval(interval);
        }
        playerAnimation = setInterval(function() {
            if (playerPokeball.hasClass('small-up')) {
                playerPokeball.removeClass('small-up').addClass('small-down');
            } else if (playerPokeball.hasClass('small-down')) {
                playerPokeball.removeClass('small-down').addClass('small-up');
            }
        }, 100);

        var battleActions = $('.battle-actions');
        battleActions.on('click', '.attack', function() {
            if (playerPokemon.currentHp > 0) {
                var battleLog = $('.battle-log').find('.panel-body');
                var playerDamage = Math.floor((((2 * playerPokemon.level + 10) / 250) * playerPokemon.attack/opponentPokemon.defense * 35 + 2) *  [0.85, 1][Math.floor(Math.random() * 2)]);
                opponentPokemon.currentHp -= playerDamage;
                var opponentHealthPercentage = Math.floor(opponentPokemon.currentHp/opponentPokemon.hp * 100);
                opponentHealthBar.css('width', opponentHealthPercentage + '%');
                if (opponentHealthPercentage > 10 && opponentHealthPercentage <= 25) {
                    opponentHealthBar.removeClass('progress-bar-success progress-bar-danger').addClass('progress-bar-warning');
                } else if (opponentHealthPercentage <= 10) {
                    opponentHealthBar.removeClass('progress-bar-success progress-bar-warning').addClass('progress-bar-danger');
                } else {
                    opponentHealthBar.removeClass('progress-bar-warning progress-bar-danger').addClass('progress-bar-success');
                }
                opponentHealthBar.attr({ 'aria-valuenow': opponentPokemon.currentHp });

                if (opponentPokemon.currentHp > 0) {
                    battleLog.text(playerPokemon.name + ' used TACKLE.');
                    setTimeout(function() {
                        var opponentDamage = Math.floor((((2 * opponentPokemon.level + 10) / 250) * opponentPokemon.attack/playerPokemon.defense * 35 + 2) *  [0.85, 1][Math.floor(Math.random() * 2)]);

                        playerPokemon.currentHp -= opponentDamage;
                        var playerHealthPercentage = Math.floor(playerPokemon.currentHp/playerPokemon.hp * 100);
                        playerHealthBar.css('width', playerHealthPercentage + '%');
                        if (playerHealthPercentage > 10 && playerHealthPercentage <= 25) {
                            playerHealthBar.removeClass('progress-bar-success progress-bar-danger').addClass('progress-bar-warning');
                        } else if (playerHealthPercentage <= 10) {
                            playerHealthBar.removeClass('progress-bar-success progress-bar-warning').addClass('progress-bar-danger');
                        } else {
                            playerHealthBar.removeClass('progress-bar-warning progress-bar-danger').addClass('progress-bar-success');
                        }
                        playerHealthBar.attr({ 'aria-valuenow': playerPokemon.currentHp });
                        playerPokemonElement.find('.hp-info').text(((playerPokemon.currentHp < 0) ? 0 : playerPokemon.currentHp) + '/' + playerPokemon.hp);
                        if (playerPokemon.currentHp <= 0) {
                            battleLog.text(playerPokemon.name + ' fainted.');
                            playerPokeball.addClass('desaturate');
                            clearInterval(playerAnimation);
                            db.playerPokemons.shift();
                            playerPokemon = db.playerPokemons[0];
                            if (playerPokemon === undefined) {
                                battleLog.text('You lost.');
                                return;
                            }

                            playerPokemonElement.find('.pokemon-name').text(playerPokemon.name);
                            playerPokemonElement.find('.pokemon-level').text(playerPokemon.level);
                            playerHealthBar.attr({ 'aria-valuemax': playerPokemon.hp, 'aria-valuenow': playerPokemon.hp });
                            playerHealthBar.removeClass('progress-bar-success progress-bar-danger progress-bar-warning').addClass('progress-bar-success');
                            playerHealthBar.css({ 'width': '100%' });
                            playerPokemonElement.find('.hp-info').text(playerPokemon.currentHp + '/' + playerPokemon.hp);
                            pokemonClassName = playerPokemon.name.replace(/\W+/g, '-').toLowerCase();
                            playerPokemonElement.find('.pokemon.back').removeClass().addClass('pokemon back ' + pokemonClassName);
                            playerPokeball = $('.player .pokeball-list').find('.pokeball').first();
                            playerPokeball.removeClass().addClass('pokemon small small-up ' + pokemonClassName);

                            playerAnimation = setInterval(function() {
                                if (playerPokeball.hasClass('small-up')) {
                                    playerPokeball.removeClass('small-up').addClass('small-down');
                                } else if (playerPokeball.hasClass('small-down')) {
                                    playerPokeball.removeClass('small-down').addClass('small-up');
                                }
                            }, 100);
                        } else {
                            battleLog.text('Foe\'s ' + opponentPokemon.name + ' used TACKLE.');
                        }
                    }, 1500);
                } else {
                    battleLog.text(opponentPokemon.name + ' fainted.');
                    opponentPokeball.addClass('desaturate');
                    clearInterval(opponentAnimation);
                    db.opponentPokemons.shift();
                    opponentPokemon = db.opponentPokemons[0];
                    if (opponentPokemon === undefined) {
                        battleLog.text('You won.');
                        return;
                    }

                    opponentPokemonElement.find('.pokemon-name').text(opponentPokemon.name);
                    opponentPokemonElement.find('.pokemon-level').text(opponentPokemon.level);
                    opponentHealthBar.attr({ 'aria-valuemax': opponentPokemon.hp, 'aria-valuenow': opponentPokemon.hp });
                    opponentHealthBar.removeClass('progress-bar-success progress-bar-danger progress-bar-warning').addClass('progress-bar-success');
                    opponentHealthBar.css({ 'width': '100%' });
                    pokemonClassName = opponentPokemon.name.replace(/\W+/g, '-').toLowerCase();
                    opponentPokemonElement.find('.pokemon.front').removeClass().addClass('pokemon front ' + pokemonClassName);
                    opponentPokeball = $('.opponent .pokeball-list').find('.pokeball').first();
                    opponentPokeball.removeClass().addClass('pokemon small small-up ' + pokemonClassName);

                    opponentAnimation = setInterval(function() {
                        if (opponentPokeball.hasClass('small-up')) {
                            opponentPokeball.removeClass('small-up').addClass('small-down');
                        } else if (opponentPokeball.hasClass('small-down')) {
                            opponentPokeball.removeClass('small-down').addClass('small-up');
                        }
                    }, 100);
                }
            }
        });
    })
});