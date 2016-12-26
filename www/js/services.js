angular.module('app.services', ['ngCordova',])

.factory('BlankFactory', [function(){

}])

.factory('FileService', function(){
        var images;
        var IMAGE_STORAGE_KEY = 'images';
        function getImages(){
        	var img = window.localStorage.getItem(IMAGE_STORAGE_KEY);
        	if(img) {
        		images = JSON.parse(img);
        	} else {
        		images = [];
        	}
        	//alert("images ---> " + images);
        	return images;
        };

        function addImage(img) {
        	images.push(img);
        	//alert("addImage : " +img);
        	window.localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images));
        };

        return {
        	storeImage : addImage,
        	images: getImages
        }
})

.factory('ImageService', function($cordovaCamera, FileService, $q, $cordovaFile){

	function makeid(){
		var text = '';
		var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (var i=0; i < 5; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	};

	function optionsForType(type) {
		var source;
		switch (type) {
			case 0:
				source = Camera.PictureSourceType.CAMERA;
				break;
			case 1:
				source = Camera.PictureSourceType.PHOTOLIBRARY;
				break;
		}
		return {
			destinationType: Camera.DestinationType.FILE_URI,
			sourceType: source,
			allowEdit: false,
			encodingType: Camera.EncodingType.JPEG,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: false
		};
	};

	function saveMedia(type) {
		return $q(function(resolve, reject){
		var options = optionsForType(type);

		$cordovaCamera.getPicture(options).then(function(imageUrl) {
			var name= imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
			var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
			//namePath = namePath.replace("content://", "file:///");
			var newName = makeid() + name;
			//alert("newName --->" + newName);
			//alert("saveMedia ---> " + imageUrl + " *** " + name + " *** " + namePath + " *** " + newName + "Data Dir: " + cordova.file.dataDirectory);
			$cordovaFile.copyFile( namePath, name, cordova.file.dataDirectory , newName).then(function(info) {
				FileService.storeImage(newName);
				resolve();
			}, function(e) {
				//alert("failed");
				reject();
			});
		});
		})
	};

	return {
		handleMediaDialog: saveMedia
	}
})


.service('BlankService', [function(){

}])

.service('LoginService', function($q, $http) {
	return {
		loginUser: function(email, pwd) {
			var deferred = $q.defer();
			var promise = deferred.promise;
      var PostDataResponse;
      var ResponseDetails = '';
      // http post request to Thingworx
            var data = {
                Email: email,
                Password : pwd,
                appKey: 'e5005283-9e2b-480d-93ec-44eca86672bc'
            }

            var config = {
                headers : {
                    'Content-Type': 'application/json;charset=utf-8',
                    'x-thingworx-session':'true',
                    'appKey': 'e5005283-9e2b-480d-93ec-44eca86672bc'
                }
            }

            $http.post('http://10.192.70.183:8080/Thingworx/Things/smartThing/Services/AuthUser', data, config)
            .success(function (data, status, headers, config) {
                PostDataResponse = data.rows[0].Result;

                if(PostDataResponse == true) {
                  deferred.resolve('Welcome' + email + '!');
                }
                else {
                  deferred.reject('Wrong credentials');
                }

            })
            .error(function (data, status, header, config) {
                ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });

			  promise.success = function(fn) {
				promise.then(fn);
				return promise;
			}

			promise.error = function(fn) {
				promise.then(null, fn);
				return promise;
			}
			return promise;
		}
	}
})

.service('SignUpService', function($q, $http) {
	return {
		signupUser: function(name, email, pwd) {
			var deferred = $q.defer();
			var promise = deferred.promise;
      var PostDataResponse;
      var ResponseDetails = '';
      // http post request to Thingworx
            var data = {
                Name: name,
                Email: email,
                Password : pwd,
                appKey: 'e5005283-9e2b-480d-93ec-44eca86672bc'
            }

            var config = {
                headers : {
                    'Content-Type': 'application/json;charset=utf-8',
                    'x-thingworx-session':'true'

                }
            }

            $http.post('http://10.192.70.183:8080/Thingworx/Things/smartThing/Services/AddNewUser', data, config)
            .success(function (data, status, headers, config) {
                PostDataResponse = data.rows[0].Result;

                if(PostDataResponse == true) {
                  deferred.resolve('Welcome' + email + '!');
                }
                else {
                  deferred.reject('Wrong credentials');
                }

            })
            .error(function (data, status, header, config) {
                ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });

			promise.success = function(fn) {
				promise.then(fn);
				return promise;
			}

			promise.error = function(fn) {
				promise.then(null, fn);
				return promise;
			}
			return promise;
		}
	}
})
