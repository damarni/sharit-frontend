angular.module('app.services')
	.factory('AuthService', ['$http', '$cookies', 'myConfig', '$cordovaOauth', '$timeout',
		function($http, $cookies, myConfig, $cordovaOauth, $timeout) {
			// $timeout dependency injected because of the inexistence of an API
			var _ = window._;
			var currentUser = getCurrentUser();

			var baseUrl = myConfig.url + ':' + myConfig.port + '/user';
			// REMOVE IN REPOSITORY!
			var GOOGLE_CLIENTID = '36015451376-g3u3npojfn225ff2v85eln4224agimm9.apps.googleusercontent.com';

			var TWITTER_KEY = 'a0yDQUBqAMPbUbl3NGnS0f5y4';
			var TWITTER_SECRET = 'its a secret';

			function getCurrentUser() {
				var token = $cookies.get('auth_token');
				var user = {};
				if (typeof token !== 'undefined') {
          console.log("Vaig bé");
					var encoded = token.split('.')[1];
					user = JSON.parse(window.atob(encoded));
				}
				return user;
			}

			var isAuthenticated = function() {
				return !(_.isEmpty(currentUser));
			};

			var login = function (username, password) {
				// TODO: Replace this code with $http call

        // var promise = new Promise(function(resolve) {
        //   $http.get(baseUrl + '/login', {
        //     params: {
        //       "mail": "testlogin",
        //       "pass": "hola"
        //     }
        //   }).then(function(response) {
        //     console.log(response);
        //     console.log(response.data);
        //     console.log(response.data.Token);
        //     console.log(response.data.Iduser);
        //
        //     //TODO: Guardar camps al local storage
        //
        //     $cookies.put('auth_token', response.data.Token);
        //     currentUser = getCurrentUser();
        //   });
        // });
        // return promise;

				var promise = $timeout(function() {
					var response = { success: true, message: '', data:
						'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZveG11cmVzIn0.qJ1xy6fWTrmzIuG6bRMdGKdpcLhQFjWVmrpFe3B09gM'
					};
					$cookies.put('auth_token', response.data);
					currentUser = getCurrentUser();
					//return getCurrentUser();
				}, Math.random() * 3 * 1000);
				return promise;
			};

			var googleLogin = function () {
				var promise = new Promise(function(resolve, reject) {
					$cordovaOauth.google(GOOGLE_CLIENTID, ['email', 'profile'])
						.then(function(result) {
							// TODO: Send the token to the server.
							$cookies.put('auth_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZveG11cmVzIn0.qJ1xy6fWTrmzIuG6bRMdGKdpcLhQFjWVmrpFe3B09gM');
							currentUser = getCurrentUser();
							resolve();
						}, function(error) {
							console.log(error);
							reject(error);
						});
				});
				return promise;
			};

			var twitterLogin = function () {
				var promise = new Promise(function(resolve, reject) {
					$cordovaOauth.twitter(TWITTER_KEY, TWITTER_SECRET)
						.then(function(result) {
							// TODO: Send the token to the server.
							$cookies.put('auth_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZveG11cmVzIn0.qJ1xy6fWTrmzIuG6bRMdGKdpcLhQFjWVmrpFe3B09gM');
							currentUser = getCurrentUser();
							resolve();
						}, function(error) {
							console.log(error);
							reject(error);
						});
				});
				return promise;
			};

			var facebookLogin = function () {
				var promise = new Promise(function(resolve, reject) {
					$cordovaOauth.facebook(GOOGLE_CLIENTID, ['email', 'profile'])
						.then(function(result) {
							// TODO: Send the token to the server.
							$cookies.put('auth_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZveG11cmVzIn0.qJ1xy6fWTrmzIuG6bRMdGKdpcLhQFjWVmrpFe3B09gM');
							currentUser = getCurrentUser();
							resolve();
						}, function(error) {
							console.log(error);
							reject(error);
						});
				});
				return promise;
			};

			var signup = function(name, username, password) {

				var promise = new Promise(function(resolve) {
					$http.get(baseUrl + '/register', {
						params: {
							"name": "Xavi",
							"surname": "Pedrals",
							"mail": "xavi@xavi.com",
							"pass": "1234",
							"X": "-1",
							"Y": "-1"
						}
					}).then(function(response) {
            console.log(response);
            console.log(response.data);
            console.log(response.data.Token);
            console.log(response.data.Iduser);

            //TODO: Guardar camps al local storage
            //console.log(response.data.token);
            //var aux = JSON.toJson(response.data);
            //console.log(aux);
            //console.log(aux.token);
            //console.log(response.data.token);
            //console.log(response.data.iduser);

						$cookies.put('auth_token', response.token);
						currentUser = getCurrentUser();
					});
				});
				return promise;
			};

			return {
				login: login,
				googleLogin: googleLogin,
				twitterLogin: twitterLogin,
				signup: signup,
				isAuthenticated: isAuthenticated,
				getCurrentUser: function () { return currentUser; }
			}
		}
	]);
