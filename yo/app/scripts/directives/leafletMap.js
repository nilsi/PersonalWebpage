'use strict';
/* global L */
/* global d3 */

angular.module('app.directives').directive('leafletMap', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        link: function(scope) {
            /* Leaflet Map & D3 */
            var map = new L.Map('leafletMap', {
                center: [0, 0],
                zoom: 2,
                minZoom: 2,
                scrollWheelZoom: false
            });

            var svg = d3.select(map.getPanes().overlayPane).append('svg'),
                g = svg.append('g').attr('class', 'leaflet-zoom-hide');

            d3.json('/assets/world-countries.json', function(collection) {
                // Use Leaflet to implement a D3 geometric transformation.
                function projectPoint(x, y) {
                    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
                    /*jshint validthis:true */
                    this.stream.point(point.x, point.y);
                }

                var transform = d3.geo.transform({
                    point: projectPoint
                });

                var path = d3.geo.path().projection(transform);

                // Reposition the SVG to cover the features.
                function reset() {
                    var bounds = path.bounds(collection),
                        topLeft = bounds[0],
                        bottomRight = bounds[1];

                    svg.attr('width', bottomRight[0] - topLeft[0]).attr('height', bottomRight[1] - topLeft[1]).style('left', topLeft[0] + 'px').style('top', topLeft[1] + 'px');
                    g.attr('transform', 'translate(' + -topLeft[0] + ',' + -topLeft[1] + ')');
                    feature.attr('d', path);
                }

                var feature = g.selectAll('path').data(collection.features).enter().append('path').attr({
                    'click-map': function(d) {
                        return 'getMessages(\''+d.properties.name+'\')';
                    },
                    'data-country': function(d) {
                        return d.properties.name;
                    }
                }).call(function() {
                    $compile(this[0].parentNode.parentNode)(scope);
                });

                map.on('viewreset', reset);
                reset();
            });
        }
    };
}]);
