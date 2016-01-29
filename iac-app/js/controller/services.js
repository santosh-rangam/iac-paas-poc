/*globals angular, google*/

"use strict";

/* Services */

angular.module("iac-app.services", [ ])

    .factory("googleMap", function ($rootScope) {
        var factory = {};

        factory._maps = google.maps;
        factory.markers = [ ];
        factory.selectedMarkerIdx = null;
        factory.icons = {};
        factory.iconNameTmpl = 'img/Cummins_GSC_Engines.jpg';
        factory.mapWidth = 0;
		factory.mapWidth = 0;
        
     
        factory.initializeMap = function (elem, options) {
            options = options || {
                zoom: 4,
                center: new google.maps.LatLng(21.508742, -0.120850),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_BOTTOM
                },
                panControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_BOTTOM
                }
            };
            if (this.map) {
                delete this.map;
                this.selectedMarkerIdx = null;
            }
            var map = this.map = new google.maps.Map(elem, options);
            // cw: This will fire off several times. We only want the time when we actually have data.
            if (elem.clientWidth > 0) {
                this.mapWidth = elem.clientWidth;
            }
            return map;
        };
        
        /**
         * [getGeoCoder - gets a new geoCoder object]
         * @return {[type]}
         */
        factory.getGeoCoder = function () {
            return new google.maps.Geocoder();
        };

      
        factory.initPlacesService = function (map) {
            this.placeService = new google.maps.places.PlacesService(map);
            return this.placeService;
        };

      
        factory.getIcon = function(num) {
            var i = this.icons['m' + num];
            if (typeof i === 'undefined' || i === null) {
                i = this.icons['m' + num] = {
                    url: factory.iconNameTmpl.format(num)
                };
            }
            return i;
        };

      
        factory.placeMarkers = function (data) {
            this.clearAllMarkers();
            var me = this,
                bounds = new google.maps.LatLngBounds();
            var count = 1;
            angular.forEach(data, function (item, key) {
                var latLng = new google.maps.LatLng(item.geometry.location.lat(), item.geometry.location.lng()),
                    currentMarker;    
                me.markers.push(currentMarker =  new google.maps.Marker({
                    map: me.map,
                    position: latLng,
                    animation: google.maps.Animation.DROP,
                    icon: me.getIcon(count++)
                }));
                bounds.extend(latLng);
                google.maps.event.addListener(currentMarker, "click", function () {
                    me.selectedMarkerIdx = key;
                    $rootScope.$apply();
                });
            });
            me.map.fitBounds(bounds);
        };

       
        factory.clearAllMarkers = function () {
            angular.forEach(this.markers, function (item, key) {
                item.setMap(null);
            });
            this.markers = [ ];
        };

       
        factory.zoomToMarker = function(idx) {
            // Zoom to marker with proper zoom based on bounds.
            var p = this.markers[idx].getPosition();
            // cw: Would like to pan & zoom to this, but V3 API doesn't make this possible.
            this.map.setCenter(p);
            // cw: Zoom level determined by hand. Should be a better way.
            this.map.setZoom(16);
            // cw: Alternative -- find closest marker, add both points to bounds and zoom to 
            // that to show context.
        };

        factory.bounceMarker = function(idx){
            var marker  = this.markers[idx];
            angular.forEach(this.markers, function (item, key) {
                item.setAnimation(null);
            });
            marker && marker.setAnimation(google.maps.Animation.BOUNCE);
        };

        return factory;
    })

    .factory("scrollToElem", function ($window, $timeout) {
        return {
            scrollTo: function (elemId) {
                var elem = document.getElementById(elemId);
                if (!elem) {
                    $window.scrollTo(0, 0);
                    return;
                }
                $timeout(function () {
                    elem.scrollIntoView();
                }, 100);

            }
        };
    });
