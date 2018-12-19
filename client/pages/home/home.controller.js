(function(){
	'use strict';
	angular
		.module('app')
		.controller('mainController', mainController)
		.config(function ($httpProvider) {
            $httpProvider.defaults.headers.common = {};
            $httpProvider.defaults.headers.post = {};
            $httpProvider.defaults.headers.put = {};
            $httpProvider.defaults.headers.patch = {};
        });
	mainController.$inject = ['$scope', '$http','$window'];
	function mainController($scope, $http, $window)
	{
		$scope.product_line = 'women tops';
        $scope.image_info = {};
        $scope.image_url = '';
        $scope.update_response = {};
        $scope.loading_status = false;
        $scope.image_links = [
            "https://assets.myntassets.com/h_640,q_90,w_480/v1/assets/images/1329664/2016/4/28/11461839194506-Bhama-Couture-Women-Tops-2961461839193770-1.jpg",
            "https://assets.myntassets.com/h_640,q_90,w_480/v1/assets/images/2172006/2017/10/12/11507791895870-plusS-Women-Grey-Solid-Top-2251507791895611-1.jpg",
            "https://assets.myntassets.com/h_640,q_90,w_480/v1/assets/images/2286263/2017/11/28/11511860757348-na-1321511860757093-1.jpg",
            "https://assets.myntassets.com/h_640,q_90,w_480/v1/assets/images/2029796/2017/8/8/11502193376933-ESPRIT-Women-Tops-2041502193376733-1.jpg",
            "https://assets.myntassets.com/h_640,q_90,w_480/v1/assets/images/1543826/2016/9/21/11474447918879-Miss-Chase-Women-Tops-4691474447917923-1.jpg"
        ];

        $scope.product_lines = ["women tops"];
        $scope.submit = function (status) {
            console.log("Inside submit function");
            var image_url = $scope.image_url;
            var product_line = $scope.product_line.split(" ").join("_");
            if(image_url=='')
            {
                if(!status)
                {
                    $scope.update_response = {"status" :false, message:"Please enter image link"}
                    return;
                }
                else
                {
                    image_url = $scope.image_links[0];
                }
            }
            $scope.loading_status = true;
            $scope.image_info = {};
            var baseUrl = "https://imagetag.in/image-tagging/get-attributes";

            var parameter = {product_line:product_line, image_links:[image_url]};
            var config={
                'content-type': 'application/json'
            };
            $http.post(baseUrl, parameter, config).then(function (response) {
                // This function handles success
                $scope.loading_status = false;
                var response_data = response.data;
                console.log(response_data);
                $scope.image_info = response_data;

                $scope.image_url = '';
            }, function (response) {
                // this function handles error
                $scope.update_response = {"status":false, "message":"Error while getting response from server, try again"}
                $scope.loading_status = false;
                $scope.image_url = '';
            });
        };
        $scope.submit(true);
        $scope.changeProductLine = function(pl)
        {
            $scope.product_line = pl;
        }
        $scope.getSelectedImage = function(img_url)
        {
            $scope.image_url = img_url;
            $scope.submit();
        }
        $scope.uploadFile = function(files) {
            console.log("Upload file");
            
            $scope.loading_status = true;
            $scope.image_info = {};
            //Take the first selected file
            var fd = new FormData();
            fd.append("file", files[0]);
            console.log(fd);
            var uploadUrl = "https://imagetag.in/image-tagging/upload-files";
            var config = {'content-type': undefined};
            $http({
            	url: uploadUrl,
        		method: 'POST',
        		data: fd,
		        //assign content-type as undefined, the browser
		        //will assign the correct boundary for us
		        headers: config,
		        //prevents serializing payload.  don't do it.
		        transformRequest: angular.identity
		    }).then(function (response) {
                // This function handles success
                $scope.loading_status = false;
                var response_data = response.data;
                console.log(response_data);
                $scope.update_response  = response_data;
                if(response_data["type"]=="jpg")
                {
                    $scope.image_url = response_data["message"];
                    $scope.submit();
                }

            }, function (response) {
                // this function handles error
                console.log("Error")
                $scope.image_url = '';
                $scope.loading_status = false;
                $scope.update_response = {status : false, message : "Error while uploading the file"};
            });
        }
        $scope.showAlert = function(message)
        {
            window.alert(message);
            $scope.update_response.status = true;
        }
        $scope.contact_name ='';$scope.contact_email ='',$scope.contact_message = '';
        $scope.contactMessage = function()
        {
            var username = $scope.contact_name;
            var email = $scope.contact_email;
            var message = $scope.contact_message;

            var baseUrl = "https://imagetag.in/image-tagging/contact-us";
            var parameter = {username:username, email:email, message: message};
            var config={ 'content-type': 'application/json' };
            $http.post(baseUrl, parameter, config).then(function (response) {
                // This function handles success
                var response_data = response.data;
                $scope.showAlert("your query successfully submitted");
                
            }, function (response) {
                // this function handles error

            });
        }
	}
})();