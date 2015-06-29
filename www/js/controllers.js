angular.module('starter.controllers', [])
/*.controller('DashCtrl1', function($scope, $http, $localstorage, $interval, $cordovaLocalNotification){
	$scope.form1 = [];
	$scope.username="";
	$scope.mdp="";
	$scope.idready = [];
	if (window.localStorage['id'] == undefined) {
		$scope.signPannel = true;
	}
})*/
.controller('DashCtrl', function($scope, $http, $localstorage, $interval){ //, $cordovaLocalNotification) {
	$scope.form1 = [];
	$scope.username="";
	$scope.mdp="";
	$scope.idready = [];
	$scope.openwin = function(rest){
		window.open('http://ruut.fr/web/cliboard/'+rest+'/'+$scope.idUser,'_system');
		return false;
	}
	//alert('ok');

	//if (!('id' in window.localStorage)) {
	if (window.localStorage['id'] == undefined) {
		//alert('ok');
		$scope.signPannel = true;
		//alert($scope.signPannel);
		//navigator.vibrate(1000);
		/*localNotification.add(1,{
			        					title: 'Title here',
			        					message: 'Text here',
			      					});*/
		//alert('ok');
		
		//L'appliation ne possède pas l'ID de l'utilisateur
		
		//Soit l'utilisateur n'a pas de compte et il faut créer un Id
		$scope.createAccount = function(){
			//L'utilisateur souhaite créer un compte avec nom et mot-de-passe
			//Récupérer le restaurant avec le process "fausse commande"
			//alert($scope.form1.username);	
			$http.post('http://ruut.fr/web/mvp_actionboard/myid',{type: 'new', user: $scope.form1.username, mdp: $scope.form1.mdp})
				.success(function(data){
					//Traiter le retour de liste restaurants
					var resp = data//JSON.parse(data);
					$scope.idUser = resp['id'];
					//alert(JSON.stringify(resp));
					//alert(resp.id);
					//alert(resp['id']);
					window.localStorage['id'] = resp['id'];
					$scope.restaurants = resp['restaurants'];
					$localstorage.setObject('restaurants',$scope.restaurants);
					$scope.test = $localstorage.getObject('restaurants');
					//alert($scope.test);
					window.localStorage['mdp'] = $scope.mdp;
					window.localStorage['username'] = $scope.username;
					$scope.signPannel = false;
					$scope.checkCommande = function(){
						$http.post("http://ruut.fr/web/mvp_clicomboard/liste",
                		{'id': $scope.idUser}).
                		success(function (data) {
                			//alert("ok liste");
                    		angular.forEach(data, function (commande) {
                        		if ((commande.datepret != null) && ($scope.idready.indexOf(commande.id) == -1)){
									document.addEventListener("deviceready", onDeviceReady, false);
									function onDeviceReady() {
								    	//console.log(navigator.vibrate);
								    	navigator.vibrate(2400);
									}
									//alert(commande.datepret);
									//alert(commande.id);
                    				//alert($scope.idready[0]);
                    				//alert($scope.idready[1]);
                        			$scope.idready.push(commande.id);
                        		}
                    		});
                		}).error(function(data){
                			alert('Error 100');
                			//alert(data);
                		});
					};
				$interval(function(){$scope.checkCommande();}, 1000);
				}).error(function(data){
					//Traiter l'erreur
					//TODO
					alert("Error 101");
					//alert(data);
					//$scope.idUser = data;
				});
		};

		//Soit il en a déjà un et il faut récupérer son Id
		$scope.logIn = function(){
			//L'utilisateur souhaite se connecter (récupérer If)
			//Avec un nom et un mdp
			//Récupérer les restaurants avec el process "fausse commande"
			//PS : Ce dernier doit permettre de renvoyer tous les restaurants
			//Dans lesquels l'Id clients à passer commande (y compris les fausses)
			$http.post('http://ruut/web/mvp_actionboard/myid',{type: 'log', user: $scope.username, mdp: $scope.mdp})
				.success(function(data){
					//Traiter le retour de liste restaurants
					//alert('reponse myid');
					var resp = JSON.parse(data);
					$scope.idUser = resp['id'];
					window.localStorage['id'] = resp['id'];
					$scope.restaurants = resp['restaurants'];
					$localstorage.setObject('restaurants',resp['restaurants']);
					//alert($localstorage.getObject('restaurants').id);
					window.localStorage['mdp'] = $scope.mdp;
					window.localStorage['username'] = $scope.username;
					$scope.signPannel = false;
					$scope.checkCommande = function(){
						$http.post("/web/mvp_clicomboard/liste",
                		{'id': $scope.idUser}).
                		success(function (data) {
                			//alert("ok liste");
                    		angular.forEach(data, function (commande) {
                        		if ((commande.datepret != null) && ($scope.idready.indexOf(commande.id) == -1)){
									document.addEventListener("deviceready", onDeviceReady, false);
									function onDeviceReady() {
								    	//console.log(navigator.vibrate);
								    	navigator.vibrate(1000);
									}
									//alert(commande.datepret);
									//alert(commande.id);
                    				//alert($scope.idready[0]);
                    				//alert($scope.idready[1]);
                        			$scope.idready.push(commande.id);
                        		}
                    		});
                		}).error(function(data){
                			alert('error 102');
                		});
					};
				$interval(function(){$scope.checkCommande();}, 1000);
				}).error(function(data){
					//Traiter l'erreur
					//TODO
					alert('error 103');
					//alert('data');
				});
		};
	}else{
		//L'application possède l'ID de l'utilisateur
		//alert('autre');
		//alert(window.localStorage['id']);
		//alert($localstorage.getObject('restaurants')[0].id);
		$scope.signPannel = false;
		$scope.idUser = window.localStorage['id'];
		$scope.restaurants = $localstorage.getObject('restaurants');
		$scope.$apply();
		/*if($localstorage.getObject('restaurants') == undefined){
			//Si l'application n'a pas la liste des restaurants
			//Car le download a été fait sur le PlayStore sans 
			//Passer par un restaurant (ou le process fausse
			//commande a échoué)
			$http.get('http://ruut/web/listerestaurant/' + $scope.idUser)
			.success(function(data){
				//Traiter le retour de liste restaurants
				$scope.restaurants = JSON.parse(data);
				window.localStorage['restaurants'] = data;
				$scope.signPannel = false;
			}).error(function(data){
				//Traiter l'erreur
				alert('Error 104');
				//TODO
			});
		}else{
			$scope.restaurants = window.localStorage['restaurants'];
		}*/
	};
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
