angular.module('app.controllers', ['app.services', 'ngCordova', ])
  
.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    
    // start --- Delete and Reorder utility
	$scope.showDelete = false;
	$scope.showReorder = false;

	$scope.toggle = function(v){
		$scope[v] = !$scope[v];

	}

	$scope.reorderItem = function(item, fromIndex, toIndex){
		$scope.items.splice(fromIndex, 1);
		$scope.items.splice(toIndex, 0, item);
	}

	// end --- Delete and Reorder utility

	$scope.items = [
	{
		'id' : '12345',
		'name': 'Cloth1',
		'type': 'NA',
		'img': 'img/smart_clothes/1-vintage_clothes.jpg'
	},
	{
		'id' : '56452',
		'name': 'Cloth2',
		'type': 'NA',
		'img': 'img/smart_clothes/1-vintage_clothes.jpg'
	},
	{
		'id' : '78965',
		'name': 'Cloth3',
		'type': 'NA',
		'img': 'img/smart_clothes/1-vintage_clothes.jpg'
	},
	{
		'id' : '56877',
		'name': 'Cloth4',
		'type': 'NA',
		'img': 'img/smart_clothes/1-vintage_clothes.jpg'
	}
	]

	$scope.addToFav = function(index, item){
		alert(item.id + "----" + index);
	}

}])
   
.controller('analyticsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('favouriteCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('profileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])


.controller('settingsCtrl', ['$scope', '$stateParams', '$cordovaDevice', '$cordovaFile', '$ionicPlatform', '$ionicActionSheet', 'ImageService', 'FileService',
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cordovaDevice, $cordovaFile, $ionicPlatform, $ionicActionSheet, ImageService, FileService) {
	
	$ionicPlatform.ready(function() {
		$scope.images = FileService.images();
		alert("In controller"+$scope.images);
		if(!$scope.$$phase)$scope.$apply();
		
	});

	$scope.urlForImage = function(imageName) {
		var trueOrigin = cordova.file.dataDirectory + imageName;
		alert("urlForImage: " + imageName);
		return trueOrigin;
	};

	$scope.addMedia = function() {
		$scope.hideSheet = $ionicActionSheet.show({
			buttons: [
				{text: 'Take photo'},
				{text: 'Photo from library'}
			],
			titleText: 'Add images',
			cancelText: 'Cancel',
			buttonClicked: function(index) {
				$scope.addImage(index);
			}
		});
	};

	$scope.addImage = function(type) {
		$scope.hideSheet();
		ImageService.handleMediaDialog(type).then(function() {
			$scope.$apply();
		});
	};

}])
   
.controller('menuCtrl', ['$scope', '$stateParams', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state) {

	//$scope.userData = $ionicUser.details;

    $scope.logout = function(){
        //$ionicAuth.logout();
        $state.go('login');
    }

}])

.controller('addClothCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

	$scope.submit = function(clothName){
		alert(clothName);
	}


}])
   
.controller('loginCtrl', ['$scope', '$stateParams', '$state', '$ionicPopup', 'LoginService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicPopup, LoginService) {

	$scope.data = {
		'email': '',
		'password': ''
	};

	$scope.login = function() {
		LoginService.loginUser($scope.data.email, $scope.data.password).success(function(data) {
			$state.go('menu.home');
		}).error(function(data) {
			var alertPopup = $ionicPopup.alert({
				title: 'Login failed!',
				template: 'Please check your credentials!'
			});

		});
	}

}])
   
.controller('signupCtrl', ['$scope', '$stateParams', '$state', '$ionicPopup', 'SignUpService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicPopup, SignUpService) {

	$scope.data = {
		'name': '',
		'email': '',
		'password': ''
	}

	$scope.error='';

	$scope.signup = function(){
		
		SignUpService.signupUser($scope.data.name, $scope.data.email, $scope.data.password).success(function(data) {
			$state.go('menu.home');
		}).error(function(data) {
			var alertPopup = $ionicPopup.alert({
				title: 'Sign Up failed!',
				template: 'Please check entered details!'
			});

		});
		
	}

}])
 