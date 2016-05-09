'use strict';



var mapModule = angular.module('baladeMapApp');


mapModule.controller('AdrienCtrl', ["$scope", "leafletData","$http", function($scope, leafletData, $http) {

	var userId = "57283e06b065849c28b03ea8";
	var cpt = 0;
	var socket = io.connect('http://localhost:3000');
	socket.on('message', function(message) {
		alert('Le serveur a un message pour vous : ' + message);
	})

	var drawnItems = new L.FeatureGroup();

	angular.extend($scope, {
		savedItems:[],
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

				other: {
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
					shapeOptions: {
						color: '#d907ea',
						opacity: 0.7
					}
				},
				rectangle: false,
				circle: false,
				marker: true
			}
		}).addTo(map);


		$scope.$watch('radioMarkersChoice', function() {
			//console.log($scope.radioMarkersChoice)
		}, true);


		$scope.markersStyle = {
			wine: {
				icon: 'ion-wineglass',
				markerColor: 'red'
			},
			parking: {
				icon: 'ion-model-s',
				markerColor: 'darkblue'

			},
			start: {
				icon: 'ion-flag',
				markerColor: 'green'

			},
			finish: {
				icon: 'ion-flag',
				markerColor: 'orange'
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
		map.on('draw:deleted', drawDeleted);

		function drawCreated(e) {

			var type = e.layerType,
			layer = e.layer;

			$scope.newMarker = e.layer.toGeoJSON();
			$scope.marker.title = " ";
			$scope.marker.message = " ";
			if (type === 'marker') {
				//	console.log($scope.markerMsg);
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

				$scope.newMarker.properties = $scope.marker;
				angular.extend($scope.newMarker.properties, $scope.radioMarkersChoice)
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
				});

				$scope.lineDistance = totalDistance;
				layer.bindLabel((totalDistance / 1000).toFixed(3) + 'km');
				$scope.newMarker.properties.distance = (totalDistance / 1000).toFixed(3)
			}
			featureGroup.addLayer(e.layer);
			$scope.newMarker.properties.id = layer._leaflet_id;
			
			$scope.savedItems.push($scope.newMarker);
			console.log($scope.savedItems);
			socket.emit('itemsToSave', $scope.savedItems);

			//	console.log($scope.savedItems)
			//featureGroup.clearLayers(); // Ca empeche de modifier le groupe de item créée

			//console.log(JSON.stringify($scope.newMarker)); 

		}


		function drawEdited(e) {
			var layers = e.layers;
			layers.eachLayer(function(layer) {
				angular.forEach($scope.savedItems, function(value, key) {
					if (value.properties.id == layer._leaflet_id){
						value.geometry = layer.toGeoJSON().geometry;
					}
				})
			});	
			socket.emit('itemsToSave', $scope.savedItems);
		};

		function drawDeleted(e) {
			var layers = e.layers;
			layers.eachLayer(function(layer) {
				angular.forEach($scope.savedItems, function(value, key) {
					if (value.properties.id == layer._leaflet_id){
						$scope.savedItems.splice(key, 1);
					}
				})
			});	
			console.log($scope.savedItems);
			socket.emit('itemsToSave', $scope.savedItems);
		};

		leafletData.getLayers().then(function(baselayers) {
			var drawnItems = baselayers.overlays.draw;
			map.on('draw:created', function(e) {
				var layer = e.layer;
				drawnItems.addLayer(layer);
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