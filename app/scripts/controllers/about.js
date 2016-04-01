'use strict';

var mapModule = angular.module('baladeMapApp');

mapModule.controller('AboutCtrl', ["$scope", "$timeout", "leafletData", function($scope, $timeout, leafletData) {
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


		var featureGroup = L.featureGroup().addTo(map);

		var drawControl = new L.Control.Draw({
			edit: {
				featureGroup: featureGroup
			},
			draw: {
				polygon: false,
				polyline: true,
				rectangle: false,
				circle: false,
				marker: true
			}
		}).addTo(map);


		map.on('draw:drawstart', function(e) {

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
				layer.bindPopup("<img src='images/yeoman.png'/> <dl><dd>" + $scope.markerMsg + "<dd></dl>");
			}

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


		$scope.upload = function (dataUrl, name) {
			Upload.upload({
				url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
				data: {
					file: Upload.dataUrltoBlob(dataUrl, name)
				},
			}).then(function (response) {
				$timeout(function () {
					$scope.result = response.data;
				});
			}, function (response) {
				if (response.status > 0) $scope.errorMsg = response.status 
					+ ': ' + response.data;
			}, function (evt) {
				$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
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