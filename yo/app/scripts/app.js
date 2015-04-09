'use strict';
/*jshint loopfunc: true */
/* global d3 */
/* global WOW */

angular.module('app.directives', []);
angular.module('app.services', []);
angular.module('app.controllers', []);

var app = angular.module('app',
    ['pascalprecht.translate',
     'angularTypewrite',
     'angularMoment',
     'app.directives',
     'app.services',
     'app.controllers']);

app.config(['$translateProvider',
    function($translateProvider) {
        // add translation tables
        $translateProvider.useStaticFilesLoader({
            prefix: '/assets/lang/locale-',
            suffix: '.json'
        }).determinePreferredLanguage().fallbackLanguage('en_US');

    }
]);

app.run(function() { //TODO : rewrite for Angular

    new WOW().init();

    $('#nav li a, .scroll').on('click', function(e) {
        // prevent default anchor click behavior
        e.preventDefault();

        // store hash
        var hash = this.hash;

        if ($(hash).length) {
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 300, function() {
                // when done, add hash to url
                // (default click behaviour)
                window.location.hash = hash;
            });
        }
    });

    // Activates floating label headings for the contact form.
    $('body').on('input propertychange', '.floating-label-form-group', function(e) {
        $(this).toggleClass('floating-label-form-group-with-value', !! $(e.target).val());
    }).on('focus', '.floating-label-form-group', function() {
        $(this).addClass('floating-label-form-group-with-focus');
    }).on('blur', '.floating-label-form-group', function() {
        $(this).removeClass('floating-label-form-group-with-focus');
    });

    new Waypoint({
        element: document.getElementById('leafletMap'),
        handler: function() {
            $.ajax({
                url: 'allmarks',
                method: 'GET'
            }).success(function(list) {

                var animationFinished = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                    flashAnimation = 'country animated flash',
                    resetClasses = 'country';

                for (var i = 0; i < list.length; i++) {
                    (function(i) {
                        setTimeout(function() {
                            var country = 'path[data-country="' + list[i].country + '"]',
                                opacity = parseFloat(d3.selectAll(country).style('fill-opacity'));

                            if (opacity < 1) {
                                d3.selectAll(country)
                                    .attr('class', flashAnimation)
                                    .style('fill-opacity', opacity + 0.1);

                                $(country).one(animationFinished, function() {
                                    $(this).attr('class', resetClasses);
                                });
                            }
                        }, 2500 * i);
                    }(i));
                }
            });
            this.destroy();
        },
        offset: '90%'
    });

    new Waypoint({
        element: document.getElementById('knowledge'),
        handler: function() {
            $('.progress-bar').each(function() {
                var datalength = $(this).attr('aria-valuenow');
                $(this).css('width', datalength + '%');
            });
            this.destroy();
        },
        offset: '90%'
    });
});
