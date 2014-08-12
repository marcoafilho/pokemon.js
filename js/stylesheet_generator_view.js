$(document).ready(function() {
    var css =
        StylesheetGenerator.pokeballs() +
        StylesheetGenerator.pokemons() +
        StylesheetGenerator.trainers();

    $('.stylesheets').append(css);
    $('head').append($('<style></style>').append(css));

    var styleFinder = $('#style_finder');
    styleFinder.on('submit', function(event) {
        event.preventDefault();
    });
    styleFinder.find('.style-handler').on('keyup', function(event) {
        var stylePresenter = $('.style-presenter div');
        stylePresenter.removeClass().addClass($(this).val());
    });
    styleFinder.find('.style-cleaner').on('click', function() {
        var stylePresenter = $('.style-presenter div');
        styleFinder.find('.style-handler').val('');
        stylePresenter.removeClass();
    });
});