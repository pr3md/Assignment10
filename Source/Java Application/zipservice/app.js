var crudapp = angular.module("CRUDApp", ['ngRoute'])

.config(function($routeProvider){
	$routeProvider

	.when('/', {
		templateUrl: 'views/home.html',
		controller: 'HomeController'
	})

	.when('/create', {
		templateUrl: 'views/Register.html',
		controller: 'POSTController'
	})

	.when('/read', {
		templateUrl: 'views/Read.html',
		controller: 'ReadController'
	})

	.when('/update', {
		templateUrl: 'views/Update.html',
		controller: 'HomeController'
	})

	.when('/modify/:docId', {
		templateUrl: 'views/UpdateDoc.html',
		controller: 'UpdateController'
	})

	.when("/delete", {
		templateUrl: 'views/Delete.html',
		controller: 'HomeController'
	})
})

.factory('docDetails', function(){
	var doc;
	function set(data) {
		doc = data;
	}
	function get(){
		return doc;
	}
	return {
		set:set,
		get:get
	}
})

.controller("HomeController", function($scope, $location, $http, docDetails){
	$scope.init = function() {
		$scope.showStatus = true;
		$http({
			method:'GET',
			url: 'http://localhost:8080/PallaviAssignment6/docs/all'
		}).success(function(response){
			$scope.showStatus = false;
			console.log("Retrieved docs from mlab using HomeDocs Servlet");
			$scope.docs = response;
		})
	}
	$scope.init();

	$scope.deleteDoc = function(docId) {
		$scope.deleteProcess = true;
		console.log(docId);
		$http({
			method: 'DELETE',
			url: 'http://localhost:8080/PallaviAssignment6/delete/doc',
			params: {id: docId}
		}).success(function(response){
			$scope.deleteStatus = true;
			$scope.deleteProcess = false;
			$scope.zip = docId;
			console.log("Successfully deleted document.")
			$scope.init();
		})
	}

	$scope.editFn = function(id, zip, city, state) {
		var currentDoc = {currentId:id, zip:zip, city:city, state:state};
		docDetails.set(currentDoc);
		$location.path('/modify/'+id);
	}


})

.controller("UpdateController", function($scope, $http, docDetails, $httpParamSerializerJQLike){
	$scope.docdata = docDetails.get();
	$scope.updateDoc = function(id, zip, city, state) {
		$scope.processStart = true;
		console.log(id+", "+zip+", "+city+", "+state);
		$http({
			method: 'POST',
			url: 'http://localhost:8080/PallaviAssignment6/update/doc',
			data: $httpParamSerializerJQLike({id:id,zip:zip, city:city,state:state}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).success(function() {
			console.log("Successful!");
			$scope.processStart = false;
			$scope.resultSet = true;
		})
	}

	/*$scope.updateDoc = function(docId, zip, city, state) {
		console.log("New Data: "+docId+", "+zip+", "+city+", "+state);
		$scope.processStart = true;
		$http({
			method: 'POST',
			url: 'http://localhost:8080/PallaviAssignment6/update/doc',
			data: JSON.stringify({
				id: docId,
				zip: zip,
				city:city,
				state:state
			}),
			contentType: "application/json"
		})

			.success(function(response, headers){
				console.log("Successfully updated!");
				$scope.processStart = false;
				$scope.resultSet = true;

			})
	}*/
})

.controller("POSTController", function($scope, $http, $httpParamSerializerJQLike) {
	$scope.RegisterZip = function(zip, city, state) {
		$scope.processStart = true;
		$http({
			method:'POST',
			url: 'http://localhost:8080/PallaviAssignment6/register/post',
			data: JSON.stringify({
				zip: zip,
				city: city,
				state: state
			}),
			contentType: "application/json"
		}).success(function(response){
			console.log("Successfully inserted Zip");
			//Remove Process State
			$scope.processStart = false;
			//Clear all input fields
			$scope.zip = "";
			$scope.state = "";
			$scope.status = true;
			$scope.city = "";
			setTimeout(function () {
				$scope.$apply(function(){
					$scope.status = false;
				});
			}, 10000);
		})
	}
})

.controller('ReadController', function($scope, $http, $filter){
	$scope.Retrieve = function(state) {
		$scope.processStart = true;
		$http({
			method: 'GET',
			url: 'http://localhost:8080/PallaviAssignment6/retrieve/doc',
			params: {state: state}
		}).success(function(response){
			if(response.length>0) {
				$scope.processStart = false;
				console.log(response);
				$scope.resultSet = true;
				$scope.response = response;
				$scope.zeroDocs = false;
			} else {
				$scope.zeroDocs = true;
				$scope.processStart = false;
			}

		})
	}
});