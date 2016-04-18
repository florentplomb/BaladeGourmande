'use strict';

var mapModule = angular.module('baladeMapApp');

mapModule.controller('AboutCtrl', ["$scope", "leafletData", function($scope, leafletData) {
	var socket = io.connect('http://localhost:3000');
	angular.extend($scope, {
		center: {
			lat: 46.833056,
			lng: 6.65,
			zoom: 13
		},
		layers: {
			baselayers: {
				osm: {
					name: 'OpenStreetMap',
					url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
					type: 'xyz'
				},

				other:{
					name: 'foret',
					url: 'http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png',
					type: 'xyz'
				}
			},
			overlays: {
				draw: {
					name: 'draw',
					type: 'group',
					visible: true,
					layerParams: {
						showOnSelector: false
					}
				}
			}
		}
	});

	leafletData.getMap().then(function(map) {

		


		L.AwesomeMarkers.Icon.prototype.options.prefix = 'ion';
		var featureGroup = L.featureGroup().addTo(map);

		var drawControl = new L.Control.Draw({
			edit: {
				featureGroup: featureGroup
			},
			draw: {
				polygon: false,
				polyline: {
					shapeOptions : {
						color : '#d907ea',
						opacity : 0.7	
					}
				},
				rectangle: false,
				circle: false,
				marker: true
			}
		}).addTo(map);


		$scope.$watch('radioMarkersChoice', function() { console.log($scope.radioMarkersChoice) }, true);


		$scope.markersStyle = {
			wine: {
				icon:'ion-wineglass',
				markerColor:'red'
			},
			parking:{
				icon:'ion-model-s',
				markerColor:'darkblue'

			},
			start:{
				icon:'ion-flag',
				markerColor:'green'

			},
			finish:{
				icon:'ion-flag',
				markerColor:'orange'
			}

		}




		map.on('draw:drawstart', function(e) {

			$scope.radioMarkersChoice = $scope.markersStyle.wine;
			$scope.marker = {};

			var type = e.layerType,
			layer = e.layer;
			if (type === 'marker') {
				$scope.showNewMarker = true;
			}
		});


		map.on('draw:created', drawCreated);
		map.on('draw:edited', drawEdited);

		function drawCreated(e) {
			var type = e.layerType,
			layer = e.layer;
			if (type === 'marker') {
				console.log($scope.markerMsg);

				layer.setIcon(L.AwesomeMarkers.icon($scope.radioMarkersChoice));
				// layer.setIcon(L.icon({
				// 	// iconUrl: 'images/yeoman.png',
				// 	// iconRetinaUrl: 'my-icon@2x.png',
				// 	// iconSize: [38, 95],
				// 	// iconAnchor: [22, 94],
				// 	// popupAnchor: [-3, -76],
				// 	// shadowUrl: 'my-icon-shadow.png',
				// 	// shadowRetinaUrl: 'my-icon-shadow@2x.png',
				// 	// shadowSize: [68, 95],
				// 	// shadowAnchor: [22, 94]
				// }));
				layer.bindPopup("<strong>" + $scope.marker.title + "</strong><dl><dd>" + $scope.marker.message + "<dd></dl>");
			}

			if (type === 'polyline') {

				var tempLatLng = null;
				var totalDistance = 0.00000;
				$.each(e.layer._latlngs, function(i, latlng) {
					if (tempLatLng == null) {
						tempLatLng = latlng;
						return;
					}

					totalDistance += tempLatLng.distanceTo(latlng);
					tempLatLng = latlng;

					console.log(totalDistance);
				});

				$scope.lineDistance = totalDistance;

				layer.bindLabel((totalDistance / 1000).toFixed(3) + 'km');
			}

			

			$scope.newMarker = e.layer.toGeoJSON();
			$scope.newMarker.properties = $scope.marker;
			angular.extend($scope.newMarker.properties, $scope.radioMarkersChoice);

			console.log(JSON.stringify($scope.newMarker));
			// featureGroup.clearLayers();

			featureGroup.addLayer(e.layer);
			// e.layer.bindPopup(' km<sup>2</sup>');
			// e.layer.openPopup();

		}


		function drawEdited(e) {
			e.layers.eachLayer(function(layer) {
				showPolygonArea({
					layer: layer
				});
			});
		}



		leafletData.getLayers().then(function(baselayers) {
			var drawnItems = baselayers.overlays.draw;
			map.on('draw:created', function(e) {
				var layer = e.layer;
				drawnItems.addLayer(layer);
				console.log(JSON.stringify(layer.toGeoJSON()));
			});
		});
	});
}]);


//*** upload image ****///

// $scope.upload = function (dataUrl, name) {
// 	Upload.upload({
// 		url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
// 		data: {
// 			file: Upload.dataUrltoBlob(dataUrl, name)
// 		},
// 	}).then(function (response) {
// 		$timeout(function () {
// 			$scope.result = response.data;
// 		});
// 	}, function (response) {
// 		if (response.status > 0) $scope.errorMsg = response.status 
// 			+ ': ' + response.data;
// 	}, function (evt) {
// 		$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
// 	});
// }