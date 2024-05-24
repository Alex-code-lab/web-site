// Scroll to Top Script
require('jquery-ui/ui/effect.js');

(function($, _) {
    "use strict";

    // Définition des classes utilisées
    var CLASS_BUTTON = 'cc-FloatingButtonBarContainer-button-scroll';
    var CLASS_CONTAINER = 'cc-FloatingButtonBarContainer';
    var CLASS_BUTTON_SHOW = CLASS_BUTTON + '-show';

    // Paramètres par défaut
    var DEFAULTS = {
        interval: 250,  // Intervalle de détection de défilement
        scrollTime: 500, // Temps de l'animation de retour en haut
        yPos: 400 // Position Y minimale pour afficher le bouton
    };

    // Enregistrement du module dans l'objet jQuery s'il n'existe pas déjà
    $.modules = $.modules || {};
    $.modules.scrolltotop = function(opts) {
        var $window = $(window),
            $scrollToTopContainer = $('.' + CLASS_CONTAINER),
            $scrollToTopButton = $('.' + CLASS_BUTTON),
            scrolling = false;

        // Fusion des options par défaut avec les options fournies
        var options = $.extend({}, DEFAULTS, opts);

        // Fonction de bascule de la visibilité du bouton
        function toggle(has) {
            console.log("Toggle function called. Show button: " + has);
            $scrollToTopButton.toggleClass(CLASS_BUTTON_SHOW, has);
            if (has) {
                $scrollToTopContainer.removeClass('hidden');
            } else {
                $scrollToTopContainer.addClass('hidden');
            }
        }

        // Gestion de l'événement de défilement
        $window.on('scroll', _.throttle(function() {
            console.log("Window scroll position: " + $window.scrollTop());
            if (scrolling) {
                console.log("Currently scrolling to top. Event ignored.");
                return;
            }
            toggle($window.scrollTop() > options.yPos);
        }, options.interval));

        // Activation initiale
        $scrollToTopContainer.removeClass('hidden');

        // Gestion de l'événement de clic sur le bouton
        $scrollToTopButton.on('click', function(e) {
            e.preventDefault();
            console.log("Scroll to top button clicked.");
            toggle(false);
            scrolling = true;
            $('html,body').stop().animate({
                'scrollTop': 0
            }, options.scrollTime, 'easeOutCirc', function() {
                console.log("Animation complete. Resetting scrolling flag.");
                scrolling = false;
            });
        });
    };

    // Initialisation du module lors du chargement du DOM
    $(function() {
        console.log("Document ready. Initializing scroll to top module.");
        $.modules.scrolltotop();
    });
})(require('jquery'), require('lodash'));
