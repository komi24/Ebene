angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'H&M',
    lastText: 'Textile Femme et Homme',
    face: 'https://pbs.twimg.com/profile_images/459307898493861889/NIu3ISoY.jpeg',
    link: ''
  }, {
    id: 1,
    name: 'Galerie Lafayette',
    lastText: 'Mode et accessoires',
    face: 'http://static.galerieslafayette.com/media/endeca2/header/logo-galeries-lafayette.png'
  },{
    id: 2,
    name: 'Go Sport',
    lastText: 'Accessoires de sport',
    face: 'http://i5.mbstatic.net/gosport/struct/header/logoGoSport.png'
  }, {
    id: 3,
    name: 'Decathlon',
    lastText: 'Accessoires de sport',
    face: 'http://www.justacote.com/photos_entreprises/decathlon-lisieux-1339766207.jpg'
  }, {
    id: 4,
    name: 'Foot Locker',
    lastText: 'Mode Sportswear',
    face: 'http://www.tiendeo.fr/galeria/negocio/141/45737239.gif'
  }, {
    id: 5,
    name: 'Spartoo',
    lastText: 'Chaussures',
    face: 'https://www.monaviscompte.fr/images/company/76373/spartoo.jpg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);
